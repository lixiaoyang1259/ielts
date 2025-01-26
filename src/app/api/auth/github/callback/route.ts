import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {github} from "@/libs/oauth/provider";
import {createSession} from "@/libs/oauth/create-session";

interface GitHubEmail {
    email: string
    primary: boolean
    verified: boolean
    visibility: "public" | "private"
}

interface GitHubProfile {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string | null
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: string | null
    company: string | null
    blog: string | null
    location: string | null
    email: string | null
    hireable: boolean | null
    bio: string | null
    twitter_username?: string | null
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
    private_gists?: number
    total_private_repos?: number
    owned_private_repos?: number
    disk_usage?: number
    suspended_at?: string | null
    collaborators?: number
    two_factor_authentication: boolean
    plan?: {
        collaborators: number
        name: string
        space: number
        private_repos: number
    }

    [claim: string]: unknown
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const cookieState = cookies().get("github_state")?.value ?? null
    if (!code || !state || !cookieState || state !== cookieState) {
        redirect("/login?reason=access-denied_h")
    }

    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken}`
        }
    });

    if (!githubUserResponse.ok) {
        redirect("/login?reason=access-denied_h")
    }

    const profile: GitHubProfile = await githubUserResponse.json()

    if (!profile.email) {
        const emailRes = await fetch("https://api.github.com/user/emails", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        })
        if (!emailRes.ok) {
            const emails: GitHubEmail[] = await emailRes.json()
            redirect("/login?reason=oauth_access_denied_h")
        }
        const emails: GitHubEmail[] = await emailRes.json()
        profile.email = (emails.find((e) => e.primary) ?? emails[0]).email
    }

    return await createSession({
        username: profile.name ?? profile.login,
        email: profile.email,
        image: profile.avatar_url,
        provider: 'github',
        providerId: profile.id.toString(),
        accessToken: tokens.accessToken,
        type: "oauth"
    })

}


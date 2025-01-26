import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {google} from "@/libs/oauth/provider";
import {createSession} from "@/libs/oauth/create-session";

export interface GoogleProfile extends Record<string, any> {
    id: string,
    email: string,
    name: string,
    picture: string
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    const codeVerifier = cookies().get('code_verifier')?.value ?? null
    const cookieState = cookies().get("google_state")?.value ?? null

    if (!code || !state || !cookieState || state !== cookieState || !codeVerifier) {
        redirect("/login?reason=access-denied_g")
    }

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
            Authorization: `Bearer ${tokens.accessToken}`
        }
    })

    if (!googleResponse.ok) {
        redirect("/login?reason=oauth_access_denied_g")
    }
    const profile = await googleResponse.json();
    return await createSession({
        username: profile.name,
        email: profile.email,
        image: profile.picture,
        provider: 'google',
        providerId: profile.id.toString(),
        accessToken: tokens.accessToken,
        type: "oauth"
    })
}


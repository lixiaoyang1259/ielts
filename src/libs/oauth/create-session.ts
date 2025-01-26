import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {createUser, loadUserByEmail} from "@/libs/db/account";
import {lucia} from "@/libs/auth/lucia";
import "server-only"

type Provider = 'github' | 'google' | "authenticate" | "Apple"

export interface AuthProfile {
    username: string,
    email: string,
    image: string | null,
    provider: Provider
    type: string
    providerId: string | null
    accessToken: string | null
    refreshToken?: string
    password?: string
}

export async function createSession(profile: AuthProfile) {
    const existingUser = await loadUserByEmail(profile.email)
    let userId
    if (existingUser) {
        if (existingUser.Account?.provider !== profile.provider) {
            redirect("/login?reason=existed")
        } else {
            userId = existingUser.id
        }
    } else {
        const newUser = await createUser(profile)
        userId = newUser.id
    }

    const session = await lucia.createSession(userId, {
        userId: userId
    });
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/main"
        }
    });
}
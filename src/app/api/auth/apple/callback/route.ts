import {cookies} from 'next/headers';
import {AppleTokens, OAuth2RequestError} from 'arctic';
import {parseJWT} from 'oslo/jwt';
import {apple} from "@/libs/oauth/provider";
import {createUser, db, loadUserByEmail} from "@/libs/db/account";
import {lucia} from "@/libs/auth/lucia";
import {createSession} from "@/libs/oauth/create-session";
import {redirect} from "next/navigation";

interface AppleUserInfo {
    name: {
        firstName: string,
        lastName: string
    },
    email: string
}

export async function POST(request: Request): Promise<Response> {
    const formData = await request.formData();

    const code = formData.get('code');
    const state = formData.get('state');
    const storedState = cookies().get('apple_state')?.value ?? null;
    const appleUser = formData.get("user")

    if (!code || !state) {
        return new Response(null, {
            status: 400,
        });
    }

    const tokens: AppleTokens = await apple.validateAuthorizationCode(code.toString());
    const jwt = parseJWT(tokens.idToken);
    const payload = jwt?.payload as any;
    const providerId = payload.sub as string;

    if (appleUser) {

        const userInfo = JSON.parse(appleUser.toString()) as AppleUserInfo;
        const userExists = await loadUserByEmail(userInfo.email);
        if (userExists) {
            if (userExists.Account?.provider === "Apple") {
                try {
                    const updateResult = await db.updateAccountProviderId(userInfo.email, providerId)
                    if (updateResult) {
                        return createAppleSession(updateResult.id)
                    }
                } catch (e) {
                }
            } else {
                redirect("/login?reason=existed")
            }
        } else {
            const newUser = await createUser({
                username: userInfo.name.firstName + " " + userInfo.name.lastName,
                email: userInfo.email,
                provider: "Apple",
                providerId: providerId,
                image: null,
                type: "oauth",
                accessToken: tokens.accessToken
            })
            return createAppleSession(newUser.id)
        }
    } else {
        const appleUserId = await db.loadAppleUserByAccountId(providerId)
        if (appleUserId) {
            return createAppleSession(appleUserId.id)
        } else {
            redirect("/login?reason=oauth_access_denied_c")
        }
    }

    return new Response(null, {
        status: 500,
    });
}

async function createAppleSession(userId: string) {
    console.log("userID =", userId)
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
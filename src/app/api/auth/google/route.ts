import {generateCodeVerifier, generateState} from "arctic";
import {cookies} from "next/headers";
import {google} from "@/libs/oauth/provider";

export async function GET(req: Request): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier()
    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ['email', 'profile']
    });

    cookies().set("google_state", state, {
        path: "/",
        secure: process.env.USE_HTTP === "1",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });
    cookies().set("code_verifier", codeVerifier, {
        secure: process.env.USE_HTTP === "1",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10 // 10 min
    });

    return Response.redirect(url);
}
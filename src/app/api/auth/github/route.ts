import {generateState} from "arctic";
import {cookies} from "next/headers";
import {github} from "@/libs/oauth/provider";

export async function GET(req: Request):Promise<Response>{
    const state = generateState();
    const url = await github.createAuthorizationURL(state, {
        scopes:["read:user", "user:email"]
    });

    cookies().set("github_state", state, {
        path: "/",
        secure: process.env.USE_HTTP === "1",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    return Response.redirect(url);

}
import {generateState} from "arctic";
import {apple} from "@/libs/oauth/provider";
import {cookies} from "next/headers";

export async function GET(req: Request):Promise<Response>{
    const state = generateState();
    const url = await apple.createAuthorizationURL(state, {
        scopes:["name", "email"]
    });
    url.searchParams.set("response_mode", "form_post");

    cookies().set("apple_state", state, {
        path: "/",
        secure: process.env.USE_HTTP === "1",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    return Response.redirect(url);

}
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {lucia} from "@/libs/auth/lucia";
import {getSession} from "@/libs/auth/session-actions";

export async function GET() {
    const {session} = await getSession();
    if (session) {
        await lucia.invalidateSession(session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }

    redirect("/login")
}
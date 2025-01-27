'use server'

import React from "react";
import {Session, User} from "lucia";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {lucia} from "@/libs/auth/lucia";

export const getSession = React.cache(
    async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
        const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(result.session.id);
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
            if (!result.session) {
                const sessionCookie = lucia.createBlankSessionCookie();
                cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
            }
        } catch {}
        return result;
    }
);

export async function logout(){
    const { session } = await getSession();
    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await lucia.invalidateSession(session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/login");
}

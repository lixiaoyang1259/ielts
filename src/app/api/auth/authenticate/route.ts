import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {loadUserByEmail} from "@/libs/db/account";
import {lucia} from "@/libs/auth/lucia";

export async function POST(request: Request) {
    const data = await request.formData()
    const email = data.get("email")
    const password = data.get("password")
    if(!email || !password){
        redirect("/login?error=login_error")
    }
    const user = await loadUserByEmail(email.toString())
    if(!user){
        redirect("/login?error=login_error")
    }
    if(user.password !== password.toString()){
        redirect("/login?error=login_error")
    }
    const userId = user.id

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
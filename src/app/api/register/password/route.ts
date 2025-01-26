import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {AuthProfile} from "@/libs/oauth/create-session";
import {lucia} from "@/libs/auth/lucia";
import {createUser, loadCodeRecord, loadUserByEmail, updatePassword} from "@/libs/db/account";

export async function POST(request: Request) {
    const data = await request.formData()
    const code = data.get("code")
    const password1 = data.get("password1")
    const password2 = data.get("password2")
    if (!code) {
        redirect(`/password?error=no_code&code=${code}`)
    }
    if (!password1) {
        redirect(`/password?error=no_password1&code=${code}`)
    }
    if (!password2) {
        redirect(`/password?error=no_password2&code=${code}`)
    }
    if (password1.toString() !== password2.toString()) {
        redirect(`/password?error=different_password&code=${code}`)
    }
    const email = cookies().get("register_email")?.value || null

    const codeRecord = await loadCodeRecord(code.toString())
    if (!codeRecord) {
        redirect(`/password?error=code_error&code=${code}`)
    }
    if (!email || email != codeRecord.email) {
        redirect(`/password?error=no_email&code=${code}`)
    }

    const existUser = await loadUserByEmail(email.toString())
    let userId
    if (existUser) {
        const record = await updatePassword(existUser.id, password1.toString())
        userId = record.id
    }else {
        const profile: AuthProfile = {
            provider: "authenticate",
            providerId: "",
            username: email.split("@")[0],
            email: email,
            image: null,
            type: "authenticate",
            accessToken: null,
            password: password1.toString()
        }
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
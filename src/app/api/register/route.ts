import {redirect} from "next/navigation";
import {alphabet, generateRandomString} from "oslo/crypto";
import {cookies} from "next/headers";
import {createVerifyCode, loadUserByEmail} from "@/libs/db/account";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
    const data = await request.formData()
    const email = data.get("email")
    if (!email) {
        redirect("/register?error=illegal_email")
    }

    const code = generateRandomString(6, alphabet("0-9", "A-Z"));
    const codeRecord = await createVerifyCode(email.toString(), code)

    const location = process.env.USE_MAIL === "1" ? "/password" : ("/password?code=" + code)

    if (process.env.USE_MAIL === "1") {
        //const transporter = nodemailer.createTransport(process.env.EMAIL_SERVER);

        const transporter = nodemailer.createTransport({
            host: 'smtpout.secureserver.net',
            port: 465,
            secure: true,
            auth: {
                user: '',
                pass: ''
            }
        });

        let mailOptions = {
            from: 'support@a.com',
            to: email.toString(),
            subject: 'Welcome to register for essay grade english writing helper',
            text: `Your register code is  ${code}`
        };
        transporter.sendMail(mailOptions, function (error, info) {
        });
    }

    cookies().set("register_email", email.toString(), {
        secure: process.env.USE_HTTP === "1",
        path: "/",
        httpOnly: true,
        maxAge: 60 * 10 // 10 min
    })

    return new Response(null, {
        status: 302,
        headers: {
            Location: "/confirm"
        }
    });
}

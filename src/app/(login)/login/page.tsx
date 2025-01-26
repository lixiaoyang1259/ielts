'use client'
import React, {useContext, useEffect} from "react";
import styles from "./page.module.scss"
import OAuthButton from "@/app/(login)/login/components/oauth-button";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {ErrorToastContext} from "@/app/(login)/component/toast-provider";

const MainLoginPage: React.FC<{ searchParams?: { [key: string]: string } }> = (props) => {
    const t = useTranslations("LoginPage")
    const toastContext = useContext(ErrorToastContext);

    const reason = props.searchParams?.reason
    useEffect(() => {
        let noticeText = null
        switch (reason) {
            case "login_error":
                noticeText = t("common_login_error")
                break;
            case "existed":
                noticeText = t("email_existed")
                break;
            case "access-denied_g":
            case "oauth_access_denied_g":
                noticeText = t("access_denied_g")
                break
            case "access-denied_h":
            case "oauth_access_denied_h":
                noticeText = t("access_denied_h")
                break;
            case "access-denied_c":
            case "oauth_access_denied_c":
                noticeText = t("access_denied_c", {provider:"Apple"})
                break;
        }

        if (noticeText) {
            toastContext?.show(noticeText)
        }
    });

    return <div className={styles.main_container}>
        <div className={styles.welcome}>{t("login_welcome")}</div>
        <form action={"/api/auth/authenticate"} method={"POST"} className={styles.form}>
            {/*{reason && <div className={styles.error_info}>{errorInfo}</div>}*/}
            <label htmlFor={"email"} className={styles.input_label}>E-mail</label>
            <input type={"email"} name={"email"} placeholder={"input your email"} className={styles.input}
                   required={true}/>
            <label htmlFor={"password"} className={styles.input_label}>Password</label>
            <input type={"password"} name={"password"} placeholder={"input your password"} className={styles.input}
                   required={true} pattern=".{6,20}" title={t("password_format")}/>
            <Link href={"/register"} className={styles.forgot_password} prefetch={false}>{t("forgot_password")}</Link>
            <button type={"submit"} className={styles.sign_in}>{t("sign_in")}</button>
        </form>
        {/*<div className={styles.notice}>{t("signup_notice")}</div>*/}
        <div>
            <div className={styles.split_line}>
                <span className={styles.or}>or</span>
            </div>
        </div>

        <div className={styles.oauth_button_group}>
            <OAuthButton icon={"/google.png"} provider={"google"}/>
            <OAuthButton icon={"/github.png"} provider={"github"}/>
            <OAuthButton icon={"/apple.svg"} provider={"apple"}/>
        </div>

    </div>
}

export default MainLoginPage
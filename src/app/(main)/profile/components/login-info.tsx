'use client'
import React, {MouseEventHandler} from "react";
import styles from "./login-info.module.scss";
import {useRouter} from "next/navigation";
import {Element} from "react-scroll";
import MenuLink from "@/app/(main)/profile/components/menu-link";
import {useTranslations} from "next-intl";

const LoginInfo: React.FC<{ name: string }> = (props) => {
    const router = useRouter()
    const t = useTranslations("ProfilePage")
    const logout: MouseEventHandler<HTMLDivElement> = async (e) => {
        router.push("/api/auth/logout")
        // signOut({callbackUrl:"/login"})
    }

    return <div className={styles.logout_container}>
        <div className={styles.login_literal}>{t("login_info")}</div>
        <MenuLink name={props.name}></MenuLink>
        <div className={styles.signout_button} onClick={logout}>{t("logout")}</div>
        <Element name={props.name}></Element>
    </div>
}
export default LoginInfo
// 'use client'
import React, {Fragment} from "react";
import styles from "./main-header.module.scss"
import Image from "next/image"
import MenuGroup from "@/app/(main)/components/menu-group";
import UserinfoButton from "@/app/componments/userinfo-button";
import LanguageButton from "@/app/componments/language-button";
import {getTranslations} from "next-intl/server";
import Link from "next/link";
import {getSession} from "@/libs/auth/session-actions";
import {getPersonalInfo} from "@/app/server-actions/userinfo-actions";

const items= [
    {
      name:"main",
        displayName: "main",
        path:"/main"
    },
    {
        name : "ielts",
        displayName : "ielts",
        path : "/ielts"
    },
    {
        name : "record",
        displayName : "records",
        path : "/record",
        needSession : true
    },
    {
        name : "custom",
        displayName : "custom",
        path : "/custom",
    },

    {
        name : "contact",
        displayName : "contact",
        path : "/contact"
    },
]

const MainHeader: React.FC = async() => {
    const t = await getTranslations("MainPage")
    const session = await getSession()
    const userInfoRes =  await getPersonalInfo()
    const userInfo = (userInfoRes.code === 0  && userInfoRes.data)  ? userInfoRes.data : undefined;
    return <Fragment>
        <div className={styles.main_container}>
            <div className={styles.logo_container}>
                <Image src={"/main_logo.png"} width={40} height={40} alt={"logo"} className={styles.logo}/>
            </div>
            <MenuGroup menuItems={items} defaultName={"main"} ></MenuGroup>
            {/*<div className={styles.spacer}></div>*/}
            <div className={styles.options}>
                <LanguageButton ></LanguageButton>
                {
                    session && session.user ? <UserinfoButton userInfo={userInfo}></UserinfoButton>
                        : <Link href={"/login"} className={styles.login_button} prefetch={false}>{t("username_placeholder")}</Link>
                }
                {
                    (! (session && session.user)) && <Link  prefetch={false} className={styles.signup_button} href={"/register"}>{t("signup")}</Link>
                }
            </div>
        </div>
        <div className={styles.main_line}></div>
    </Fragment>
}

export default MainHeader
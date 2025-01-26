'use client'
import styles from "./page.module.scss"
import React, {ChangeEventHandler, useContext, useEffect} from "react";
import {useTranslations} from "next-intl";
import {ErrorToastContext} from "@/app/(login)/component/toast-provider";

function isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const MainRegisterPage: React.FC<{ searchParams?: { [key: string]: string } }> = (props) => {
    const t = useTranslations("RegisterPage")
    const errorTips = useContext(ErrorToastContext)
    const [enableButton, setEnableButton] = React.useState<boolean>(false)

    const reason = props.searchParams?.error

    useEffect(() => {
        if (reason && errorTips) {
            if (reason === "illegal_email") {
                errorTips.show(t("illegal_email"))
            }
        }
    }, []);

    const changeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const content = e.target.value
        setEnableButton(isEmail(content))
    }

    const buttonStyle = [styles.sign_in, enableButton ? "" :styles.sign_in_disable].join(" ")
    return <div className={styles.main_container}>
        <div className={styles.welcome}>{t('register_now')}</div>
        <form action={"/api/register"} method={"POST"} className={styles.form}>
            {/*{reason && <div className={styles.error_info}>{errorInfo}</div>}*/}
            <label htmlFor={"email"} className={styles.input_label}>E-mail</label>
            <input type={"email"} name={"email"}
                   onChange={changeHandler}
                   placeholder={"input your email"}
                   className={styles.input}
                   required/>
            <button type={"submit"} className={buttonStyle}>{t("continue")}</button>
        </form>
        <div className={styles.notice}>{t("verify_mail_notice")}</div>
    </div>
}

export default MainRegisterPage
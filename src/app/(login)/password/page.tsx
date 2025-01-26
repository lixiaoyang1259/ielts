'use client'
import React, {useContext, useEffect} from "react";
import styles from "./page.module.scss"
import {ErrorToastContext} from "@/app/(login)/component/toast-provider";
import {useTranslations} from "next-intl";

const Page: React.FC<{ searchParams?: { [key: string]: string } }> = ({searchParams}) => {
    const code = searchParams?.code
    const t = useTranslations("PasswordPage")
    const errorTips = useContext(ErrorToastContext)
    const [enableButton, setEnableButton] = React.useState<boolean>(false)

    const reason = searchParams?.error

    useEffect(() => {
        if (reason && errorTips) {
            let content = "common_password_error"
            switch (reason) {
                case "different_password":
                    content = "different_password"
                    break;
                case "code_error":
                    content = "code_or_link_error"
                    break;
                case "no_email":
                    content = "code_or_link_error"
                    break
            }
            errorTips.show(t(content))
        }
    }, []);

    return <div className={styles.main_container}>
        <div className={styles.welcome}>{t("set_password")}</div>
        <form action={"/api/register/password"} method={"POST"} className={styles.form}>
            <input type={"text"} name={"code"}
                   className={styles.input}
                   value={code}
                   hidden
                   readOnly={true}
                   required/>
            <label htmlFor={"password1"} className={styles.input_label}>{t("first_password")}</label>
            <input type={"password"} name={"password1"}
                   placeholder={t("input_your_password")}
                   className={styles.input}
                   pattern=".{6,20}" title={t("password_format")}
                   required/>
            <label htmlFor={"password2"} className={styles.input_label}>{t("second_password")}</label>
            <input type={"password"} name={"password2"}
                   placeholder={t("second_password")}
                   className={styles.input}
                   pattern=".{6,20}" title={t("password_format")}
                   required/>
            <button type={"submit"} className={styles.sign_in}>{t("continue")}</button>
        </form>
        <div className={styles.notice}>{t("finished")}</div>
    </div>
}
export default Page
'use client'
import styles from "./personal-info.module.scss";
import {Element} from "react-scroll"
import MenuLink from "@/app/(main)/profile/components/menu-link";
import React from "react";
import {UserInfoData} from "@/app/server-actions/userinfo-actions";
import {useTranslations} from "next-intl";

const PersonalInfo: React.FC<{ name: string, info :UserInfoData}> = (props) => {
    const t = useTranslations("ProfilePage")

    return <div className={styles.main_container}>
        <Element name={props.name}></Element>
        <MenuLink name={props.name}></MenuLink>
        <div className={styles.main_title_literal}>{t("personal_info")}</div>
        <div className={styles.account_info_literal}>{t("account_info")}</div>
        <form className={styles.content_form}>
            <div className={styles.userInfo_line}>
                <div className={styles.info_module}>
                    <label htmlFor={"user_name"}>{t("user_name")}</label>
                    <input id={"user_name"} name={"user_name"} defaultValue={props.info.username} disabled/>
                </div>
                <div className={styles.info_module}>
                    <label htmlFor={"email"}>{t("email")}</label>
                    <input id={"email"} name={"email"} defaultValue={props.info.email} disabled/>
                </div>
            </div>
            {/*<div className={styles.ielts_type_literal}> IELTS type</div>*/}
            {/*<input className={styles.type_input} type={"radio"} id={"academic"} name={"type"} value={"academic"}/>*/}
            {/*<label htmlFor={"academic"} className={styles.type_label}>Academic</label>*/}
            {/*<input className={styles.type_input} type={"radio"} id={"general"} name={"type"} value={"general"}/>*/}
            {/*<label htmlFor={"general"} className={styles.type_label}>General</label>*/}
            {/*<button type={"submit"} className={styles.apply_button}>apply</button>*/}
        </form>
    </div>
}

export default PersonalInfo
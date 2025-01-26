'use client'
import styles from './promotion.module.scss';
import React, {MouseEventHandler, useEffect} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";

const PromotionBar : React.FC = (props) => {
    const t = useTranslations("MainPage")
    const [visible, setVisible] = React.useState(true);
    const router = useRouter()

    const close : MouseEventHandler<HTMLDivElement> = ()=>{
        setVisible(false)
    }
    const login : MouseEventHandler<HTMLDivElement> = ()=>{
        router.push("/login")
    }

    return (visible && <div className={styles.main_container}>
        <div className={styles.promotion_info}>{t("promotion_info")}</div>
        <div className={styles.login_button} onClick={login}>{t("get_point")}</div>
        <div className={styles.close_button} onClick={close}></div>

    </div>)
}

export default PromotionBar;
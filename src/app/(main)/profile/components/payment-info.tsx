import React, {useContext} from "react";
import styles from "./payment-info.module.scss";
import {Element} from "react-scroll"
import MenuLink from "@/app/(main)/profile/components/menu-link";
import {useTranslations} from "next-intl";

const PaymentInfo:React.FC<{name :string, point : number}> = (props)=>{
    const t = useTranslations("ProfilePage")

    return <div className={styles.main_container}>
        <Element name={props.name}></Element>
        <div className={styles.payment_literal}>{t("payment_info")}</div>
        {/*<div className={styles.point_title}>点数:</div>*/}
        <MenuLink name={props.name}></MenuLink>
        <div className={styles.current_point}>{t("points")}: {props.point}</div>
    </div>
}
export default PaymentInfo
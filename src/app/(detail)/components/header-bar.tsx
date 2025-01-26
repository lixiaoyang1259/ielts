import React from "react";
import styles from "./header-bar.module.scss"
import Image from "next/image"
import LanguageButton from "@/app/componments/language-button";
import UserinfoButton from "@/app/componments/userinfo-button";
import PointsButton from "@/app/componments/points-button";
import {getPersonalInfo} from "@/app/server-actions/userinfo-actions";

const HeaderBar: React.FC = async () => {
    const userInfoRes = await getPersonalInfo();
    const userInfo = (userInfoRes.code === 0  && userInfoRes.data)  ? userInfoRes.data : null;

    return <div className={styles.main_container}>
        {/*<div onClick={()=>{*/}
        {/*    router.back()*/}
        {/*}}>*/}
        {/*    <LeftArrow className={styles.back_button}></LeftArrow>*/}
        {/*</div>*/}
        <Image className={styles.main_icon} src={"/main_logo.png"} alt={"logo"} width={30} height={30}></Image>
        <div className={styles.bar_space}></div>
        <LanguageButton className={styles.language_button}></LanguageButton>
        <PointsButton></PointsButton>
        <UserinfoButton userInfo={userInfo ?? undefined}></UserinfoButton>
    </div>
}

export default HeaderBar
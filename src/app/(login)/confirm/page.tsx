'use client'
import styles from "./page.module.scss"
import React, {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";

declare const setInterval: (callback: (...args: any[]) => void, delay: number,...args: any[]) => number;
const MainRegisterPage: React.FC<{ searchParams?: { [key: string]: string } }> = (props) => {
    const t = useTranslations("ConfirmPage")
    const [count, setCount] = useState(3)
    const countDownRef = useRef(-1)
    const router = useRouter()

    useEffect(() => {
        // void function (){
        //   countDownRef.current = setInterval(()=>{
        //       if(count === 0){
        //         router.push("/main")
        //       }else{
        //           setCount(count - 1)
        //       }
        //   }, 1000)
        // }()
        // return ()=>{
        //     clearTimeout(countDownRef.current)
        // }
    } );

    return <div className={styles.main_container}>
        <img src={"/mail_icon.png"} className={styles.mail_icon}></img>
        <div className={styles.notice}>{t("email_notice")}</div>
        {/*<div className={styles.count_down}>{t("count_down", {count : count})}</div>*/}
    </div>
}

export default MainRegisterPage
'use client'
import {useCallback, useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./login-notify.module.scss"
import {useTranslations} from "next-intl";
declare const setInterval: (callback: (...args: any[]) => void, delay: number,...args: any[]) => number;
declare const setTimeout: (callback: (...args: any[]) => void, delay: number, ...args: any[]) => number;

const LoginNotifyPage: React.FC<{ notice?: string }> = (props) => {
    const t = useTranslations("LoginNotify")
    const [time, setTime] = useState(3)
    const router = useRouter();
    const notice = props.notice ?? t("login_notice")
    const interVal = useCallback(()=>{
        setTime((old)=> old - 1)
    }, [])

    const intervalId = useRef<number>(0)
    const timeoutId = useRef<number>(0)

    useEffect(() => {
        clearTimeout(timeoutId.current)
        timeoutId.current = setTimeout(() => {
            router.push("/login");
        }, 3000)
        if(intervalId.current != 0){
            clearInterval(intervalId.current)
        }

        intervalId.current = setInterval(interVal, 1000)

        return ()=>{
            clearTimeout(timeoutId.current)
            clearInterval(intervalId.current)
        }
    }, [])

    return <div className={styles.notice}>
        {notice + `, ${t("jump_notice", {time:time})}...`}
    </div>
}

export default LoginNotifyPage;
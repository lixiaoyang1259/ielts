import React from "react";
import styles from "./toast.module.scss"

export interface ErrorToastProps {
    message : string,
    time ?: number
}

const ErrorToast : React.FC<ErrorToastProps> = ({message, time}:ErrorToastProps)=>{


    return <div className={styles.error_container}>
        <img src={"/error_icon.png"} className={styles.icon}></img>
        <div className={styles.notice_message}>{message}</div>
    </div>
}

export default ErrorToast
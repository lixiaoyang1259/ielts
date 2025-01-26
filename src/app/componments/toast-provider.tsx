'use client'
import React, {createContext, useCallback, useEffect, useRef, useState} from "react";
import styles from "./toast-provider.module.scss"

declare const setTimeout: (callback: (...args: any[]) => void, delay: number, ...args: any[]) => number;

export const ToastContext = createContext<Toast>({
    show: (content: string, timeout?: number) => {
    }
})

export interface Toast {
    show: (notice: string, timeout ?: number) => void
}

const ToastProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const [toastShow, setToastShow] = useState<boolean>(false)
    const [toastContent, setToastContent] = useState<string>("")

    const toastOptions = {
        show: (content: string, timeout?: number) => {
            setToastContent(content)
            setToastShow(true)

            if (timeout) {
                setTimeout(() => {
                    setToastContent("")
                    setToastShow(false)
                }, timeout)
            }
        }
    }

    const contentStyle = [styles.tips_content, toastShow? styles.pull_in:styles.pull_out].join(" ")

    return <ToastContext.Provider value={toastOptions}>
        { <div className={contentStyle}>
            {toastContent}
        </div>}
        {props.children}
    </ToastContext.Provider>
}

export default ToastProvider;
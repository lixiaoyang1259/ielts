'use client'
import React, {createContext, Fragment, memo, ReactNode, useRef, useState} from "react";
import ErrorToast from "@/app/(login)/component/toast";

export interface ErrorToastOptions {
    show: (message:string, time?:number) => void
}

export const ErrorToastContext = createContext<ErrorToastOptions | null>(null)

const ErrorToastProvider : React.FC<{children : ReactNode}>= ({children}) => {
    const [message, setMessage] = useState<string>("");
    const [showToast, setToastShow] = useState<boolean>(false)

    const options = {
        show : (message:string, time?:number)=>{
            // if(timeoutRef.current){
            //     clearTimeout(timeoutRef.current)
            // }
            setMessage(message)
            setToastShow(true)
        }
    }

    return <ErrorToastContext.Provider value={options}>
        {showToast && <ErrorToast  message={message}></ErrorToast>}
        {children}
    </ErrorToastContext.Provider>
}

export default ErrorToastProvider
'use client'
import React, {createContext, useEffect, useRef} from "react";
import styles from "@/app/componments/loading-dialog.module.scss";
import ModelDialog, {ModelDialogEventHandler} from "@/app/componments/model-dialog";

declare const setTimeout: (callback: (...args: any[]) => void, delay: number, ...args: any[]) => number;

export interface LoadingDialogHandler {
    show: (notice ?: string, timeout?: number, callback?: () => void) => void,
    hide: () => void,
    isShow: () => boolean
}

export const LoadingDialogContext = createContext<LoadingDialogHandler | null>(null)


const LoadingDialogProvider: React.FC<{ children: React.ReactNode }> = (props) => {
    const dlgRef = useRef<ModelDialogEventHandler>(null)
    const timeoutRef = useRef<number>(0)
    useEffect(() => {
        return () => {
            if (timeoutRef.current != 0) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])


    return <LoadingDialogContext.Provider value={{
        show: (notice, timeout, callback) => {
            if (dlgRef.current) {
                dlgRef.current.show()
            }
            if (timeout) {
                if (timeoutRef.current != 0) {
                    clearTimeout(timeoutRef.current)
                }
                timeoutRef.current = setTimeout(() => {
                    if (dlgRef.current) {
                        dlgRef.current.hide()
                    }
                    if(callback){
                        callback()
                    }
                }, timeout)
            }
            if (notice) {
            }
        },
        hide: () => {
            if (dlgRef.current) dlgRef.current.hide()
        },
        isShow: () => {
            if (dlgRef.current) return dlgRef.current.isShow()
            else return false
        }
    }}>
        <ModelDialog
            position={"center"}
            backgroundMask={true}
            stopAutoHide={true}
            ref={dlgRef}>
            <div className={styles.loading}>
                <div className={styles.loading_spinner}></div>
            </div>
        </ModelDialog>
        {props.children}
    </LoadingDialogContext.Provider>
}

export default LoadingDialogProvider;
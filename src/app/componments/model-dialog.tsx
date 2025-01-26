'use client'
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from "./model-dialog.module.scss"

export interface ModelDialogEventHandler {
    show: () => void,
    hide: () => void,
    isShow: () => boolean,
}

export interface ModelDialogProps {
    children: React.ReactNode,
    onHidden?: () => boolean,
    stopScroll?: boolean,
    stopAutoHide?: boolean,
    backgroundMask?: boolean
    position: "center" | "custom"
    positionOffset?: { left: number, top: number },
}


const ModelDialog = forwardRef<ModelDialogEventHandler, ModelDialogProps>((props, ref) => {
    const [hidden, setHidden] = useState(true);
    const menuRef = useRef<HTMLDivElement>(null)
    const escHandler = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape" && !props.stopAutoHide) {
            stopScroll(false)
            setHidden(true)
        }
    }, [])

    const wheelHandler = useCallback((event: WheelEvent) => {
        event.preventDefault() //if function declared in component function, it will recreate in next render process, and removeEventLister won't work
    }, [])

    const stopScroll = (stop: boolean) => {
        if (!window) return;
        if (stop) {
            window.addEventListener("wheel", wheelHandler, {passive: false})
        } else {
            window.removeEventListener("wheel", wheelHandler)
        }
    }

    const doHide = () => {
        stopScroll(false)
        // captureClick(false)
        setHidden(true)
    }

    useEffect(() => {
        document.addEventListener('keydown', escHandler, {passive: true})
        return () => {
            // document.removeEventListener("click", clickHandler)
            document.removeEventListener('keydown', escHandler)
            window.removeEventListener("wheel", wheelHandler)
        }
    }, []);

    useImperativeHandle(ref, () => ({
        show: () => {
            stopScroll(true)
            // captureClick(true)
            setHidden(false)
        },
        hide: doHide,
        isShow: () => {
            return hidden
        }
    }))

    const positionOffset = props.positionOffset ? {
        left: props.positionOffset.left,
        top: props.positionOffset.top
    } : { }

    const position = props.position === "center" ? styles.position_container_center : styles.position_container_customer

    return !hidden && <div className={styles.main_container} ref={menuRef} onClick={() => {
        if (!props.stopAutoHide) {
            doHide()
        }
    }} style={props.backgroundMask ? {background: "#BBBBBB66"} : {}} >
        {/*span 来移除绕来绕去的react click事件*/}
        <div className={position} style={positionOffset} onClick={(e) => e.stopPropagation()}>
            {props.children}
        </div>
    </div>
})

export default ModelDialog
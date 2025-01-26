'use client'
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import styles from "./count-down.module.scss";

declare const setInterval: (callback: (...args: any[]) => void, delay: number,...args: any[]) => number;
export interface CountdownEventHandler {
    start: () => void
    stop: () => void
}

const CountDown = forwardRef<CountdownEventHandler, { timeInMinutes: number }>((props, ref) => {
    const [visible, setVisible] = useState(true)

    const startTime = props.timeInMinutes * 60 * 1000 // convert to a million seconds
    const [timeLeft, setTimeLeft] = useState(startTime)
    const intervalRef = useRef<number>( )
    const stopCountdown = ()=>{
        if(intervalRef.current){
            clearInterval(intervalRef.current)
            intervalRef.current = undefined
        }
    }

    useEffect(() => {
        return stopCountdown
    }, [])

    useImperativeHandle(ref, () => {
        return {
            start: () => {
                stopCountdown()
                const interval = setInterval(() => {
                    if (timeLeft < 0) {
                        clearInterval(interval)
                        setTimeLeft(-1)
                        //not stop? show red
                    } else {
                        setTimeLeft((pre) => pre - 1000)
                    }

                }, 1000)

                intervalRef.current = interval

            },
            stop: () => {
                stopCountdown()
            }
        }
    }, [])

    const changeStatus = () => {
        setVisible(!visible)
    }
    const normalClassName = timeLeft <= 0 ?  [styles.countdown, styles.countdown_over].join(" "): styles.countdown
    const className = visible ? normalClassName : styles.countdown_close
    const minutes = timeLeft > 0 ? String(Math.floor(timeLeft /1000 / 60)).padStart(2, '0') : "00"
    const seconds = timeLeft > 0 ? String(Math.floor(timeLeft / 1000 % 60)).padStart(2, '0') : "00"

    return <div className={className} onClick={changeStatus}>
        {visible ? `00:${minutes}:${seconds}` : "--:--:--"}
    </div>

})

export default CountDown
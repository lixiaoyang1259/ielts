'use client'
import React, {ChangeEventHandler, createContext, useEffect, useRef, useState} from "react";
import styles from "./float-menu.module.scss"
import {scroller} from "react-scroll"
import {menuVisibleListener} from "@/app/(main)/profile/components/menu-visible-listener";
import {useTranslations} from "next-intl";

export interface FloatMenuItem {
    name: string,
    icon: React.FC<React.SVGProps<SVGElement>>,
    path: string,
}

export interface FloatMenuProps {
    items: FloatMenuItem[],
    default: string;
}

export const menuContext = createContext<(name: string, visible: boolean) => void>(() => {
})

const FloatMenu: React.FC<FloatMenuProps> = (props) => {
    const [checked, setChecked] = useState(props.default)
    const ignoreCallback = useRef<boolean>(false)
    const t = useTranslations("ProfilePage")

    const onMenuSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
        const target = props.items.find((item) => item.name === e.target.value)
        setChecked(e.target.value)
        if (target) {
            scroller.scrollTo(target.name, {
                duration: 500,
                delay: 100,
                smooth: true,
            })
            ignoreCallback.current = true;
        }
    }

    useEffect(() => {
        props.items.map((item)=>{
            menuVisibleListener.register(item.name, (visible)=>{
                console.log("callback ; ", `${ignoreCallback.current}`)
                if(ignoreCallback.current){
                    ignoreCallback.current = false;
                    return;
                }

                if(visible) {
                    setChecked(item.name)
                }
            })
        })
        return ()=>{
            menuVisibleListener.unMount()
        }
    }, props.items)


    return <div className={styles.menu_container}>
            {
                props.items.map((item) => {
                    return <div key={item.name} className={styles.item_container}>
                        <input className={styles.menu_input_radio} id={item.name} type={"radio"} name={"menu_item"}
                               value={item.name}
                               checked={item.name === checked}
                               onChange={onMenuSelect}
                               hidden/>
                        <item.icon className={styles.item_icon}></item.icon>
                        <label htmlFor={item.name} className={styles.item_name}>
                            {t(item.name)}
                        </label>
                    </div>
                })
            }
    </div>
}
export default FloatMenu
'use client'
import React, {forwardRef, Fragment, useEffect, useImperativeHandle, useState} from "react";
import styles from "./menu-group.module.scss"
import {usePathname, useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

interface MenuItem {
    name: string,
    displayName: string,
    path: string,
    disabled?: boolean
}

export interface MenuSelectHandler {
    selectMenu: (menuName: string | null | undefined) => void;
}

interface MenuGroupProps {
    menuItems: MenuItem[],
    defaultName?: string,
}

const MenuGroup: React.FC<MenuGroupProps> = (props) => {
    const [selected, setSelected] = useState<string | null | undefined>('main')
    let pathName = usePathname()
    // if(pathName === "/"){
    //     pathName = "/main"
    // }
    const t = useTranslations("MainMenu")

    useEffect(() => {
        const selectItem = items.find((item) => {
            const currentPath = pathName === "/" ? "/main" : pathName
            return item.path === currentPath
        })
        setSelected(selectItem?.name)

    }, [pathName])

    const router = useRouter()

    const items = props.menuItems;

    function onSelected(e: React.ChangeEvent<HTMLInputElement>) {
        const item = items.find((i) => {
            return i.name === e.target.value
        })

        if (item) {
            if (item.disabled) {
                return
            }
            router.push(item.path)
        }
    }

    return <div className={styles.menu_group}>
        {
            items.map((value) => {
                return <Fragment key={value.name}>
                        <input className={styles.input_radio} id={value.name} type="radio" name="menu"
                               value={value.name}
                               onChange={onSelected} hidden checked={selected === value.name}/>
                        <label className={styles.menu_item_name} htmlFor={value.name}>{t(value.displayName)}
                        </label>
                </Fragment>
            })
        }
    </div>
}

export default MenuGroup
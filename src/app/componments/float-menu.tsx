'use client'
import styles from "./float-menu.module.scss"
import React, {MouseEventHandler} from "react";

export interface FloatMenuItem {
    id: string,
    name: string,
}

export interface FloatMenuProps {
    items : FloatMenuItem[]
    onSelect : (item: FloatMenuItem) => void
    className ?: string
}

const FloatMenu: React.FC<FloatMenuProps> = (props) => {
    const containerClassName = props.className ? [styles.menu_container, props.className].join(' ')  : styles.menu_container

    function onClickHandler(e: React.MouseEvent<HTMLDivElement>, item : FloatMenuItem){
        props.onSelect(item)
    }
    return <div className={containerClassName}>
        {
            props.items.map((item)=>{
                return <div className={styles.menu_name} key={item.id} onClick={(e)=>onClickHandler(e, item)}>
                    {item.name}
                </div>
            })
        }
    </div>
}

export default FloatMenu
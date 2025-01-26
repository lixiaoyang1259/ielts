import React from "react";
import styles from "./layout.module.scss"

const Layout : React.FC< Readonly<{ children: React.ReactNode; }>> = (props)=>{


    return <div className={styles.main_container}>
        <div className={styles.content_container}>
            {props.children}
        </div>
    </div>
}

export default Layout
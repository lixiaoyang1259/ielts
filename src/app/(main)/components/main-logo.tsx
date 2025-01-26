import React from "react";
import styles from "../main.module.scss"

export interface MainLogoProps{
}

const MainLogo : React.FC<MainLogoProps> = (props)=>{
    return <div className={styles.main_logo}>IELTS Writing Helper</div>
}

export default MainLogo
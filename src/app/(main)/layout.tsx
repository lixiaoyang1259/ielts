import React from "react";
import styles from "./layout.module.scss"
import MainHeader from "@/app/(main)/components/main-header";
import PromotionBar from "@/app/(main)/components/promotion";
import {getSession} from "@/libs/auth/session-actions";

const Layout : React.FC< Readonly<{ children: React.ReactNode; }>> = async ({children})=>{
    const session = await getSession()

    return <div className={styles.page_container}>
        {
            (!(session && session.user))&&<PromotionBar></PromotionBar>
        }
        <MainHeader></MainHeader>
            {children}
        </div>
}

export default Layout
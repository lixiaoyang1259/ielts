import React from "react";
import styles from "./layout.module.scss"
import ErrorToastProvider from "@/app/(login)/component/toast-provider";
import LanguageButton from "@/app/componments/language-button";

const MainHeader : React.FC<Readonly<{ children: React.ReactNode; }>> = async ({children})=>{

    return <div className={styles.page_container}>
        <div className={styles.language_btn}>
            <LanguageButton></LanguageButton>
        </div>
        <ErrorToastProvider>
            {children}
        </ErrorToastProvider>
    </div>
}

export default MainHeader
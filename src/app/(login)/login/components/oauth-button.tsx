'use client'
import React, {useContext} from "react";
import styles from "./oauth-button.module.scss";
import Image from "next/image"
import Link from "next/link";
import {LoadingDialogContext} from "@/app/componments/loading-dialog-provider";

export interface OAuthButtonProps {
    icon : string,
    provider : string
}

const OAuthButton : React.FC<OAuthButtonProps> = (props)=>{

    const loadingDlg = useContext(LoadingDialogContext)
    // const onOAuthClick = async ()=>{
    //     try{
    //       const result =   await signIn(props.provider, {redirect : false})
    //     }
    //     catch (error){
    //     }
    // }

    return <Link href={`api/auth/${props.provider}`} className={styles.oauth_button} prefetch={false}>
            <Image className={styles.oauth_logo} src={props.icon } width="28" height="28" alt={props.icon} />
        </Link>
}

export default OAuthButton
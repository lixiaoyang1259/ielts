'use client'
import React, {Fragment, useContext, useEffect} from "react";
import styles from "./page.module.scss";
import PersonalInfo from "@/app/(main)/profile/components/personal-info";
import LoginInfo from "@/app/(main)/profile/components/login-info";
import PaymentInfo from "@/app/(main)/profile/components/payment-info";
import FloatMenu, {FloatMenuItem} from "@/app/(main)/profile/components/float-menu";
import User from "@/app/(main)/profile/icons/user.svg";
import Payment from "@/app/(main)/profile/icons/payment.svg";
import Logout from "@/app/(main)/profile/icons/logout.svg";
import {getPersonalInfo, UserInfoData} from "@/app/server-actions/userinfo-actions";
import {LoadingDialogContext} from "@/app/componments/loading-dialog-provider";

const menuItems: FloatMenuItem[] = [{
    name: "personal",
    icon: User,
    path: "./personal-info",

}, {
    name: "payment",
    icon: Payment,
    path: "./payment"
}, {
    name: "logout",
    icon: Logout,
    path: "./logout"
}]


const ProfilePage: React.FC = () => {
    const [userinfo, setUserinfo] = React.useState<UserInfoData>({
        username : "",
        email : "",
        image : "",
        point : -1
    })
    const loadingDlg = useContext(LoadingDialogContext)

    useEffect(()=>{
        (async ()=>{
            if(loadingDlg){
                loadingDlg.show("", 3000)
            }
            const result = await getPersonalInfo()
            if(loadingDlg){
                loadingDlg.hide()
            }
            if(result.code === 0 && result.data){
                setUserinfo(result.data as UserInfoData)
            }else{
            }

        })()

    }, [])

    return <Fragment>
        <FloatMenu items={menuItems} default={"Personal"}></FloatMenu>
            <div className={styles.profile_list}>
                <PersonalInfo name={"Personal"} info={userinfo}></PersonalInfo>
                <PaymentInfo name={"Payment"} point={userinfo.point}></PaymentInfo>
                <LoginInfo name={"Logout"}></LoginInfo>
            </div>
    </Fragment>
}

export default ProfilePage
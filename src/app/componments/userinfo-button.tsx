'use client'
import React, {MouseEventHandler, useEffect, useState} from "react";
import styles from "./userinfo.module.scss"
import {getSession, logout} from "@/libs/auth/session-actions";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {useTranslations} from "next-intl";
import {useRouter} from "next/navigation";
import {getPersonalInfo} from "@/app/server-actions/userinfo-actions";

interface UserinfoButtonProps {
    userName?: string,
    userImage?: string
}
interface UserInfo{
    username:string,
    email:string,
    point:string
}

const UserinfoButton: React.FC<{userInfo ?: UserInfo}> = (props) => {
    const t = useTranslations("MainMenu")
    const [userName, setUserName] = useState<string | null>(props.userInfo ? props.userInfo.username : null)
    const [userInfo, setUserInfo] = useState<null | UserInfo>(props.userInfo ? props.userInfo : null)
    const router = useRouter()

    useEffect(() => {
        // if(!props.userInfo){
        //     void async function () {
        //         const session = await getSession();
        //         const name = session.user?.username
        //         if (name) {
        //             setUserName(name.slice(0, 15))
        //         }
        //         const userInfo = await getPersonalInfo()
        //         if(userInfo.data && userInfo.code === 0){
        //             setUserInfo(userInfo.data as UserInfo)
        //         }
        //     }()
        // }
    }, []);

    const doLogout :MouseEventHandler<HTMLDivElement>= ()=>{
        logout().then(

        )
    }

    const onClick: MouseEventHandler<HTMLDivElement> = async (e) => {
        const session = await getSession();
        router.push('/login')
    }

    return <div className={styles.userinfo}>
        {/*{name &&  <Image src={"/user.svg"} alt="user" width={25} height={25}/>}*/}
        {
            userInfo && <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <div className={styles.username}>{userName}</div>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content className={styles.Content} sideOffset={5}>
                            <DropdownMenu.Item className={styles.Item}>
                                <img src={"/user.png"} className={styles.item_icon}></img>
                                <div>
                                    {userInfo?.username}
                                </div>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className={styles.Item}>
                                <img src={"/mail.png"} className={styles.item_icon}></img>
                                <div>
                                    {userInfo?.email}
                                </div>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className={styles.Item}>
                                <img src={"/point.png"} className={styles.item_icon}></img>
                                <div>
                                    {t("remaining_points") + userInfo?.point}
                                </div>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className={styles.Item} onClick={doLogout} >

                                <img src={"/logout.png"} className={styles.item_icon}></img>
                                <div  style={{color:"red"}}>
                                    {t("logout")}
                                </div>
                            </DropdownMenu.Item>

                            <DropdownMenu.Arrow style={{fill: "white"}}/>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
        }
    </div>
}

export default UserinfoButton
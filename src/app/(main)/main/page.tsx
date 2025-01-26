import React from "react";
import styles from "./page.module.scss";
import {getTranslations} from "next-intl/server";
import Link from "next/link";
import {getSession} from "@/libs/auth/session-actions";

const MainPage: React.FC = async () => {
    const t = await getTranslations("MainPage");
    const {user, session} = await getSession()
    const path = session && user ? "/ielts" :"/login"
    return <div className={styles.main_container}>
        <div className={styles.line1_block}>
            <div className={styles.line1_left_part}>
                <img className={styles.line1_left_logo} src={"/main_logo2.png"} width={163} height={80}></img>
                <div className={styles.line1_left_T1}>{t("left_T1")}</div>
                <div className={styles.line1_left_T2}>{t("left_T2")}</div>
                <div className={styles.line1_left_T3}>{t("left_T3")} </div>
                <Link href={path} className={styles.line1_left_button} prefetch={false}>{t("left_start_button")}</Link>
            </div>
            <img className={styles.line1_right_part}
                 src={"https://img.picgo.net/2024/11/13/Group-1000004394cdbdd7632b63e016.png"} alt={""} width={690}
                 height={570}></img>
        </div>
        <div className={styles.line2_title}>{t("line2_title")}</div>
        <div className={styles.line2_block}>
            <div className={styles.line2_left_block}>
                <div className={styles.line2_left_title}>{t("left_title")}</div>
                <div className={styles.line2_left_text}>
                    <ul>
                        <li>{t("line2_left_text_li1")}
                        </li>
                        <li>{t("line2_left_text_li2")}
                        </li>
                    </ul>
                </div>
                <img src={"https://img.picgo.net/2024/10/30/image-20fe3e2b0284ce86e3.png"}
                     className={styles.line2_left_icon}></img>
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.line2_right_block}>
                <div className={styles.line2_right_title}>{t("line2_right_title")}</div>
                <div className={styles.line2_right_text}>
                    <ul>
                        <li>{t("line2_right_text_li1")}
                        </li>
                        <li>{t("line2_right_text_li2")}
                        </li>
                    </ul>
                </div>
                <img className={styles.line2_right_icon}
                     src={"https://img.picgo.net/2024/10/30/image-19b9cd073b7ce01cb0.png"}></img>
            </div>
        </div>
        <div className={styles.line3_block}>
            <img className={styles.line3_left_block}
                 src={"https://img.picgo.net/2024/11/13/Group-12eb71ac5e17e1da0b.png"}></img>
            <div className={styles.line3_right_block}>
                <div className={styles.line3_right_title}>{t("line3_right_title")}</div>
                <div className={styles.line3_right_demo1}>{t("line3_right_demo1")}<p><span
                    className={styles.line3_right_text_name}>{t("line3_right_name1")}</span>
                </p></div>
                <div className={styles.line3_right_demo2}>{t("line3_right_demo2")} <p><span
                    className={styles.line3_right_text_name}>{t("line3_right_name2")}</span></p>
                </div>
            </div>
        </div>
        <div className={styles.line4_main_title}>{t("line4_main_title")}</div>
        <div className={styles.line4_block}>
            <div className={styles.line4_left_block}>
                <img src={"https://img.picgo.net/2024/10/30/1232xb90f36fee78a6008.png"}
                     className={styles.line4_icon}></img>
                <div className={styles.line4_title}>{t("line4_left_title")}</div>
                <div className={styles.line4_content}>{t("line4_left_content")}
                </div>
            </div>
            <div className={styles.line4_middle_block}>
                <img src={"https://img.picgo.net/2024/10/30/2232xf2a02ae484e83ec6.png"}
                     className={styles.line4_icon}></img>
                <div className={styles.line4_title}>{t("line4_middle_title")}</div>
                <div className={styles.line4_content}>{t("line4_middle_content")} </div>
            </div>
            <div className={styles.line4_right_block}>
                <img src={"https://img.picgo.net/2024/10/30/3232x4594623c698a280c.png"}
                     className={styles.line4_icon}></img>
                <div className={styles.line4_title}>{t("line4_right_title")}</div>
                <div className={styles.line4_content}>{t("line4_right_content")}
                </div>
            </div>
        </div>
        <div className={styles.space_line}></div>
        <div className={styles.about_block}>
            <img className={styles.about_icon} src={"/main_logo.png"}></img>
            <a href={"/privacy-policy"} style={{marginLeft:"20px"}}>privacy policy</a>
        </div>
    </div>
}

export default MainPage;
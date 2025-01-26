import React, {Fragment} from "react";
import styles from "./page.module.scss"
import Link from "next/link";
import {getCustomRecords} from "@/app/server-actions/custom-actions";
import LoginNotifyPage from "@/app/componments/login-notify-page";
import formatDate from "@/utils/date-format";
import NoRecordInCurrentPage from "@/app/(main)/custom/no-record-in-current-page";
import CustomPagination from "@/app/(main)/components/custom-pagination";
import {getTranslations} from "next-intl/server";

const Page: React.FC<{ searchParams?: { [key: string]: string } }> = async (props) => {
    const t = await getTranslations("CustomPage")
    const pageParam = props.searchParams?.page ?? "unknown"
    let page = parseInt(pageParam)
    if (Number.isNaN(page)) {
        page = 0
    }
    const tasks = await getCustomRecords(page);
    if (tasks.code !== 0 || !tasks.data) {
        if (tasks.code === -3) {
            return <LoginNotifyPage></LoginNotifyPage>
        }
        return <div>{t("unknown_error")}</div>
    }

    const hasRecord = tasks.data.records.length > 0

    return <div className={styles.main_container}>
        <div className={styles.custom_title_bar}>
            <div className={styles.title_name}>{t("record")}: <span className={styles.custom_count}>{tasks.data.count}</span>
            </div>
            <Link href={"/custom-create"} className={styles.add_button} target={"_blank"}> {t("create")} </Link>
        </div>
        <div className={styles.question_list}>

            {
                hasRecord && tasks.data.records.map((record) => {
                    return <Link prefetch={false} href={"/custom-review?id=" + record.id} key={record.id}
                                 className={styles.item_container} target="_blank">
                        <img src={"/custom.png"} className={styles.custom_icon}></img>
                        <div className={styles.question_area}>
                            <div className={styles.detail_question}>{record.question}</div>
                            <div className={styles.detail_level}>{record.level}</div>
                        </div>
                        <div className={styles.record_area}>
                            <div className={styles.detail_date}>{formatDate(record.date)}</div>
                            <div className={styles.detail_score}>{record.score === -1 ? "/" : record.score}</div>
                        </div>
                    </Link>
                })
            }
        </div>
        <div className={styles.index_group}>
            {hasRecord && tasks.data.pageCount > 1
                && <CustomPagination
                    total={tasks.data.count}
                    baseUrl={"/custom?"}>
                </CustomPagination>
            }
        </div>
        {
            !hasRecord && <NoRecordInCurrentPage></NoRecordInCurrentPage>
        }
    </div>
}

export default Page;
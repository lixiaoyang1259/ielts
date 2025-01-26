import React from "react";
import RecordItem from "@/app/(main)/record/components/record-item";
import {getRecords} from "@/app/server-actions/records-actions";
import {getTranslations} from "next-intl/server";
import {$Enums} from "@prisma/client";
import LoginNotifyPage from "@/app/componments/login-notify-page";
import {RECORD_PAGE_SIZE} from "@/utils/common-utils";
import styles from "./layout.module.scss"
import CustomPagination from "@/app/(main)/components/custom-pagination";


export interface IeltsRecord {
    id: string;
    task: {
        question: string,
        type: $Enums.Type,
        part: $Enums.Part,
        image: string | null,
        model_answer: string,
        title:string | null
    };
    score: number;
    review: string | null,
    answer: string,
    date: Date
}


export default async function Record({searchParams}: { searchParams?: { [key: string]: string | undefined }; }) {
    const t = await getTranslations("RecordPage")
    const page = searchParams?.page;
    const sort = searchParams?.sort;
    const filter = searchParams?.filter;
    let pageParam = parseInt(page || "0")
    if (isNaN(pageParam)) {
        pageParam = 0
    }
    let {code, data} = await getRecords(pageParam, sort, filter);

    if (code !== 0 || !data) {
        if (code === -3) {
            return <LoginNotifyPage></LoginNotifyPage>
        }
        return <div className={styles.exception_notice}>{t("exceptions")}</div>
    }

    const records = data.records


    if (records.length <= 0) {
        return <div className={styles.exception_notice}>{t("no_record")}</div>
    }


    let averageScore = data.score;
    const maxPage = Math.ceil(data.count / RECORD_PAGE_SIZE)

    return <div className={styles.recent_list}>
        <div className={styles.recent_list_options}>
            <div className={styles.recent_literal}> {t("record")} :
                <span className={styles.recent_count}>{data.count}</span>
            </div>
            {/*<div className={styles.average_score}>{t("average_score")} {averageScore.toFixed(1)}</div>*/}
            {/*<IconButton className={styles.all_recent_button} icon={"/filter.svg"}></IconButton>*/}
        </div>
        <div className={styles.recent_content}>
            {
                records.map((record) => {
                    return <RecordItem key={record.id} record={record}></RecordItem>
                })
            }
            {
                maxPage > 1 && <CustomPagination total={data.count} baseUrl={"/record?"}>
                </CustomPagination>
            }

        </div>
    </div>

}

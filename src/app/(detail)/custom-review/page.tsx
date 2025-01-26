import React from "react";
import styles from "./page.module.scss"
import {getCustomRecord} from "@/app/server-actions/custom-actions";
import {getPoint} from "@/app/server-actions/userinfo-actions";
import {getTranslations} from "next-intl/server";
import AnswerOption from "@/app/(detail)/task-review/components/answer-option";
import CustomReviewList from "@/app/(detail)/custom-review/components/custom-review-list";
import parse from "html-react-parser";


const Page: React.FC<{ searchParams?: { [key: string]: string } }> = async (props) => {
    const reviewId = props.searchParams?.id
    if (!reviewId) {
        //TODO: return
        return <></>
    }
    const t = await getTranslations("CustomReviewPage")

    const record = await getCustomRecord(reviewId);
    if (record.code !== 0 || !record.data) {
        return <div>{record.code}</div>
    }

    const reviewed = record.data.score >= 0
    const pointsRes = await getPoint()
    let points = 0
    if (pointsRes.code === 0 && pointsRes.data) {
        points = (pointsRes.data as { point: number }).point
    }

    let reviewObj = null
    if (reviewed && record.data.comments) {
        try {
            reviewObj = JSON.parse(record.data.comments)
        } catch (e) {
        }
    }
    console.log("reocrd version =", record.data.version)
    console.log("reocrd version =", record.data.comments)

    return <div>
        <div className={styles.main_container}>
            <div className={styles.question_area}>
                <div className={styles.question_level}>Question Type : {record.data.level}</div>
                <div className={styles.question_detail}>{record.data.question}</div>
            </div>
            <div className={styles.content_area}>
                <div className={styles.answer_area}>
                    <div className={styles.options_line}>
                        <div className={styles.answer_literal}>My answer</div>
                        {
                            !reviewObj &&
                            <AnswerOption recordId={record.data.id} points={points} isCustom={true}></AnswerOption>
                        }
                    </div>
                    <div className={styles.answer_detail}>
                        {
                            (!reviewObj) ? record.data.answer
                                : ( record.data.version === 2 ? parse(reviewObj.correction_result)
                                    :record.data.answer
                                )
                        }
                        {}
                    </div>
                </div>
                {
                    reviewObj && <div className={styles.comments_area}>
                        <div className={styles.review_literal}>Total score:{record.data.score}</div>
                        <CustomReviewList {...reviewObj} ></CustomReviewList>
                    </div>
                }
            </div>
        </div>
    </div>
}

export default Page;
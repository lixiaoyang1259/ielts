import React from "react";
import styles from "./page.module.scss"
import {getRecord} from "@/app/server-actions/records-actions";
import ReviewList from "@/app/(detail)/task-review/components/review-list";
import {getTranslations} from "next-intl/server";
import LoginNotifyPage from "@/app/componments/login-notify-page";
import HorizontalQuestionArea from "@/app/(detail)/task-review/components/horizontal-question-area";
import {getPoint} from "@/app/server-actions/userinfo-actions";
import AnswerOption from "@/app/(detail)/task-review/components/answer-option";
import parse from 'html-react-parser';

const TaskReview: React.FC = async ({searchParams}: { searchParams?: { [key: string]: string | undefined }; }) => {
    const recordId = searchParams?.record_id
    if (!recordId) {
        return <div>no record found, try it later</div>
    }

    const recordResponse = await getRecord(recordId)
    const t = await getTranslations("TaskReview")
    if (recordResponse.code !== 0) {
        if (recordResponse.code === -3) {
            return <LoginNotifyPage></LoginNotifyPage>
        }
        return <div>Some error occurred, try it later</div>
    }
    if (!recordResponse.data || !recordResponse.data.record) {
        return <div>Can't find this record, try it later</div>
    }
    const record = recordResponse.data?.record

    const hasScore = record.score !== -1
    const hasReview = record.review !== null
    let reviewObj = null
    if (record.review) {
        try {
            reviewObj = JSON.parse(record.review)
        } catch (e) {
        }
    }
    const pointsRes = await getPoint()
    let points = 0
    if (pointsRes.code === 0 && pointsRes.data) {
        points = (pointsRes.data as { point: number }).point
    }
    return <div className={styles.main_container}>
        <div className={styles.question_area}>
            <HorizontalQuestionArea images={record.task.image ? record?.task.image.split(";") : undefined}
                                    title={record.task.title?? "Question" }
                                    content={record.task.question}
            ></HorizontalQuestionArea>
        </div>
        <div className={styles.content_area}>
            <div className={styles.answer_area}>
                <div className={styles.answer_literal}>
                    {t("answer_literal")}
                    {!hasScore && <AnswerOption points={points} recordId={record?.id}></AnswerOption>}
                </div>

                <div className={styles.answer_content}>
                    {
                        !(hasScore && reviewObj) ?
                            record.answer
                            :(record.version === 1 ? record.answer : parse(reviewObj.correction_result))
                    }
                </div>
            </div>
            {
                hasScore && <div className={styles.review_area}>
                    <div className={styles.score_title}>
                        Total score :{record.score}
                    </div>
                    <div className={styles.review_list}>
                        <ReviewList review={reviewObj}></ReviewList>
                    </div>
                </div>
            }
        </div>
    </div>
}

export default TaskReview;
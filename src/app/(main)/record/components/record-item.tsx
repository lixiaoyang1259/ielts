import {IeltsRecord} from "@/app/(main)/record/page";
import styles from "./record-item.module.scss"
import Link from "next/link";
import React from "react";
import formatDate from "@/utils/date-format";

export interface RecordItemProps {
    record: IeltsRecord
}

const RecordItem: React.FC<RecordItemProps> = (props) => {
    const reviewUrl = `/task-review?record_id=${props.record.id}`
    const title = props.record.task.title?? (`IELTS Writing ${props.record.task.type} ${props.record.task.part || ""}`)
    const date = formatDate(props.record.date)
    const score = props.record.score === -1 ? "/" : props.record.score
    // if(!imageUrl){
    //     imageUrl = "/github.svg"
    // }
    const imageUrl = props.record.task.type === "general" ? "/general.png" : "/academic.png"
    return <Link className={styles.task_container} href={reviewUrl} target="_blank" prefetch={false}>
        <img src={imageUrl} width={100} height={100} alt={"image"} className={styles.task_image}
             style={{backgroundColor: props.record.task.type === "general" ?"#F1F1FA":"#EFF4ED"}}></img>
        <div className={styles.text_area}>
            <div className={styles.title_line}>
                <div className={styles.task_title}>{title}</div>
                <div className={styles.task_type}>{props.record.task.type}</div>
            </div>
            <div className={styles.task_content}>{props.record.task.question} </div>
            <div className={styles.space}></div>
            <div className={styles.task_part}>{props.record.task.part}</div>
        </div>
        <div className={styles.info_line}>
        <div className={styles.task_date}>{date}</div>
            <div className={styles.task_score}>{score}</div>
        </div>
    </Link>
}

export default RecordItem
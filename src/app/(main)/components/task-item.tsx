import React from "react";
import styles from "./task-item.module.scss";
import Link from "next/link";

export interface DisplayTask {
    image?: string; //TODO: task interface definition
    title?: string;
    detail?: string;
    type?: string;
    date?: string;
    score?: string;
    id: string;
    part?: string
}

export interface TaskDetailProps {
    displayTask: DisplayTask
    displayType: "recent" | "task"
}

const TaskItem: React.FC<TaskDetailProps> = (props) => {
    let taskUrl;
    switch (props.displayType) {
        case "recent":
            taskUrl = `/task-review?task_id=${props.displayTask.id}`
            break;
        case "task":
            taskUrl = `/task-detail?task_id=${props.displayTask.id}`
            break;
    }

    const isTask = props.displayType === "task"

    return <Link className={styles.task_container} href={taskUrl} prefetch={false} target="_blank">
        <img src={props.displayTask.type === "general" ? "/general.png" : "/academic.png"} width={100} height={100}
             alt={"image"} className={styles.task_image} style={{backgroundColor: props.displayTask.type === "general" ?"#F1F1FA":"#EFF4ED"}}></img>

        <div className={styles.text_area}>
            <div className={styles.task_title_line}>
                <div className={styles.task_title}>{props.displayTask.title}</div>
                {props.displayTask.type === "general" ?
                    <div className={styles.task_type_general}>General</div>
                    : <div className={styles.task_type_academic}>Academic</div>
                }

            </div>
            <div className={styles.task_content}>{props.displayTask.detail} </div>
            <div className={styles.task_part}>{props.displayTask.part}</div>
        </div>
        {!isTask && <div className={styles.task_score}>{props.displayTask.score}</div>}
        {!isTask && <div className={styles.task_date}>{props.displayTask.date}</div>}
    </Link>
}

export default TaskItem
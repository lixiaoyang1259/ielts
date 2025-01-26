import styles from "./page.module.scss"
import React, {useMemo} from "react";
import Link from "next/link"
import {getTask} from "@/app/server-actions/task-actions";
import {$Enums, Part, Type} from "@prisma/client";
import NewQuestionArea from "@/app/(detail)/components/new-question-area";
import NewAnswerArea from "@/app/(detail)/components/new-answer-area";
import {getPoint} from "@/app/server-actions/userinfo-actions";
import LoginNotifyPage from "@/app/componments/login-notify-page";

export interface Task {
    id: string
    title: string | null
    type: $Enums.Type
    part: $Enums.Part
    time: number
    words: number
    question: string
    image: string | null
    image_backup: string | null
    model_answer: string
}

const Page: React.FC = async ({searchParams}: { searchParams?: { [key: string]: string | undefined }; }) => {
    const failPage = useMemo(() => {
        return <Link href={"./ielts"} prefetch={false}>"Can't find this task"</Link>
    }, [])


    const task_id = searchParams?.task_id
    if (!task_id) {
        return failPage;
    }

    const taskResponse = await getTask(task_id)
    if(taskResponse.code === -3){
        return <LoginNotifyPage></LoginNotifyPage>
    }
    if (taskResponse.code !== 0 || !taskResponse.data) {
        return failPage;
    }

    const task = taskResponse.data.task
    const pointsRes = await getPoint()
    let points = 0
    if (pointsRes.code === 0 && pointsRes.data) {
        points = (pointsRes.data as { point: number }).point
    }

    return <div className={styles.main_container}>
        <div className={styles.question_area}>
            <NewQuestionArea content={task.question} images={task.image?.split(';')}></NewQuestionArea>
        </div>
        <div className={styles.answer_container}>
            {/*<AnswerArea task={task} className={styles.answer_area} time={task.time} words={task.words} disabled={false}></AnswerArea>*/}
            <NewAnswerArea points={points} task={task}></NewAnswerArea>
        </div>
    </div>
}

export default Page
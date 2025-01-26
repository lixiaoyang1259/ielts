'use server'

import {Task} from "@/app/(detail)/task-detail/page";
import {
    ActionSuccess,
    AIModelError,
    AuthFail, CannotFindRecord,
    DBFail, NoEnoughPoint,
    TooLong,
    TooShort
} from "./response";
import {getSession} from "@/libs/auth/session-actions";
import {commitToOpenAI} from "@/libs/ai/ai";
import {loadPoint, deductPoint} from "@/libs/db/points";
import {loadFullRecord, saveRecord, updateRecord} from "@/libs/db/record";

export default async function commitAndAssess(task: Task, answer: string) {
    if (answer.length < 100) {
        return TooShort
    } else if (answer.length > 10000) {
        return TooLong
    }

    const session = await getSession()
    const user_id = session?.user?.id
    if (!user_id) {
        return AuthFail
    }

    const dbResult = await saveAnswerToDB(task.id, answer)
    if (dbResult.code != 0) {
        return dbResult
    }

    const data = await loadPoint(user_id)
    if(!data || data.point< 0){
       return NoEnoughPoint
    }

    const aiResponse = await commitToOpenAI(task.question, answer, task.image, task.part, task.type)
    if (!aiResponse) {
        return AIModelError
    }

    try {
        const resObject = JSON.parse(aiResponse)
        const reviewResult = await updateRecord(dbResult.data as string, aiResponse, resObject['score'])
        if (reviewResult) {
            const result = await deductPoint(user_id, 1)
            if(!result){
                return NoEnoughPoint
            }
            return ActionSuccess<typeof reviewResult>(reviewResult)
        } else {
            return DBFail
        }

    } catch (e) {
        return DBFail
    }
}

export async function saveAnswerToDB(task_id: string, answer: string, aiResult?: string, score?: number) {
    const session = await getSession()
    const user_id = session?.user?.id
    if (!user_id) {
        return AuthFail
    }

    if (answer.length < 100) {
        return TooShort
    } else if (answer.length > 10000) {
        return TooLong
    }

    const result = await saveRecord(task_id, answer, user_id, aiResult, score)

    if (result) {
        return ActionSuccess(result)
    } else {
        return DBFail
    }
}

export async function updateRecordCommit(recordId: string) {
    const session = await getSession()
    const user_id = session?.user?.id
    if (!user_id) {
        return AuthFail
    }

    let record = null;
    try {
        record = await loadFullRecord(recordId, user_id)
    } catch (e) {
        return DBFail
    }
    if(!record){
        return DBFail
    }

    const data = await loadPoint(user_id)
    if(!data || data.point< 0){
        return NoEnoughPoint
    }


    const aiResponse = await commitToOpenAI(record.task.question, record.answer, record.task.image, record.task.part, record.task.type || "")
    if (!aiResponse) {
        return AIModelError
    }

    try {
        const resObject = JSON.parse(aiResponse)
        const reviewResult = await updateRecord(recordId, aiResponse, resObject['score'])
        if (reviewResult) {
            const result = await deductPoint(user_id, 1)
            if(!result){
                return NoEnoughPoint
            }
            return ActionSuccess(reviewResult)
        } else {
            return DBFail
        }

    } catch (e) {
        return DBFail
    }



}


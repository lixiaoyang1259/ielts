'use server'

import {getSession} from "@/libs/auth/session-actions";
import {ActionSuccess, AIModelError, AuthFail, DBFail, NoEnoughPoint} from "@/app/server-actions/response";
import {
    CUSTOM_PAGE_SIZE,
    loadCustomRecord,
    loadCustomRecordCount,
    loadCustomRecords,
    saveCustomRecord,
    updateCustomRecord
} from "@/libs/db/custom";
import {loadPoint, deductPoint} from "@/libs/db/points";
import {commitCustomToOpenAI} from "@/libs/ai/ai";

const getCustomRecords = async (page: number) => {
    const session = await getSession()
    if (!session.user || !session.user.id) {
        return AuthFail
    }
    const records = await loadCustomRecords(session.user.id, page)
    const count = await loadCustomRecordCount(session.user.id)
    const pageCount = Math.ceil(count / CUSTOM_PAGE_SIZE)

    return ActionSuccess<{
        records: typeof records,
        count: number
        pageCount: number
    }>({records, count, pageCount});
}

export {getCustomRecords}

export const submitCustomRecordAction = async (level: [string, string | null], question: string, answer: string) => {
    const saveResult = await saveCustomRecordAction(level, question, answer)
    if(saveResult.code !== 0){
        return saveResult
    }
    return await updateCustomRecordAction(saveResult.data)
}

const saveCustomRecordAction = async (level: [string, string | null], question: string, answer: string) => {
    const session = await getSession()
    if (!session.user || !session.user.id) {
        return AuthFail
    }
    const record = await saveCustomRecord(session.user.id, level.join("/"), question, answer)
    if (!record) {
        return DBFail
    }
    return ActionSuccess(record.id)
}

export {saveCustomRecordAction}

const updateCustomRecordAction = async (recordId: string) => {
    const session = await getSession()
    if (!session.user || !session.user.id) {
        return AuthFail
    }

    const data = await loadPoint(session.user.id)
    if (!data || data.point < 0) {
        return NoEnoughPoint
    }

    const result = await deductPoint(session.user.id, 1)
    if (!result) {
        return NoEnoughPoint
    }

    const record = await loadCustomRecord(session.user.id, recordId)
    if(!record){
        return DBFail
    }
    const levels = record.level.split('/')
    const aiResponse = await commitCustomToOpenAI(record.question, record.answer, null, levels[0], levels[1] ?? undefined)

    if (!aiResponse) {
        return AIModelError
    }

    try {
        const resObject = JSON.parse(aiResponse)
        const aiResult = await updateCustomRecord(record.id, resObject['score'], aiResponse)
        if (aiResult) {
            return ActionSuccess(aiResult.id)
        } else {
            return DBFail
        }

    } catch (e) {
        return DBFail
    }
}
export {updateCustomRecordAction}

const getCustomRecord = async (recordId: string) => {
    const session = await getSession()
    if (!session.user || !session.user.id) {
        return AuthFail
    }

    const record = await loadCustomRecord(session.user.id, recordId)
    if (!record) {
        return DBFail
    }

    return ActionSuccess<typeof record>(record)
}

export {getCustomRecord}


import {ActionResponse, ActionSuccess, AuthFail, DBFail} from "@/app/server-actions/action-response";
import {getSession} from "@/libs/auth/session-actions";
import {parseFilterToType} from "@/utils/filter-utils";
import {RECORD_PAGE_SIZE} from "@/utils/common-utils";
import {loadRecord, loadRecordCount, loadRecords} from "@/libs/db/record";
import prisma from "@/libs/db/prisma";

type ActionDataType<T extends (...args: any[]) => any> = ReturnType<T> extends Promise<infer K> ? K : never

type ServerAction<T = any> = (...args: any[]) => Promise<ActionResponse<T>>


export async function getRecords(page: number, sort ?: string, filter?: string) {
    const session = await getSession()
    const userId = session?.user?.id
    if (!userId) {
        return AuthFail
    }

    // let sortParams = undefined
    // if (sort) {
    //     const temp.jsx = sort.split("_")
    //     if (temp.jsx.length == 2 && (temp.jsx[0] === "id" || temp.jsx[0] === "type") && (temp.jsx[1] === "desc" || temp.jsx[1] === "asc")) {
    //         sortParams = {
    //             name: temp.jsx[0] as "id" | "type",
    //             sort: temp.jsx[1] as "desc" | "asc"
    //         }
    //     }
    // }
    let filterParams = parseFilterToType(filter)

    const records = await loadRecords(userId, page, RECORD_PAGE_SIZE, undefined, undefined)
    const count = await loadRecordCount(userId);
    const scores = await loadRecordScore(userId)
    const score  =  scores.length > 0 ?  scores.reduce((res, current) => res + current.score, 0) / scores.length : 0


    if (!records) {
        return DBFail
    }

    type k = typeof records

    return ActionSuccess<{ records: k, score: number, count: number }>({records: records, score: score, count: count})
}

export async function loadRecordScore(userId:string, filter?: string) {

    return prisma.ielts_record.findMany({
        where: {
            score: {
                gt: -1
            },
            user_id:userId
        },
        select:{
            score:true
        }
    });
}

export async function getRecord(recordId: string) {
    const session = await getSession()
    const userId = session?.user?.id
    if (!userId) {
        return AuthFail
    }

    const record = await loadRecord(recordId, userId)

    if (!record) {
        return DBFail
    }

    return ActionSuccess<{ record: typeof record }>({record: record})
}
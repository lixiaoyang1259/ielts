import prisma from "@/libs/db/prisma";
import "server-only"
import {toNumberId, toUniqueId} from "@/utils/id-hash";
import {record} from "zod";

export const CUSTOM_PAGE_SIZE = 5;

export async function loadCustomRecords(userId: string, page: number) {
    const result = await prisma.custom_question.findMany({
        where: {
            user_id: userId
        },
        orderBy: {
            date: "desc"
        },
        take: CUSTOM_PAGE_SIZE,
        skip: page * CUSTOM_PAGE_SIZE
    });

    return result.map((record) => {
        return {
            ...record,
            id: toUniqueId(record.id)
        }
    })
}

export async function loadCustomRecord(userId: string, recordId: string) {
    const numberId = toNumberId(recordId)
    const result = await prisma.custom_question.findFirst({
        where: {
            id: numberId,
            user_id: userId
        },
    });

    return result ? {
        ...result,
        id: toUniqueId(result.id)
    } : result
}

export async function loadCustomRecordCount(userId: string) {
    return prisma.custom_question.count({
        where: {
            user_id: userId
        }
    })
}

export async function updateCustomRecord(recordId: string, score: number, comments: string) {
    const recordNumberId = toNumberId(recordId)
    const result = await prisma.custom_question.update({
        where: {
            id: recordNumberId
        },
        data: {
            score: score,
            comments: comments,
            reviewDate: new Date(),
            version: 2
        }
    })
    return {
        ...result,
        id: toUniqueId(result.id)
    }
}

export async function saveCustomRecord(userId: string, level: string, question: string, answer: string) {
    const record = await prisma.custom_question.create({
        data: {
            user_id: userId,
            question: question,
            answer: answer,
            level: level
        }
    })
    return record ? {
        ...record,
        id: toUniqueId(record.id)
    } : record
}

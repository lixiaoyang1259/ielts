import prisma from "@/libs/db/prisma";
import ielts_taskWhereInput = Prisma.ielts_taskWhereInput;
import {toNumberId, toUniqueId} from "@/utils/id-hash";
import {TaskFilterSegmentsTypes} from "@/utils/filter-utils";
import ielts_recordWhereInput = Prisma.ielts_recordWhereInput;
import {Prisma} from "@prisma/client";
import "server-only"

export async function loadFullRecord(recordId: string, userId: string) {
    const numberId = toNumberId(recordId)
    try {
        const record = await prisma.ielts_record.findFirst({
            where: {
                id: numberId,
                user_id: userId
            },
            select: {
                id: true,
                review: true,
                score: true,
                task: true,
                date: true,
                answer: true
            },
        })
        if (record) {
            return {
                ...record,
                id: toUniqueId(record.id)
            }
        }

    } catch (e) {
    }
    return null;
}

export async function loadRecord(recordId: string, userId: string) {
    const numberId = toNumberId(recordId)
    try {
        const record = await prisma.ielts_record.findFirst({
            where: {
                id: numberId,
                user_id: userId
            },
            select: {
                id: true,
                review: true,
                score: true,
                version: true,
                task: {
                    select: {
                        question: true,
                        type: true,
                        part: true,
                        image: true,
                        model_answer: true,
                        title: true
                    }
                },
                date: true,
                answer: true
            },
        })
        if (record) {
            return {
                ...record,
                id: toUniqueId(record.id)
            }
        }

    } catch (e) {
    }
    return null;
}

export async function loadRecordCount(userId: string, filter ?: TaskFilterSegmentsTypes) {
    let whereFilter: {} & ielts_recordWhereInput = {}

    if (filter) {
        // if (filter.part.length > 0) {
        //     whereFilter.part = {
        //         in: filter.part
        //     }
        // }
        // if (filter.type.length > 0) {
        //     whereFilter.type = {
        //         in: filter.type
        //     }
        // }
    }


    return prisma.ielts_record.count({
        where: {
            user_id: userId
        }
    });
}

export async function loadRecords(userId: string, page: number, size: number, sort ?: string, filter?: string) {
    let whereFilter: {} & ielts_taskWhereInput = {}

    // if (filter) {
    //     if (filter.part.length > 0) {
    //         whereFilter.part = {
    //             in: filter.part
    //         }
    //     }
    //     if (filter.type.length > 0) {
    //         whereFilter.type = {
    //             in: filter.type
    //         }
    //     }
    // }
    try {
        const records = await prisma.ielts_record.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                review: true,
                score: true,
                task: {
                    select: {
                        question: true,
                        part: true,
                        type: true,
                        image: true,
                        model_answer: true,
                        title: true
                    }
                },
                date: true,
                answer: true
            },
            orderBy: {
                date: 'desc'
            },
            take: size,
            skip: page * size
        })

        return records.map((record) => {
            return {
                ...record,
                id: toUniqueId(record.id),
            }
        })
    } catch (e) {

    }
    return null;
}

export async function updateRecord(recordId: string, aiReview: string, score: number) {
    try {
        const numberId = toNumberId(recordId)
        const output = await prisma.ielts_record.update({
            data: {
                review: aiReview,
                score: score
            },
            where: {
                id: numberId
            }
        })
        return toUniqueId(output.id)

    } catch (e) {
        return null
    }
}

export async function saveRecord(task_id: string, answer: string, user_id: string, aiReview ?: string, score ?: number) {
    const numberId = toNumberId(task_id)
    let recordId: string | null = null

    try {
        const output = await prisma.ielts_record.create({
            data: {
                answer: answer,
                date: new Date(),
                score: score || -1,
                review: aiReview || '',
                task_id: numberId,
                user_id: user_id,
                version: 2,
            },
        })
        if (output) {
            recordId = toUniqueId(output.id)
        }
    } catch (e) {
    }
    return recordId
}
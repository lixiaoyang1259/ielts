import prisma from "@/libs/db/prisma";
import ielts_taskWhereInput = Prisma.ielts_taskWhereInput;
import {toNumberId, toUniqueId} from "@/utils/id-hash";
import {$Enums, Prisma} from "@prisma/client";
import {TaskFilterSegmentsTypes} from "@/utils/filter-utils";
import "server-only"

export async function loadTask(taskId: string) {
    const numberId = toNumberId(taskId)
    const task = await prisma?.ielts_task.findFirst(
        {
            where: {
                id: numberId
            },
        }
    )
    if (task != null) {
        return {
            ...task,
            id: toUniqueId(task.id)
        }
    }
    return task;
}

export async function clearTasks() {
    await prisma.ielts_task.deleteMany()
}

export async function createTask(title: string | null, part: $Enums.Part, type: $Enums.Type, time: number
    , words: number, image: string | null, question: string
    , model_answer: string, version: number) {
    const task = await prisma.ielts_task.create({
        data: {
            title: title,
            part: part,
            type: type,
            time: time,
            words: words,
            image: image,
            question: question,
            model_answer: model_answer,
            version: version
        }
    })

    return task
}

export async function loadTasks(page: number, size: number, sort ?: string, part ?: ("part1" | "part2")[], type?: ("general" | "academic")[]) {
    let whereFilter: {} & ielts_taskWhereInput = {}
    whereFilter.part = {
        in: part ?? []
    }
    whereFilter.type = {
        in: type ?? []
    }

    const [task, count] = await prisma.$transaction([
        prisma.ielts_task.findMany({
            where: whereFilter,
            // orderBy: sort ? {[sort.name]: sort.sort} : {},
            take: size,
            skip: page * size
        }),
        prisma.ielts_task.count({
            where: whereFilter
        })
    ])

    return {
        totalCount: count,
        tasks: task.map((item) => {
            const numberId = item.id
            return {
                ...item,
                id: toUniqueId(numberId)
            }
        })
    }
}
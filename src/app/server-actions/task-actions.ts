'use server'
import {ActionSuccess, AuthFail, DBFail} from "@/app/server-actions/response";
import {TASK_PAGE_SIZE} from "@/utils/common-utils";
import {getSession} from "@/libs/auth/session-actions";
import {compact} from "lodash";
import {loadTask, loadTasks} from "@/libs/db/task";


//查询单个task，用于task-detail
export async function getTask(taskId: string) {
    const session = await getSession()
    const user_id = session?.user?.id
    if (!user_id) {
        return AuthFail
    }
    const result = await loadTask(taskId);
    if (result) {
        return ActionSuccess({task: result})
    } else {
        return DBFail
    }
}

export async function getTasks(page: number, sort ?: string, filter?: string[]) {
    console.log("get task called")
    const part = compact([
        filter?.includes("part1") ? "part1" : null,
        filter?.includes("part2") ? "part2" : null
    ])
    const type = compact([
        filter?.includes("academic") ? "academic" : null,
        filter?.includes("general") ? "general" : null,
    ])
    //TODO: sort  will be accomplished later
    const sortParams = undefined
    const {totalCount, tasks} = await loadTasks(page, TASK_PAGE_SIZE, sortParams, part, type)
    return ActionSuccess({tasks: tasks, total: totalCount, pageCount: Math.ceil(totalCount / TASK_PAGE_SIZE)})
}
'use server'
import {AuthFail, ActionResponse, ActionSuccess, DBFail} from "@/app/server-actions/action-response";
import {loadUserinfo} from "@/libs/db/user";
import {getSession} from "@/libs/auth/session-actions";
import {loadPoint} from "@/libs/db/points";

type IgnoreUserId<T extends any[]> = T extends [ignore: infer _, ...others: infer P] ? P : never

function withAuthCheck<ThisType,  D extends (userId: string, ...args: any) => Promise<any>>(this: ThisType, func: D) {
    return async function (this: ThisType, ...args: IgnoreUserId<Parameters<D>>) {
        const session = await getSession()
        const user_id = session?.user?.id
        if (!user_id) {
            return AuthFail
        }
        return func.call<ThisType, [string, IgnoreUserId<Parameters<D>>], Promise<ActionResponse>>(this, user_id, args);
    }
}

export interface UserInfoData {
    username: string,
    email: string,
    image: string,
    point: number
}

export const getPersonalInfo = withAuthCheck(async (userId) => {
    const result = await loadUserinfo(userId)
    if (result) {
        return ActionSuccess(result)
    } else {
        return DBFail
    }
})

export interface PointData {
    point: number
}

export const getPoint =  withAuthCheck(async (userId) => {
    const result = await loadPoint(userId)
    if (result) {
        return ActionSuccess<typeof result>(result)
    } else {
        return DBFail
    }
})

import {AuthFail, DBFail} from "@/app/server-actions/action-response";
import {getSession} from "@/libs/auth/session-actions";

type IgnoreUserId<T extends any[]> = T extends [ignore: infer _, ...others : infer P] ? P : never

async function withAuthCheck<ThisType, D extends (userId: string, ...args: any) => Promise<any>>(this: ThisType, func: D) {

     return  async function (this: ThisType, ...args: IgnoreUserId<Parameters<D>>) {
        const session = await getSession()
        const user_id = session?.user?.id
        if (!user_id) {
            return AuthFail
        }
        return await func.call(this, user_id, args)
    }
}
'use server'
import {ActionSuccess, AuthFail, DBFail, TooShort} from "@/app/server-actions/action-response";
import {getSession} from "@/libs/auth/session-actions";
import {saveSuggestion} from "@/libs/db/suggestion";

export async function commitSuggestion(suggestion :string){
    const session = await getSession()
    const user_id = session?.user?.id
    if (!user_id) {
        return AuthFail
    }

    const result = await saveSuggestion(user_id, suggestion)
    if(result){
        return ActionSuccess("ok")
    } else {
        return DBFail
    }
}
export interface ActionResponse<T = undefined> extends Error {
    data?: T
    message: string
    name: string
    readonly code: | 0
        | -1
        | -2
        | -3
        | -4
        | -5
        | -6
        | -7
        | -8
        | -9
        | -10
}

export const TooShort: ActionResponse = {
    message: "",
    name: "TooShort",
    code: -1
}
export const TooLong: ActionResponse = {
    message: "",
    name: "TooShort",
    code: -2
}

export const AuthFail: ActionResponse = {
    message: "",
    name: "TooShort",
    code: -3
}

export const DBFail: ActionResponse = {
    message: "",
    name: "DB_FAIL",
    code: -4
}

export const AIModelError: ActionResponse = {
    message: "",
    name: "AIModelError",
    code: -5
}
export const AIModelTimeout: ActionResponse = {
    message: "",
    name: "AIModelTimeout",
    code: -6
}

export const CannotFindRecord: ActionResponse = {
    message: "",
    name: "CannotFindRecord",
    code: -7
}

export const NoEnoughPoint: ActionResponse = {
    message: "",
    name: "NoEnoughPoint",
    code: -8
}

export function ActionSuccess<T>(data: T): ActionResponse<T> {
    return {
        data: data,
        message: "Success",
        name: "ActionSuccess",
        code: 0
    }
}

export const IllegalLevel: ActionResponse = {
    message: "",
    name: "level",
    code: -9
}

export const IllegalQuestion: ActionResponse = {
    message: "",
    name: "IllegalQuestion",
    code: -10
}
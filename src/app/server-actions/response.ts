import {getTranslations} from "next-intl/server";

interface SuccessResponse<T> {
    data: T
    message: string
    extendsInfo: string
    readonly code: 0
}

interface FailureResponse {
    message: string
    extendsInfo: string
    readonly code: | -1
        | -2
        | -3
        | -4
        | -5
        | -6
        | -7
        | -8
        | -9
        | -10
        | -11
        | -12
        | -13
}

export type NewActionResponse<T> = SuccessResponse<T> | FailureResponse

export function codeToMessage(t:(name:string)=>string, code:number){
    // const t = await getTranslations("SubmitOptions")
    console.log("code=", code)
    let notice = t("common")
    switch (code){
        case -1:
            return t("too_short");
        case -2:
            return t("too_long")
        case -3:
            return t("auth_fail")
        case -4:
        case -7:
            return t("db_fail")
        case -5:
        case -6:
            return t("ai_fail")
        case -8:
            return t("no_enough_points")
        case -9:
            return t("no_level_selected")
        case -10:
            return t("custom_question_error")
        case -11:
            return t("no_image_selected")
        case -12:
            return t("too_big_image")
        case -13:
            return t("upload_image_fail")
    }

    return notice
}
export const TooShort: FailureResponse = {
    message: "",
    extendsInfo: "TooShort",
    code: -1
}
export const TooLong: FailureResponse = {
    message: "",
    extendsInfo: "TooShort",
    code: -2
}

export const AuthFail: FailureResponse = {
    message: "",
    extendsInfo: "TooShort",
    code: -3
}

export const DBFail: FailureResponse = {
    message: "",
    extendsInfo: "DB_FAIL",
    code: -4
}

export const AIModelError: FailureResponse = {
    message: "",
    extendsInfo: "AIModelError",
    code: -5
}
export const AIModelTimeout: FailureResponse = {
    message: "",
    extendsInfo: "AIModelTimeout",
    code: -6
}

export const CannotFindRecord: FailureResponse = {
    message: "",
    extendsInfo: "CannotFindRecord",
    code: -7
}

export const NoEnoughPoint: FailureResponse = {
    message: "",
    extendsInfo: "NoEnoughPoint",
    code: -8
}

export function ActionSuccess<T>(data: T): SuccessResponse<T> {
    return {
        data: data,
        message: "Success",
        extendsInfo: "ActionSuccess",
        code: 0
    }
}

export const IllegalLevel: FailureResponse = {
    message: "",
    extendsInfo: "level",
    code: -9
}

export const IllegalQuestion: FailureResponse = {
    message: "",
    extendsInfo: "IllegalQuestion",
    code: -10
}
export const ImageDataError: FailureResponse = {
    message: "no selected file",
    extendsInfo: "NoSelectFile",
    code: -11
}
export const TooLargeImage: FailureResponse = {
    message: "too large image",
    extendsInfo: "TooLargeImage",
    code: -12
}
export const UploadImageError: FailureResponse = {
    message: "upload image failed",
    extendsInfo: "",
    code: -13
}
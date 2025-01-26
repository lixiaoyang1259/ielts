'use server'
import "server-only"
import {getSession} from "@/libs/auth/session-actions";
import {
    ActionSuccess,
    AIModelError,
    AuthFail,
    DBFail,
    ImageDataError,
    NoEnoughPoint, TooLargeImage, UploadImageError
} from "@/app/server-actions/response";
import {loadPoint, deductPoint} from "@/libs/db/points";
import {ocr} from "@/libs/ai/ai";
import {formFileMD5} from "@/utils/md5";
import loadOCRRecord, {saveImageUrl} from "@/libs/db/image-md5";

export const submitOCR = async (formData: FormData) => {
    const session = await getSession()
    if (!session.user) {
        return AuthFail
    }

    const data = await loadPoint(session.user.id)
    if (!data || data.point < 0) {
        return NoEnoughPoint
    }

    const result = await deductPoint(session.user.id, 1)
    if (!result) {
        return NoEnoughPoint
    }

    const file = formData.get("source") as File
    if(!file){
        return ImageDataError
    }
    if(file.size / 1024 / 1024  > 2){
        return TooLargeImage
    }
    const md5 = await formFileMD5(file)

    const existedUrl = await loadOCRRecord(md5)
    let imageUrl = ""
    if(existedUrl){
       imageUrl = existedUrl.url
    }else{
        const uploadResponse = await fetch("https://www.picgo.net/api/1/upload", {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                "X-API-Key": ""
            },
            body: formData
        })

        if (uploadResponse.status !== 200) {
            return UploadImageError
        }

        imageUrl = (await uploadResponse.json()).image.image.url
        await saveImageUrl(md5, imageUrl)
    }

    // const imageUrl = " https://img.picgo.net/2024/11/05/20200328021206138804142513a6dda89.png"

    try {
        const ocrResult = await ocr(imageUrl)
        if (ocrResult) {
            return ActionSuccess(ocrResult)
        }else {
            return AIModelError
        }

    } catch (e) {
        return DBFail
    }
}
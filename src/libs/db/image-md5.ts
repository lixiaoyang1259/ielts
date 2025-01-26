import prisma from "@/libs/db/prisma";
import "server-only"

const loadOCRRecord = async (md5: string) => {
    const result = await prisma.ocr_record.findFirst({
        where: {
            md5: md5
        }
    })

    return result
}

export default loadOCRRecord

export const saveImageUrl = async (md5: string, url: string) => {
    const result = await prisma.ocr_record.create({
        data: {
            md5: md5,
            url: url
        }
    })

    return result
}

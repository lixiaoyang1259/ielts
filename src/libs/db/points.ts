import prisma from "@/libs/db/prisma";
import "server-only"

export async function loadPoint(userId: string) {
    const record = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            point: true,
        }
    })
    if (record) {
        return record
    } else {
        return null
    }
}

export async function deductPoint(userId: string, point: number) {
    const currentPoint = await loadPoint(userId)
    if (!currentPoint || currentPoint.point < 0 || currentPoint.point < point) {
        return null
    }
    const doSubtract = await prisma.user.update({
        data: {
            point: currentPoint.point - point
        },
        where: {
            id: userId
        }
    })

    const record = await prisma.payment.create({
        data: {
            point: point,
            user_id: userId,
            source: "",
            order_id: ""
        }
    })

    return record
}


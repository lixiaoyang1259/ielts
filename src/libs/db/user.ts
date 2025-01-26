import prisma from "@/libs/db/prisma";
import "server-only"
export async function loadUserinfo(userId: string) {
    const record = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            username: true,
            email: true,
            image: true,
            point: true,
        }
    })
    if (record) {
        return record
    } else {
        return null
    }
}

import {AuthProfile} from "@/libs/oauth/create-session";
import prisma from "@/libs/db/prisma";
import "server-only"

export async function loadUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
        include: {
            Account: {
                select: {
                    provider: true
                }
            }
        }
    })

    return user
}

export namespace db {
    export async function updateAccountProviderId(email: string, id: string) {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (user) {
            const account = await prisma.account.update({
                where: {
                    userId: user.id
                },
                data: {
                    providerAccountId: id
                }
            })
            return account
        } else {
            return null
        }
    }

    export async function loadAppleUserByAccountId(providerAccountId: string) {
        const userId = await prisma.account.findFirst({
            where: {
                providerAccountId: providerAccountId
            },
            select: {
                userId: true
            }
        })

        if (userId) {
            const user = await prisma.user.findFirst({
                where: {
                    id: userId.userId
                }
            })
            return user
        } else {
            return null
        }
    }
}

export async function createUser(profile: AuthProfile) {
    const user = await prisma.$transaction(async (prisma) => {

        const user = await prisma.user.create({
            data: {
                username: profile.username ?? "",
                email: profile.email,
                image: profile.image,
                password: profile.password ?? null
            }
        })
        const account = await prisma.account.create({
            data: {
                provider: profile.provider,
                providerAccountId: profile.providerId ?? "",
                userId: user.id,
                type: profile.type,
                refresh_token: profile.refreshToken,
            }
        })
        return user
    })
    return user
}

export async function updatePassword(userId: string, password: string) {
    const user = await prisma.user.update({
        data: {
            password: password
        },
        where: {
            id: userId
        }
    })
    return user
}

export async function createVerifyCode(email: string, code: string) {
    const existingCode = await prisma.verification_code.findFirst({
        where: {
            email: email
        }
    })
    if (existingCode) {
        return prisma.verification_code.update({
            data: {
                code: code,
                createDate: new Date()
            }, where: {
                id: existingCode.id
            }
        });
    } else {
        return prisma.verification_code.create({
            data: {
                email: email,
                code: code
            }
        });
    }
}

export async function loadCodeRecord(code: string) {
    const record = await prisma.verification_code.findFirst({
        where: {
            code: code
        }
    })

    return record
}



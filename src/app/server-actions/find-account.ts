'use server'

import {PrismaClient} from "@prisma/client";

export interface QueryUser{
    email : string | null | undefined,
    provider : string | null | undefined
}

export default async function findAccount(email : string) {
    const prisma = new PrismaClient();

    const data = await prisma.user.findFirst({
        where :{
            email : email
        },
        select:{
          email :true,
            Account :{
               select : {
                   provider :true
               }
            }
        },
    })

    return {
        email : data?.email,
        provider : data?.Account?.provider
    }
}
import {Lucia} from "lucia";
import {PrismaAdapter} from "@lucia-auth/adapter-prisma";
import prisma from "@/libs/db/prisma";
import "server-only"

const prismaAdapter = new PrismaAdapter(prisma.session, prisma.user);

export const lucia = new Lucia(prismaAdapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure:  process.env.USE_HTTP === "1",//process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            username: attributes.username,
            email: attributes.email,
        };
    },
    getSessionAttributes: (attributes) => {
        return {
            userId: attributes.userId
        }
    }
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
        DatabaseSessionAttributes: DatabaseSessionAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string,
    email: string
}

interface DatabaseSessionAttributes {
    userId: string
}


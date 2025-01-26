import prisma from "@/libs/db/prisma";
import "server-only"
export async function saveSuggestion(userId: string, suggestion: string) {
    const record = await prisma.suggestion.create({
        data: {
            message: suggestion,
        }
    })
    return record
}
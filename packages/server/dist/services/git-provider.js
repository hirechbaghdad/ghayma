import { db } from "../db/index.js";
import { gitProvider } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
export const removeGitProvider = async (gitProviderId) => {
    const result = await db
        .delete(gitProvider)
        .where(eq(gitProvider.gitProviderId, gitProviderId))
        .returning();
    return result[0];
};
export const findGitProviderById = async (gitProviderId) => {
    const result = await db.query.gitProvider.findFirst({
        where: eq(gitProvider.gitProviderId, gitProviderId),
    });
    if (!result) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Git Provider not found",
        });
    }
    return result;
};
export const updateGitProvider = async (gitProviderId, input) => {
    return await db
        .update(gitProvider)
        .set({
        ...input,
    })
        .where(eq(gitProvider.gitProviderId, gitProviderId))
        .returning()
        .then((response) => response[0]);
};

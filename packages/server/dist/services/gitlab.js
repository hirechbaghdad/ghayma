import { db } from "../db/index.js";
import { gitlab, gitProvider, } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
export const createGitlab = async (input, organizationId, userId) => {
    return await db.transaction(async (tx) => {
        const newGitProvider = await tx
            .insert(gitProvider)
            .values({
            providerType: "gitlab",
            organizationId: organizationId,
            name: input.name,
            userId: userId,
        })
            .returning()
            .then((response) => response[0]);
        if (!newGitProvider) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the Git provider",
            });
        }
        await tx
            .insert(gitlab)
            .values({
            ...input,
            gitProviderId: newGitProvider?.gitProviderId,
        })
            .returning()
            .then((response) => response[0]);
    });
};
export const findGitlabById = async (gitlabId) => {
    const gitlabProviderResult = await db.query.gitlab.findFirst({
        where: eq(gitlab.gitlabId, gitlabId),
        with: {
            gitProvider: true,
        },
    });
    if (!gitlabProviderResult) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Gitlab Provider not found",
        });
    }
    return gitlabProviderResult;
};
export const updateGitlab = async (gitlabId, input) => {
    return await db
        .update(gitlab)
        .set({
        ...input,
    })
        .where(eq(gitlab.gitlabId, gitlabId))
        .returning()
        .then((response) => response[0]);
};

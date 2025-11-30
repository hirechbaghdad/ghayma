import { db } from "../db/index.js";
import { gitea, gitProvider, } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
export const createGitea = async (input, organizationId, userId) => {
    return await db.transaction(async (tx) => {
        const newGitProvider = await tx
            .insert(gitProvider)
            .values({
            providerType: "gitea",
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
        const giteaProvider = await tx
            .insert(gitea)
            .values({
            ...input,
            gitProviderId: newGitProvider?.gitProviderId,
        })
            .returning()
            .then((response) => response[0]);
        if (!giteaProvider) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the Gitea provider",
            });
        }
        return {
            giteaId: giteaProvider.giteaId,
            clientId: giteaProvider.clientId,
            giteaUrl: giteaProvider.giteaUrl,
        };
    });
};
export const findGiteaById = async (giteaId) => {
    try {
        const giteaProviderResult = await db.query.gitea.findFirst({
            where: eq(gitea.giteaId, giteaId),
            with: {
                gitProvider: true,
            },
        });
        if (!giteaProviderResult) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Gitea Provider not found",
            });
        }
        return giteaProviderResult;
    }
    catch (error) {
        throw error;
    }
};
export const updateGitea = async (giteaId, input) => {
    try {
        const updateResult = await db
            .update(gitea)
            .set(input)
            .where(eq(gitea.giteaId, giteaId))
            .returning();
        const result = updateResult[0];
        if (!result) {
            throw new Error(`Failed to update Gitea provider with ID ${giteaId}`);
        }
        return result;
    }
    catch (error) {
        throw error;
    }
};

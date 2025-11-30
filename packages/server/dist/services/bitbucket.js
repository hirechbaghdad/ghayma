import { db } from "../db/index.js";
import { bitbucket, gitProvider, } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
export const createBitbucket = async (input, organizationId, userId) => {
    return await db.transaction(async (tx) => {
        const newGitProvider = await tx
            .insert(gitProvider)
            .values({
            providerType: "bitbucket",
            organizationId: organizationId,
            name: input.name,
            userId: userId,
        })
            .returning()
            .then((response) => response[0]);
        if (!newGitProvider) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the Bitbucket provider",
            });
        }
        await tx
            .insert(bitbucket)
            .values({
            ...input,
            gitProviderId: newGitProvider?.gitProviderId,
        })
            .returning()
            .then((response) => response[0]);
    });
};
export const findBitbucketById = async (bitbucketId) => {
    const bitbucketProviderResult = await db.query.bitbucket.findFirst({
        where: eq(bitbucket.bitbucketId, bitbucketId),
        with: {
            gitProvider: true,
        },
    });
    if (!bitbucketProviderResult) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Bitbucket Provider not found",
        });
    }
    return bitbucketProviderResult;
};
export const updateBitbucket = async (bitbucketId, input) => {
    return await db.transaction(async (tx) => {
        // First get the current bitbucket provider to get gitProviderId
        const currentProvider = await tx.query.bitbucket.findFirst({
            where: eq(bitbucket.bitbucketId, bitbucketId),
        });
        if (!currentProvider) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Bitbucket provider not found",
            });
        }
        const result = await tx
            .update(bitbucket)
            .set({
            bitbucketUsername: input.bitbucketUsername,
            bitbucketEmail: input.bitbucketEmail,
            appPassword: input.appPassword,
            apiToken: input.apiToken,
            bitbucketWorkspaceName: input.bitbucketWorkspaceName,
        })
            .where(eq(bitbucket.bitbucketId, bitbucketId))
            .returning();
        if (input.name || input.organizationId) {
            await tx
                .update(gitProvider)
                .set({
                name: input.name,
                organizationId: input.organizationId,
            })
                .where(eq(gitProvider.gitProviderId, currentProvider.gitProviderId))
                .returning();
        }
        return result[0];
    });
};

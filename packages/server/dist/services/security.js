import { db } from "../db/index.js";
import { security } from "../db/schema/index.js";
import { createSecurityMiddleware, removeSecurityMiddleware, } from "../utils/traefik/security.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { findApplicationById } from "./application.js";
export const findSecurityById = async (securityId) => {
    const application = await db.query.security.findFirst({
        where: eq(security.securityId, securityId),
    });
    if (!application) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Security not found",
        });
    }
    return application;
};
export const createSecurity = async (data) => {
    try {
        await db.transaction(async (tx) => {
            const application = await findApplicationById(data.applicationId);
            const securityResponse = await tx
                .insert(security)
                .values({
                ...data,
            })
                .returning()
                .then((res) => res[0]);
            if (!securityResponse) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Error creating the security",
                });
            }
            await createSecurityMiddleware(application, securityResponse);
            return true;
        });
    }
    catch (error) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating this security",
            cause: error,
        });
    }
};
export const deleteSecurityById = async (securityId) => {
    try {
        const result = await db
            .delete(security)
            .where(eq(security.securityId, securityId))
            .returning()
            .then((res) => res[0]);
        if (!result) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Security not found",
            });
        }
        const application = await findApplicationById(result.applicationId);
        await removeSecurityMiddleware(application, result);
        return result;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error removing this security";
        throw new TRPCError({
            code: "BAD_REQUEST",
            message,
        });
    }
};
export const updateSecurityById = async (securityId, data) => {
    try {
        const response = await db
            .update(security)
            .set({
            ...data,
        })
            .where(eq(security.securityId, securityId))
            .returning();
        return response[0];
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error updating this security";
        throw new TRPCError({
            code: "BAD_REQUEST",
            message,
        });
    }
};

import { db } from "../db/index.js";
import { redirects } from "../db/schema/index.js";
import { createRedirectMiddleware, removeRedirectMiddleware, updateRedirectMiddleware, } from "../utils/traefik/redirect.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { findApplicationById } from "./application.js";
export const findRedirectById = async (redirectId) => {
    const application = await db.query.redirects.findFirst({
        where: eq(redirects.redirectId, redirectId),
    });
    if (!application) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Redirect not found",
        });
    }
    return application;
};
export const createRedirect = async (redirectData) => {
    try {
        await db.transaction(async (tx) => {
            const redirect = await tx
                .insert(redirects)
                .values({
                ...redirectData,
            })
                .returning()
                .then((res) => res[0]);
            if (!redirect) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Error creating the redirect",
                });
            }
            const application = await findApplicationById(redirect.applicationId);
            createRedirectMiddleware(application, redirect);
        });
        return true;
    }
    catch (error) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating this redirect",
            cause: error,
        });
    }
};
export const removeRedirectById = async (redirectId) => {
    try {
        const response = await db
            .delete(redirects)
            .where(eq(redirects.redirectId, redirectId))
            .returning()
            .then((res) => res[0]);
        if (!response) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Redirect not found",
            });
        }
        const application = await findApplicationById(response.applicationId);
        await removeRedirectMiddleware(application, response);
        return response;
    }
    catch (error) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error removing this redirect",
            cause: error,
        });
    }
};
export const updateRedirectById = async (redirectId, redirectData) => {
    try {
        const redirect = await db
            .update(redirects)
            .set({
            ...redirectData,
        })
            .where(eq(redirects.redirectId, redirectId))
            .returning()
            .then((res) => res[0]);
        if (!redirect) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Redirect not found",
            });
        }
        const application = await findApplicationById(redirect.applicationId);
        await updateRedirectMiddleware(application, redirect);
        return redirect;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error updating this redirect";
        throw new TRPCError({
            code: "BAD_REQUEST",
            message,
        });
    }
};

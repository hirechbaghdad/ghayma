import { db } from "../db/index.js";
import { ports } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
export const createPort = async (input) => {
    const newPort = await db
        .insert(ports)
        .values({
        ...input,
    })
        .returning()
        .then((value) => value[0]);
    if (!newPort) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error input: Inserting port",
        });
    }
    return newPort;
};
export const finPortById = async (portId) => {
    const result = await db.query.ports.findFirst({
        where: eq(ports.portId, portId),
        with: {
            application: {
                with: {
                    environment: {
                        with: {
                            project: true,
                        },
                    },
                },
            },
        },
    });
    if (!result) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Port not found",
        });
    }
    return result;
};
export const removePortById = async (portId) => {
    const result = await db
        .delete(ports)
        .where(eq(ports.portId, portId))
        .returning();
    return result[0];
};
export const updatePortById = async (portId, portData) => {
    const result = await db
        .update(ports)
        .set({
        ...portData,
    })
        .where(eq(ports.portId, portId))
        .returning();
    return result[0];
};

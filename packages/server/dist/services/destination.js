import { db } from "../db/index.js";
import { destinations, } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
export const createDestintation = async (input, organizationId) => {
    const newDestination = await db
        .insert(destinations)
        .values({
        ...input,
        organizationId: organizationId,
    })
        .returning()
        .then((value) => value[0]);
    if (!newDestination) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error input: Inserting destination",
        });
    }
    return newDestination;
};
export const findDestinationById = async (destinationId) => {
    const destination = await db.query.destinations.findFirst({
        where: and(eq(destinations.destinationId, destinationId)),
    });
    if (!destination) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Destination not found",
        });
    }
    return destination;
};
export const removeDestinationById = async (destinationId, organizationId) => {
    const result = await db
        .delete(destinations)
        .where(and(eq(destinations.destinationId, destinationId), eq(destinations.organizationId, organizationId)))
        .returning();
    return result[0];
};
export const updateDestinationById = async (destinationId, destinationData) => {
    const result = await db
        .update(destinations)
        .set({
        ...destinationData,
    })
        .where(and(eq(destinations.destinationId, destinationId), eq(destinations.organizationId, destinationData.organizationId || "")))
        .returning();
    return result[0];
};

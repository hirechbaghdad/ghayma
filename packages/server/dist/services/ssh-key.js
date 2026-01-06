import { db } from "../db/index.js";
import { sshKeys, } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
export const createSshKey = async (input) => {
    await db.transaction(async (tx) => {
        const sshKey = await tx
            .insert(sshKeys)
            .values(input)
            .returning()
            .then((response) => response[0])
            .catch((e) => console.error(e));
        if (!sshKey) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the SSH Key",
            });
        }
        return sshKey;
    });
};
export const removeSSHKeyById = async (sshKeyId) => {
    const result = await db
        .delete(sshKeys)
        .where(eq(sshKeys.sshKeyId, sshKeyId))
        .returning();
    return result[0];
};
export const updateSSHKeyById = async ({ sshKeyId, ...input }) => {
    const result = await db
        .update(sshKeys)
        .set(input)
        .where(eq(sshKeys.sshKeyId, sshKeyId))
        .returning();
    return result[0];
};
export const findSSHKeyById = async (sshKeyId) => {
    const sshKey = await db.query.sshKeys.findFirst({
        where: eq(sshKeys.sshKeyId, sshKeyId),
    });
    if (!sshKey) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "SSH Key not found",
        });
    }
    return sshKey;
};

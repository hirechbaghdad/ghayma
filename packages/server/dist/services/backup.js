import { db } from "../db/index.js";
import { backups } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
export const createBackup = async (input) => {
    const newBackup = await db
        .insert(backups)
        .values({
        ...input,
    })
        .returning()
        .then((value) => value[0]);
    if (!newBackup) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the Backup",
        });
    }
    return newBackup;
};
export const findBackupById = async (backupId) => {
    const backup = await db.query.backups.findFirst({
        where: eq(backups.backupId, backupId),
        with: {
            postgres: true,
            mysql: true,
            mariadb: true,
            mongo: true,
            destination: true,
            compose: true,
        },
    });
    if (!backup) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Backup not found",
        });
    }
    return backup;
};
export const updateBackupById = async (backupId, backupData) => {
    const result = await db
        .update(backups)
        .set({
        ...backupData,
    })
        .where(eq(backups.backupId, backupId))
        .returning();
    return result[0];
};
export const removeBackupById = async (backupId) => {
    const result = await db
        .delete(backups)
        .where(eq(backups.backupId, backupId))
        .returning();
    return result[0];
};
export const findBackupsByDbId = async (id, type) => {
    const result = await db.query.backups.findMany({
        where: eq(backups[`${type}Id`], id),
        with: {
            postgres: true,
            mysql: true,
            mariadb: true,
            mongo: true,
            destination: true,
        },
    });
    return result || [];
};

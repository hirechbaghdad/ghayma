import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { volumeBackups, } from "../db/schema/index.js";
export const findVolumeBackupById = async (volumeBackupId) => {
    const volumeBackup = await db.query.volumeBackups.findFirst({
        where: eq(volumeBackups.volumeBackupId, volumeBackupId),
        with: {
            application: true,
            postgres: true,
            mysql: true,
            mariadb: true,
            mongo: true,
            redis: true,
            compose: true,
            destination: true,
        },
    });
    if (!volumeBackup) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Volume backup not found",
        });
    }
    return volumeBackup;
};
export const createVolumeBackup = async (volumeBackup) => {
    const newVolumeBackup = await db
        .insert(volumeBackups)
        .values(volumeBackup)
        .returning()
        .then((e) => e[0]);
    return newVolumeBackup;
};
export const removeVolumeBackup = async (volumeBackupId) => {
    await db
        .delete(volumeBackups)
        .where(eq(volumeBackups.volumeBackupId, volumeBackupId));
};
export const updateVolumeBackup = async (volumeBackupId, volumeBackup) => {
    return await db
        .update(volumeBackups)
        .set(volumeBackup)
        .where(eq(volumeBackups.volumeBackupId, volumeBackupId))
        .returning()
        .then((e) => e[0]);
};

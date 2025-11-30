export * from "./backup.js";
export * from "./restore.js";
export * from "./utils.js";
import { volumeBackups } from "../../db/schema/index.js";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { scheduleVolumeBackup } from "./utils.js";
export const initVolumeBackupsCronJobs = async () => {
    console.log("Setting up volume backups cron jobs....");
    try {
        const volumeBackupsResult = await db.query.volumeBackups.findMany({
            where: eq(volumeBackups.enabled, true),
            with: {
                application: true,
                compose: true,
            },
        });
        console.log(`Initializing ${volumeBackupsResult.length} volume backups`);
        for (const volumeBackup of volumeBackupsResult) {
            scheduleVolumeBackup(volumeBackup.volumeBackupId);
            console.log(`Initialized volume backup: ${volumeBackup.name} ${volumeBackup.serviceType} ✅`);
        }
    }
    catch (error) {
        console.log(`Error initializing volume backups: ${error}`);
    }
};

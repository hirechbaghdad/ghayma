import type { findVolumeBackupById } from "../../services/volume-backups.js";
export declare const backupVolume: (volumeBackup: Awaited<ReturnType<typeof findVolumeBackupById>>) => Promise<string | undefined>;

import type { BackupSchedule } from "../../services/backup.js";
export declare const initCronJobs: () => Promise<void>;
export declare const keepLatestNBackups: (backup: BackupSchedule, serverId?: string | null) => Promise<void>;

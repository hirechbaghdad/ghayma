import type { BackupSchedule } from "../../services/backup.js";
export declare const runWebServerBackup: (backup: BackupSchedule) => Promise<true | undefined>;

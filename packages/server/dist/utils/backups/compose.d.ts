import type { BackupSchedule } from "../../services/backup.js";
import type { Compose } from "../../services/compose.js";
export declare const runComposeBackup: (compose: Compose, backup: BackupSchedule) => Promise<void>;

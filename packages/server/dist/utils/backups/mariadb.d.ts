import type { BackupSchedule } from "../../services/backup.js";
import type { Mariadb } from "../../services/mariadb.js";
export declare const runMariadbBackup: (mariadb: Mariadb, backup: BackupSchedule) => Promise<void>;

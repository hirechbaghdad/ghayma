import type { BackupSchedule } from "../../services/backup.js";
import type { MySql } from "../../services/mysql.js";
export declare const runMySqlBackup: (mysql: MySql, backup: BackupSchedule) => Promise<void>;

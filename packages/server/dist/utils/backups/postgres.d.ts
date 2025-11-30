import type { BackupSchedule } from "../../services/backup.js";
import type { Postgres } from "../../services/postgres.js";
export declare const runPostgresBackup: (postgres: Postgres, backup: BackupSchedule) => Promise<void>;

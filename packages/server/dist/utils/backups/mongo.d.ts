import type { BackupSchedule } from "../../services/backup.js";
import type { Mongo } from "../../services/mongo.js";
export declare const runMongoBackup: (mongo: Mongo, backup: BackupSchedule) => Promise<void>;

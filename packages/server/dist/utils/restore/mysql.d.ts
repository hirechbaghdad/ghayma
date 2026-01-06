import type { apiRestoreBackup } from "../../db/schema/index.js";
import type { Destination } from "../../services/destination.js";
import type { MySql } from "../../services/mysql.js";
import type { z } from "zod";
export declare const restoreMySqlBackup: (mysql: MySql, destination: Destination, backupInput: z.infer<typeof apiRestoreBackup>, emit: (log: string) => void) => Promise<void>;

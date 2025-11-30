import type { apiRestoreBackup } from "../../db/schema/index.js";
import type { Destination } from "../../services/destination.js";
import type { Postgres } from "../../services/postgres.js";
import type { z } from "zod";
export declare const restorePostgresBackup: (postgres: Postgres, destination: Destination, backupInput: z.infer<typeof apiRestoreBackup>, emit: (log: string) => void) => Promise<void>;

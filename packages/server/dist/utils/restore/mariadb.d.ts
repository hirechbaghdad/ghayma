import type { apiRestoreBackup } from "../../db/schema/index.js";
import type { Destination } from "../../services/destination.js";
import type { Mariadb } from "../../services/mariadb.js";
import type { z } from "zod";
export declare const restoreMariadbBackup: (mariadb: Mariadb, destination: Destination, backupInput: z.infer<typeof apiRestoreBackup>, emit: (log: string) => void) => Promise<void>;

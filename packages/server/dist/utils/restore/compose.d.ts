import type { apiRestoreBackup } from "../../db/schema/index.js";
import type { Compose } from "../../services/compose.js";
import type { Destination } from "../../services/destination.js";
import type { z } from "zod";
export declare const restoreComposeBackup: (compose: Compose, destination: Destination, backupInput: z.infer<typeof apiRestoreBackup>, emit: (log: string) => void) => Promise<void>;

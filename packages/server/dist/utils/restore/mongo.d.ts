import type { apiRestoreBackup } from "../../db/schema/index.js";
import type { Destination } from "../../services/destination.js";
import type { Mongo } from "../../services/mongo.js";
import type { z } from "zod";
export declare const restoreMongoBackup: (mongo: Mongo, destination: Destination, backupInput: z.infer<typeof apiRestoreBackup>, emit: (log: string) => void) => Promise<void>;

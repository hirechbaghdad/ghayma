import type { Destination } from "../../services/destination.js";
export declare const restoreWebServerBackup: (destination: Destination, backupFile: string, emit: (log: string) => void) => Promise<void>;

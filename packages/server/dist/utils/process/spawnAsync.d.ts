import { type ChildProcess, type SpawnOptions } from "node:child_process";
import BufferList from "bl";
export declare const spawnAsync: (command: string, args?: string[] | undefined, onData?: (data: string) => void, // Callback opcional para manejar datos en tiempo real
options?: SpawnOptions) => Promise<BufferList> & {
    child: ChildProcess;
};

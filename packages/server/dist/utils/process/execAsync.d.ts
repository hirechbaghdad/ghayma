export { ExecError } from "./ExecError.js";
export declare const execAsync: (command: string, options?: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    shell?: string;
}) => Promise<{
    stdout: string;
    stderr: string;
}>;
interface ExecOptions {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
}
export declare const execAsyncStream: (command: string, onData?: (data: string) => void, options?: ExecOptions) => Promise<{
    stdout: string;
    stderr: string;
}>;
export declare const execFileAsync: (command: string, args: string[], options?: {
    input?: string;
}) => Promise<{
    stdout: string;
    stderr: string;
}>;
export declare const execAsyncRemote: (serverId: string | null, command: string, onData?: (data: string) => void) => Promise<{
    stdout: string;
    stderr: string;
}>;
export declare const sleep: (ms: number) => Promise<unknown>;

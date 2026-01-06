export interface ExecErrorDetails {
    command: string;
    stdout?: string;
    stderr?: string;
    exitCode?: number;
    originalError?: Error;
    serverId?: string | null;
}
export declare class ExecError extends Error {
    readonly command: string;
    readonly stdout?: string;
    readonly stderr?: string;
    readonly exitCode?: number;
    readonly originalError?: Error;
    readonly serverId?: string | null;
    constructor(message: string, details: ExecErrorDetails);
    /**
     * Get a formatted error message with all details
     */
    getDetailedMessage(): string;
    /**
     * Check if this error is from a remote execution
     */
    isRemote(): boolean;
}

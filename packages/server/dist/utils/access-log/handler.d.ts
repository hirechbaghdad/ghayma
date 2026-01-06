export declare const startLogCleanup: (cronExpression?: string) => Promise<boolean>;
export declare const stopLogCleanup: () => Promise<boolean>;
export declare const getLogCleanupStatus: () => Promise<{
    enabled: boolean;
    cronExpression: string | null;
}>;

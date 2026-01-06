interface ServerThresholdPayload {
    Type: "CPU" | "Memory";
    Value: number;
    Threshold: number;
    Message: string;
    Timestamp: string;
    Token: string;
    ServerName: string;
}
export declare const sendServerThresholdNotifications: (organizationId: string, payload: ServerThresholdPayload) => Promise<void>;
export {};

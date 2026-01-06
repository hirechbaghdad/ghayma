import { type apiCreateServer, server } from "../db/schema/index.js";
export type Server = typeof server.$inferSelect;
export declare const createServer: (input: typeof apiCreateServer._type, organizationId: string) => Promise<{
    port: number;
    name: string;
    description: string | null;
    createdAt: string;
    organizationId: string;
    enableDockerCleanup: boolean;
    metricsConfig: {
        server: {
            type: "Dokploy" | "Remote";
            refreshRate: number;
            port: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        };
        containers: {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        };
    };
    appName: string;
    sshKeyId: string | null;
    command: string;
    serverId: string;
    ipAddress: string;
    username: string;
    serverStatus: "active" | "inactive";
}>;
export declare const findServerById: (serverId: string) => Promise<{
    port: number;
    name: string;
    description: string | null;
    createdAt: string;
    organizationId: string;
    enableDockerCleanup: boolean;
    metricsConfig: {
        server: {
            type: "Dokploy" | "Remote";
            refreshRate: number;
            port: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        };
        containers: {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        };
    };
    appName: string;
    sshKeyId: string | null;
    command: string;
    serverId: string;
    ipAddress: string;
    username: string;
    serverStatus: "active" | "inactive";
    deployments: {
        status: "running" | "done" | "error" | "cancelled" | null;
        description: string | null;
        createdAt: string;
        applicationId: string | null;
        composeId: string | null;
        serverId: string | null;
        title: string;
        previewDeploymentId: string | null;
        deploymentId: string;
        logPath: string;
        pid: string | null;
        isPreviewDeployment: boolean | null;
        startedAt: string | null;
        finishedAt: string | null;
        errorMessage: string | null;
        scheduleId: string | null;
        backupId: string | null;
        rollbackId: string | null;
        volumeBackupId: string | null;
    }[];
    sshKey: {
        name: string;
        description: string | null;
        publicKey: string;
        privateKey: string;
        createdAt: string;
        organizationId: string;
        sshKeyId: string;
        lastUsedAt: string | null;
    } | null;
}>;
export declare const findServersByUserId: (userId: string) => Promise<{
    port: number;
    name: string;
    description: string | null;
    createdAt: string;
    organizationId: string;
    enableDockerCleanup: boolean;
    metricsConfig: {
        server: {
            type: "Dokploy" | "Remote";
            refreshRate: number;
            port: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        };
        containers: {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        };
    };
    appName: string;
    sshKeyId: string | null;
    command: string;
    serverId: string;
    ipAddress: string;
    username: string;
    serverStatus: "active" | "inactive";
}[]>;
export declare const deleteServer: (serverId: string) => Promise<{
    port: number;
    name: string;
    description: string | null;
    createdAt: string;
    organizationId: string;
    enableDockerCleanup: boolean;
    metricsConfig: {
        server: {
            type: "Dokploy" | "Remote";
            refreshRate: number;
            port: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        };
        containers: {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        };
    };
    appName: string;
    sshKeyId: string | null;
    command: string;
    serverId: string;
    ipAddress: string;
    username: string;
    serverStatus: "active" | "inactive";
} | undefined>;
export declare const haveActiveServices: (serverId: string) => Promise<boolean>;
export declare const updateServerById: (serverId: string, serverData: Partial<Server>) => Promise<{
    serverId: string;
    name: string;
    description: string | null;
    ipAddress: string;
    port: number;
    username: string;
    appName: string;
    enableDockerCleanup: boolean;
    createdAt: string;
    organizationId: string;
    serverStatus: "active" | "inactive";
    command: string;
    sshKeyId: string | null;
    metricsConfig: {
        server: {
            type: "Dokploy" | "Remote";
            refreshRate: number;
            port: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        };
        containers: {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        };
    };
} | undefined>;
export declare const getAllServers: () => Promise<{
    port: number;
    name: string;
    description: string | null;
    createdAt: string;
    organizationId: string;
    enableDockerCleanup: boolean;
    metricsConfig: {
        server: {
            type: "Dokploy" | "Remote";
            refreshRate: number;
            port: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        };
        containers: {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        };
    };
    appName: string;
    sshKeyId: string | null;
    command: string;
    serverId: string;
    ipAddress: string;
    username: string;
    serverStatus: "active" | "inactive";
}[]>;

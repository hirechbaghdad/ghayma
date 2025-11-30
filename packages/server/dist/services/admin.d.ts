export declare const findUserById: (userId: string) => Promise<{
    host: string | null;
    https: boolean;
    certificateType: "letsencrypt" | "none" | "custom";
    name: string;
    createdAt: Date | null;
    id: string;
    isRegistered: boolean;
    expirationDate: string;
    createdAt2: string;
    twoFactorEnabled: boolean | null;
    email: string;
    emailVerified: boolean;
    image: string | null;
    banned: boolean | null;
    banReason: string | null;
    banExpires: Date | null;
    updatedAt: Date;
    serverIp: string | null;
    letsEncryptEmail: string | null;
    sshPrivateKey: string | null;
    enableDockerCleanup: boolean;
    logCleanupCron: string | null;
    role: string;
    enablePaidFeatures: boolean;
    allowImpersonation: boolean;
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
    cleanupCacheApplications: boolean;
    cleanupCacheOnPreviews: boolean;
    cleanupCacheOnCompose: boolean;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    serversQuantity: number;
}>;
export declare const findOrganizationById: (organizationId: string) => Promise<{
    name: string;
    createdAt: Date;
    id: string;
    slug: string | null;
    logo: string | null;
    metadata: string | null;
    ownerId: string;
    owner: {
        host: string | null;
        https: boolean;
        certificateType: "letsencrypt" | "none" | "custom";
        name: string;
        createdAt: Date | null;
        id: string;
        isRegistered: boolean;
        expirationDate: string;
        createdAt2: string;
        twoFactorEnabled: boolean | null;
        email: string;
        emailVerified: boolean;
        image: string | null;
        banned: boolean | null;
        banReason: string | null;
        banExpires: Date | null;
        updatedAt: Date;
        serverIp: string | null;
        letsEncryptEmail: string | null;
        sshPrivateKey: string | null;
        enableDockerCleanup: boolean;
        logCleanupCron: string | null;
        role: string;
        enablePaidFeatures: boolean;
        allowImpersonation: boolean;
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
        cleanupCacheApplications: boolean;
        cleanupCacheOnPreviews: boolean;
        cleanupCacheOnCompose: boolean;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        serversQuantity: number;
    };
} | undefined>;
export declare const isAdminPresent: () => Promise<boolean>;
export declare const findAdmin: () => Promise<{
    createdAt: Date;
    organizationId: string;
    id: string;
    role: "owner" | "member" | "admin";
    userId: string;
    teamId: string | null;
    isDefault: boolean;
    canCreateProjects: boolean;
    canAccessToSSHKeys: boolean;
    canCreateServices: boolean;
    canDeleteProjects: boolean;
    canDeleteServices: boolean;
    canAccessToDocker: boolean;
    canAccessToAPI: boolean;
    canAccessToGitProviders: boolean;
    canAccessToTraefikFiles: boolean;
    canDeleteEnvironments: boolean;
    canCreateEnvironments: boolean;
    accessedProjects: string[];
    accessedEnvironments: string[];
    accessedServices: string[];
    user: {
        host: string | null;
        https: boolean;
        certificateType: "letsencrypt" | "none" | "custom";
        name: string;
        createdAt: Date | null;
        id: string;
        isRegistered: boolean;
        expirationDate: string;
        createdAt2: string;
        twoFactorEnabled: boolean | null;
        email: string;
        emailVerified: boolean;
        image: string | null;
        banned: boolean | null;
        banReason: string | null;
        banExpires: Date | null;
        updatedAt: Date;
        serverIp: string | null;
        letsEncryptEmail: string | null;
        sshPrivateKey: string | null;
        enableDockerCleanup: boolean;
        logCleanupCron: string | null;
        role: string;
        enablePaidFeatures: boolean;
        allowImpersonation: boolean;
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
        cleanupCacheApplications: boolean;
        cleanupCacheOnPreviews: boolean;
        cleanupCacheOnCompose: boolean;
        stripeCustomerId: string | null;
        stripeSubscriptionId: string | null;
        serversQuantity: number;
    };
}>;
export declare const getUserByToken: (token: string) => Promise<{
    isExpired: boolean;
    userAlreadyExists: boolean;
    status: string;
    id: string;
    email: string;
    role: "owner" | "member" | "admin" | null;
    inviterId: string;
}>;
export declare const removeUserById: (userId: string) => Promise<void>;
export declare const getDokployUrl: () => Promise<string>;

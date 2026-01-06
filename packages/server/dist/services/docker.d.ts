export declare const getContainers: (serverId?: string | null) => Promise<{
    containerId: string;
    name: string;
    image: string;
    ports: string;
    state: string;
    status: string;
    serverId: string | null | undefined;
}[] | undefined>;
export declare const getConfig: (containerId: string, serverId?: string | null) => Promise<any>;
export declare const getContainersByAppNameMatch: (appName: string, appType?: "stack" | "docker-compose", serverId?: string) => Promise<{
    containerId: string;
    name: string;
    state: string;
}[]>;
export declare const getStackContainersByAppName: (appName: string, serverId?: string) => Promise<{
    containerId: string;
    name: string;
    state: string;
    node: string;
}[]>;
export declare const getServiceContainersByAppName: (appName: string, serverId?: string) => Promise<{
    containerId: string;
    name: string;
    state: string;
    node: string;
}[]>;
export declare const getContainersByAppLabel: (appName: string, type: "standalone" | "swarm", serverId?: string) => Promise<{
    containerId: string;
    name: string;
    state: string;
}[] | undefined>;
export declare const containerRestart: (containerId: string) => Promise<any>;
export declare const getSwarmNodes: (serverId?: string) => Promise<any[] | undefined>;
export declare const getNodeInfo: (nodeId: string, serverId?: string) => Promise<any>;
export declare const getNodeApplications: (serverId?: string) => Promise<any[] | undefined>;
export declare const getApplicationInfo: (appNames: string[], serverId?: string) => Promise<any[] | undefined>;

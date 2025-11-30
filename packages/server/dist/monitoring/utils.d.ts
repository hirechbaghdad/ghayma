export interface Container {
    BlockIO: string;
    CPUPerc: string;
    Container: string;
    ID: string;
    MemPerc: string;
    MemUsage: string;
    Name: string;
    NetIO: string;
}
export declare const recordAdvancedStats: (stats: Container, appName: string) => Promise<void>;
/**
 * Get host system statistics using node-os-utils
 * This is used when monitoring "dokploy" to show host stats instead of container stats
 */
export declare const getHostSystemStats: () => Promise<Container>;
export declare const getAdvancedStats: (appName: string) => Promise<{
    cpu: any;
    memory: any;
    disk: any;
    network: any;
    block: any;
}>;
export declare const readStatsFile: (appName: string, statType: "cpu" | "memory" | "disk" | "network" | "block") => Promise<any>;
export declare const updateStatsFile: (appName: string, statType: "cpu" | "memory" | "disk" | "network" | "block", value: number | string | unknown) => Promise<void>;
export declare const readLastValueStatsFile: (appName: string, statType: "cpu" | "memory" | "disk" | "network" | "block") => Promise<any>;
export declare const getLastAdvancedStatsFile: (appName: string) => Promise<{
    cpu: any;
    memory: any;
    disk: any;
    network: any;
    block: any;
}>;

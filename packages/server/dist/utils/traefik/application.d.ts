import type { Domain } from "../../services/domain.js";
import type { FileConfig, HttpLoadBalancerService } from "./file-types.js";
export declare const createTraefikConfig: (appName: string) => void;
export declare const removeTraefikConfig: (appName: string, serverId?: string | null) => Promise<void>;
export declare const removeTraefikConfigRemote: (appName: string, serverId: string) => Promise<void>;
export declare const loadOrCreateConfig: (appName: string) => FileConfig;
export declare const loadOrCreateConfigRemote: (serverId: string, appName: string) => Promise<FileConfig>;
export declare const readConfig: (appName: string) => string | null;
export declare const readRemoteConfig: (serverId: string, appName: string) => Promise<string | null>;
export declare const readMonitoringConfig: (readAll?: boolean) => Promise<string | null>;
export declare const readConfigInPath: (pathFile: string, serverId?: string) => Promise<string | null>;
export declare const writeConfig: (appName: string, traefikConfig: string) => void;
export declare const writeConfigRemote: (serverId: string, appName: string, traefikConfig: string) => Promise<void>;
export declare const writeTraefikConfigInPath: (pathFile: string, traefikConfig: string, serverId?: string) => Promise<void>;
export declare const writeTraefikConfig: (traefikConfig: FileConfig, appName: string) => void;
export declare const writeTraefikConfigRemote: (traefikConfig: FileConfig, appName: string, serverId: string) => Promise<void>;
export declare const createServiceConfig: (appName: string, domain: Domain) => {
    loadBalancer: HttpLoadBalancerService;
};

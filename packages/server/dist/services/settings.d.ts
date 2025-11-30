import { type TraefikOptions } from "../setup/traefik-setup.js";
export interface IUpdateData {
    latestVersion: string | null;
    updateAvailable: boolean;
}
export declare const DEFAULT_UPDATE_DATA: IUpdateData;
/** Returns current Dokploy docker image tag or `latest` by default. */
export declare const getDokployImageTag: () => string;
export declare const getDokployImage: () => string;
export declare const pullLatestRelease: () => Promise<void>;
/** Returns Dokploy docker service image digest */
export declare const getServiceImageDigest: () => Promise<string>;
/** Returns latest version number and information whether server update is available by comparing current image's digest against digest for provided image tag via Docker hub API. */
export declare const getUpdateData: () => Promise<IUpdateData>;
interface TreeDataItem {
    id: string;
    name: string;
    type: "file" | "directory";
    children?: TreeDataItem[];
}
export declare const readDirectory: (dirPath: string, serverId?: string) => Promise<TreeDataItem[]>;
export declare const cleanupFullDocker: (serverId?: string | null) => Promise<void>;
export declare const getDockerResourceType: (resourceName: string, serverId?: string) => Promise<"unknown" | "standalone" | "service">;
export declare const reloadDockerResource: (resourceName: string, serverId?: string) => Promise<void>;
export declare const readEnvironmentVariables: (resourceName: string, serverId?: string) => Promise<any>;
export declare const readPorts: (resourceName: string, serverId?: string) => Promise<{
    targetPort: number;
    publishedPort: number;
    protocol?: string;
}[]>;
export declare const writeTraefikSetup: (input: TraefikOptions) => Promise<void>;
export {};

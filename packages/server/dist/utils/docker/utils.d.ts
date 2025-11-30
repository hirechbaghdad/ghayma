import type { Compose } from "../../services/compose.js";
import type { ContainerInfo, ResourceRequirements } from "dockerode";
import type { ApplicationNested } from "../builders/index.js";
import type { MariadbNested } from "../databases/mariadb.js";
import type { MongoNested } from "../databases/mongo.js";
import type { MysqlNested } from "../databases/mysql.js";
import type { PostgresNested } from "../databases/postgres.js";
import type { RedisNested } from "../databases/redis.js";
interface RegistryAuth {
    username: string;
    password: string;
    registryUrl: string;
}
export declare const pullImage: (dockerImage: string, onData?: (data: any) => void, authConfig?: Partial<RegistryAuth>) => Promise<void>;
export declare const pullRemoteImage: (dockerImage: string, serverId: string, onData?: (data: any) => void, authConfig?: Partial<RegistryAuth>) => Promise<void>;
export declare const containerExists: (containerName: string) => Promise<boolean>;
export declare const stopService: (appName: string) => Promise<unknown>;
export declare const stopServiceRemote: (serverId: string, appName: string) => Promise<unknown>;
export declare const getContainerByName: (name: string) => Promise<ContainerInfo>;
export declare const cleanUpUnusedImages: (serverId?: string) => Promise<void>;
export declare const cleanStoppedContainers: (serverId?: string) => Promise<void>;
export declare const cleanUpUnusedVolumes: (serverId?: string) => Promise<void>;
export declare const cleanUpInactiveContainers: () => Promise<void>;
export declare const cleanUpDockerBuilder: (serverId?: string) => Promise<void>;
export declare const cleanUpSystemPrune: (serverId?: string) => Promise<void>;
export declare const startService: (appName: string) => Promise<void>;
export declare const startServiceRemote: (serverId: string, appName: string) => Promise<void>;
export declare const removeService: (appName: string, serverId?: string | null, _deleteVolumes?: boolean) => Promise<unknown>;
export declare const prepareEnvironmentVariables: (serviceEnv: string | null, projectEnv?: string | null, environmentEnv?: string | null) => string[];
export declare const prepareEnvironmentVariablesForShell: (serviceEnv: string | null, projectEnv?: string | null, environmentEnv?: string | null) => string[];
export declare const parseEnvironmentKeyValuePair: (pair: string) => [string, string];
export declare const getEnviromentVariablesObject: (input: string | null, projectEnv?: string | null, environmentEnv?: string | null) => Record<string, string>;
export declare const generateVolumeMounts: (mounts: ApplicationNested["mounts"]) => {
    Type: "volume";
    Source: string;
    Target: string;
}[];
type Resources = {
    memoryLimit: string | null;
    memoryReservation: string | null;
    cpuLimit: string | null;
    cpuReservation: string | null;
};
export declare const calculateResources: ({ memoryLimit, memoryReservation, cpuLimit, cpuReservation, }: Resources) => ResourceRequirements;
export declare const generateConfigContainer: (application: Partial<ApplicationNested>) => {
    EndpointSpec?: {
        Ports: {
            Protocol: "tcp" | "udp" | "sctp";
            TargetPort: number;
            PublishedPort: number;
            PublishMode: "ingress" | "host";
        }[];
        Mode?: string | undefined;
    } | undefined;
    Networks: import("../../db/schema/index.js").NetworkSwarm[];
    StopGracePeriod?: number | undefined;
    UpdateConfig: import("../../db/schema/index.js").UpdateConfigSwarm;
    RollbackConfig?: import("../../db/schema/index.js").UpdateConfigSwarm | undefined;
    Mode: import("../../db/schema/index.js").ServiceModeSwarm;
    Labels?: import("../../db/schema/index.js").LabelsSwarm | undefined;
    Placement: import("../../db/schema/index.js").PlacementSwarm;
    RestartPolicy?: import("../../db/schema/index.js").RestartPolicySwarm | undefined;
    HealthCheck?: import("../../db/schema/index.js").HealthCheckSwarm | undefined;
};
export declare const generateBindMounts: (mounts: ApplicationNested["mounts"]) => {
    Type: "bind";
    Source: string;
    Target: string;
}[];
export declare const generateFileMounts: (appName: string, service: ApplicationNested | MongoNested | MariadbNested | MysqlNested | PostgresNested | RedisNested) => {
    Type: "bind";
    Source: string;
    Target: string;
}[];
export declare const createFile: (outputPath: string, filePath: string, content: string) => Promise<void>;
export declare const encodeBase64: (content: string) => string;
export declare const getCreateFileCommand: (outputPath: string, filePath: string, content: string) => string;
export declare const getServiceContainer: (appName: string, serverId?: string | null) => Promise<ContainerInfo | null>;
export declare const getComposeContainer: (compose: Compose, serviceName: string) => Promise<ContainerInfo | null>;
export {};

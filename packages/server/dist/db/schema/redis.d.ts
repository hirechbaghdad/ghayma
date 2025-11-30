import { z } from "zod";
import { type EndpointSpecSwarm, type HealthCheckSwarm, type LabelsSwarm, type NetworkSwarm, type PlacementSwarm, type RestartPolicySwarm, type ServiceModeSwarm, type UpdateConfigSwarm } from "./shared.js";
export declare const redis: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "redis";
    schema: undefined;
    columns: {
        redisId: import("drizzle-orm/pg-core").PgColumn<{
            name: "redisId";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: true;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        appName: import("drizzle-orm/pg-core").PgColumn<{
            name: "appName";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        databasePassword: import("drizzle-orm/pg-core").PgColumn<{
            name: "password";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        dockerImage: import("drizzle-orm/pg-core").PgColumn<{
            name: "dockerImage";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        command: import("drizzle-orm/pg-core").PgColumn<{
            name: "command";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        env: import("drizzle-orm/pg-core").PgColumn<{
            name: "env";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        memoryReservation: import("drizzle-orm/pg-core").PgColumn<{
            name: "memoryReservation";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        memoryLimit: import("drizzle-orm/pg-core").PgColumn<{
            name: "memoryLimit";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cpuReservation: import("drizzle-orm/pg-core").PgColumn<{
            name: "cpuReservation";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cpuLimit: import("drizzle-orm/pg-core").PgColumn<{
            name: "cpuLimit";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        externalPort: import("drizzle-orm/pg-core").PgColumn<{
            name: "externalPort";
            tableName: "redis";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        applicationStatus: import("drizzle-orm/pg-core").PgColumn<{
            name: "applicationStatus";
            tableName: "redis";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "idle" | "running" | "done" | "error";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["idle", "running", "done", "error"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        healthCheckSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "healthCheckSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: HealthCheckSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: HealthCheckSwarm;
        }>;
        restartPolicySwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "restartPolicySwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: RestartPolicySwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: RestartPolicySwarm;
        }>;
        placementSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "placementSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: PlacementSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: PlacementSwarm;
        }>;
        updateConfigSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "updateConfigSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: UpdateConfigSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: UpdateConfigSwarm;
        }>;
        rollbackConfigSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "rollbackConfigSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: UpdateConfigSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: UpdateConfigSwarm;
        }>;
        modeSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "modeSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: ServiceModeSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: ServiceModeSwarm;
        }>;
        labelsSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "labelsSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: LabelsSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: LabelsSwarm;
        }>;
        networkSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "networkSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: NetworkSwarm[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: NetworkSwarm[];
        }>;
        stopGracePeriodSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "stopGracePeriodSwarm";
            tableName: "redis";
            dataType: "bigint";
            columnType: "PgBigInt64";
            data: bigint;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        endpointSpecSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "endpointSpecSwarm";
            tableName: "redis";
            dataType: "json";
            columnType: "PgJson";
            data: EndpointSpecSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: EndpointSpecSwarm;
        }>;
        replicas: import("drizzle-orm/pg-core").PgColumn<{
            name: "replicas";
            tableName: "redis";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        environmentId: import("drizzle-orm/pg-core").PgColumn<{
            name: "environmentId";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        serverId: import("drizzle-orm/pg-core").PgColumn<{
            name: "serverId";
            tableName: "redis";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
    };
    dialect: "pg";
}>;
export declare const redisRelations: import("drizzle-orm").Relations<"redis", {
    environment: import("drizzle-orm").One<"environment", true>;
    mounts: import("drizzle-orm").Many<"mount">;
    server: import("drizzle-orm").One<"server", false>;
}>;
export declare const apiCreateRedis: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    appName: z.ZodString;
    environmentId: z.ZodString;
    serverId: z.ZodNullable<z.ZodString>;
    dockerImage: z.ZodDefault<z.ZodString>;
    databasePassword: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    description: string | null;
    appName: string;
    environmentId: string;
    serverId: string | null;
    dockerImage: string;
    databasePassword: string;
}, {
    name: string;
    description: string | null;
    appName: string;
    environmentId: string;
    serverId: string | null;
    databasePassword: string;
    dockerImage?: string | undefined;
}>;
export declare const apiFindOneRedis: z.ZodObject<{
    redisId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    redisId: string;
}, {
    redisId: string;
}>;
export declare const apiChangeRedisStatus: z.ZodObject<{
    applicationStatus: z.ZodEnum<["idle", "running", "done", "error"]>;
    redisId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationStatus: "idle" | "running" | "done" | "error";
    redisId: string;
}, {
    applicationStatus: "idle" | "running" | "done" | "error";
    redisId: string;
}>;
export declare const apiSaveEnvironmentVariablesRedis: z.ZodObject<{
    env: z.ZodNullable<z.ZodString>;
    redisId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    env: string | null;
    redisId: string;
}, {
    env: string | null;
    redisId: string;
}>;
export declare const apiSaveExternalPortRedis: z.ZodObject<{
    externalPort: z.ZodNullable<z.ZodNumber>;
    redisId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    externalPort: number | null;
    redisId: string;
}, {
    externalPort: number | null;
    redisId: string;
}>;
export declare const apiDeployRedis: z.ZodObject<{
    redisId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    redisId: string;
}, {
    redisId: string;
}>;
export declare const apiResetRedis: z.ZodObject<{
    appName: z.ZodString;
    redisId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    appName: string;
    redisId: string;
}, {
    appName: string;
    redisId: string;
}>;
export declare const apiUpdateRedis: z.ZodObject<Omit<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    applicationStatus: z.ZodOptional<z.ZodOptional<z.ZodEnum<["idle", "running", "done", "error"]>>>;
    appName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    env: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    command: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    environmentId: z.ZodOptional<z.ZodString>;
    serverId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    memoryReservation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    memoryLimit: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    cpuReservation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    cpuLimit: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    dockerImage: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    healthCheckSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Test: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Interval: z.ZodOptional<z.ZodNumber>;
        Timeout: z.ZodOptional<z.ZodNumber>;
        StartPeriod: z.ZodOptional<z.ZodNumber>;
        Retries: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }>>>>>;
    restartPolicySwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Condition: z.ZodOptional<z.ZodString>;
        Delay: z.ZodOptional<z.ZodNumber>;
        MaxAttempts: z.ZodOptional<z.ZodNumber>;
        Window: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }>>>>>;
    placementSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Preferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Spread: z.ZodObject<{
                SpreadDescriptor: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                SpreadDescriptor: string;
            }, {
                SpreadDescriptor: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            Spread: {
                SpreadDescriptor: string;
            };
        }, {
            Spread: {
                SpreadDescriptor: string;
            };
        }>, "many">>;
        MaxReplicas: z.ZodOptional<z.ZodNumber>;
        Platforms: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Architecture: z.ZodString;
            OS: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            Architecture: string;
            OS: string;
        }, {
            Architecture: string;
            OS: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }>>>>>;
    updateConfigSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>>;
    rollbackConfigSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>>;
    modeSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Replicated: z.ZodOptional<z.ZodObject<{
            Replicas: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            Replicas?: number | undefined;
        }, {
            Replicas?: number | undefined;
        }>>;
        Global: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        ReplicatedJob: z.ZodOptional<z.ZodObject<{
            MaxConcurrent: z.ZodOptional<z.ZodNumber>;
            TotalCompletions: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }>>;
        GlobalJob: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }>>>>>;
    labelsSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>>>;
    networkSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodArray<z.ZodObject<{
        Target: z.ZodOptional<z.ZodString>;
        Aliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        DriverOpts: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }>, "many">>>>>;
    stopGracePeriodSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodBigInt>>>>;
    endpointSpecSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Mode: z.ZodOptional<z.ZodString>;
        Ports: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Protocol: z.ZodOptional<z.ZodString>;
            TargetPort: z.ZodOptional<z.ZodNumber>;
            PublishedPort: z.ZodOptional<z.ZodNumber>;
            PublishMode: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }>>>>>;
    replicas: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    databasePassword: z.ZodOptional<z.ZodString>;
    externalPort: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
} & {
    redisId: z.ZodString;
}, "serverId">, z.UnknownKeysParam, z.ZodTypeAny, {
    redisId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    createdAt?: string | undefined;
    applicationStatus?: "idle" | "running" | "done" | "error" | undefined;
    appName?: string | undefined;
    env?: string | null | undefined;
    command?: string | null | undefined;
    environmentId?: string | undefined;
    memoryReservation?: string | null | undefined;
    memoryLimit?: string | null | undefined;
    cpuReservation?: string | null | undefined;
    cpuLimit?: string | null | undefined;
    dockerImage?: string | undefined;
    healthCheckSwarm?: {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    } | null | undefined;
    restartPolicySwarm?: {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    } | null | undefined;
    placementSwarm?: {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    } | null | undefined;
    updateConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    rollbackConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    modeSwarm?: {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    } | null | undefined;
    labelsSwarm?: Record<string, string> | null | undefined;
    networkSwarm?: {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }[] | null | undefined;
    stopGracePeriodSwarm?: bigint | null | undefined;
    endpointSpecSwarm?: {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    } | null | undefined;
    replicas?: number | undefined;
    databasePassword?: string | undefined;
    externalPort?: number | null | undefined;
}, {
    redisId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    createdAt?: string | undefined;
    applicationStatus?: "idle" | "running" | "done" | "error" | undefined;
    appName?: string | undefined;
    env?: string | null | undefined;
    command?: string | null | undefined;
    environmentId?: string | undefined;
    memoryReservation?: string | null | undefined;
    memoryLimit?: string | null | undefined;
    cpuReservation?: string | null | undefined;
    cpuLimit?: string | null | undefined;
    dockerImage?: string | undefined;
    healthCheckSwarm?: {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    } | null | undefined;
    restartPolicySwarm?: {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    } | null | undefined;
    placementSwarm?: {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    } | null | undefined;
    updateConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    rollbackConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    modeSwarm?: {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    } | null | undefined;
    labelsSwarm?: Record<string, string> | null | undefined;
    networkSwarm?: {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }[] | null | undefined;
    stopGracePeriodSwarm?: bigint | null | undefined;
    endpointSpecSwarm?: {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    } | null | undefined;
    replicas?: number | undefined;
    databasePassword?: string | undefined;
    externalPort?: number | null | undefined;
}>;
export declare const apiRebuildRedis: z.ZodObject<{
    redisId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    redisId: string;
}, {
    redisId: string;
}>;

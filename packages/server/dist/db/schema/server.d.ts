import { z } from "zod";
export declare const serverStatus: import("drizzle-orm/pg-core").PgEnum<["active", "inactive"]>;
export declare const server: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "server";
    schema: undefined;
    columns: {
        serverId: import("drizzle-orm/pg-core").PgColumn<{
            name: "serverId";
            tableName: "server";
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
            tableName: "server";
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
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "server";
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
        ipAddress: import("drizzle-orm/pg-core").PgColumn<{
            name: "ipAddress";
            tableName: "server";
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
        port: import("drizzle-orm/pg-core").PgColumn<{
            name: "port";
            tableName: "server";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        username: import("drizzle-orm/pg-core").PgColumn<{
            name: "username";
            tableName: "server";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
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
            tableName: "server";
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
        enableDockerCleanup: import("drizzle-orm/pg-core").PgColumn<{
            name: "enableDockerCleanup";
            tableName: "server";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "server";
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
        organizationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "organizationId";
            tableName: "server";
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
        serverStatus: import("drizzle-orm/pg-core").PgColumn<{
            name: "serverStatus";
            tableName: "server";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "active" | "inactive";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["active", "inactive"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        command: import("drizzle-orm/pg-core").PgColumn<{
            name: "command";
            tableName: "server";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        sshKeyId: import("drizzle-orm/pg-core").PgColumn<{
            name: "sshKeyId";
            tableName: "server";
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
        metricsConfig: import("drizzle-orm/pg-core").PgColumn<{
            name: "metricsConfig";
            tableName: "server";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
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
            driverParam: unknown;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: {
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
        }>;
    };
    dialect: "pg";
}>;
export declare const serverRelations: import("drizzle-orm").Relations<"server", {
    deployments: import("drizzle-orm").Many<"deployment">;
    sshKey: import("drizzle-orm").One<"ssh-key", false>;
    applications: import("drizzle-orm").Many<"application">;
    compose: import("drizzle-orm").Many<"compose">;
    redis: import("drizzle-orm").Many<"redis">;
    mariadb: import("drizzle-orm").Many<"mariadb">;
    mongo: import("drizzle-orm").Many<"mongo">;
    mysql: import("drizzle-orm").Many<"mysql">;
    postgres: import("drizzle-orm").Many<"postgres">;
    certificates: import("drizzle-orm").Many<"certificate">;
    organization: import("drizzle-orm").One<"organization", true>;
    schedules: import("drizzle-orm").Many<"schedule">;
}>;
export declare const apiCreateServer: z.ZodObject<{
    port: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    sshKeyId: z.ZodNullable<z.ZodString>;
    ipAddress: z.ZodString;
    username: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    port: number;
    name: string;
    description: string | null;
    sshKeyId: string | null;
    ipAddress: string;
    username: string;
}, {
    port: number;
    name: string;
    description: string | null;
    sshKeyId: string | null;
    ipAddress: string;
    username: string;
}>;
export declare const apiFindOneServer: z.ZodObject<{
    serverId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    serverId: string;
}, {
    serverId: string;
}>;
export declare const apiRemoveServer: z.ZodObject<{
    serverId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    serverId: string;
}, {
    serverId: string;
}>;
export declare const apiUpdateServer: z.ZodObject<{
    port: z.ZodNumber;
    name: z.ZodString;
    description: z.ZodNullable<z.ZodString>;
    sshKeyId: z.ZodNullable<z.ZodString>;
    serverId: z.ZodString;
    ipAddress: z.ZodString;
    username: z.ZodString;
} & {
    command: z.ZodOptional<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    port: number;
    name: string;
    description: string | null;
    sshKeyId: string | null;
    serverId: string;
    ipAddress: string;
    username: string;
    command?: string | undefined;
}, {
    port: number;
    name: string;
    description: string | null;
    sshKeyId: string | null;
    serverId: string;
    ipAddress: string;
    username: string;
    command?: string | undefined;
}>;
export declare const apiUpdateServerMonitoring: z.ZodObject<{
    serverId: z.ZodString;
} & {
    metricsConfig: z.ZodObject<{
        server: z.ZodObject<{
            refreshRate: z.ZodNumber;
            port: z.ZodNumber;
            token: z.ZodString;
            urlCallback: z.ZodString;
            retentionDays: z.ZodNumber;
            cronJob: z.ZodString;
            thresholds: z.ZodObject<{
                cpu: z.ZodNumber;
                memory: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cpu: number;
                memory: number;
            }, {
                cpu: number;
                memory: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            port: number;
            refreshRate: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        }, {
            port: number;
            refreshRate: number;
            token: string;
            urlCallback: string;
            retentionDays: number;
            cronJob: string;
            thresholds: {
                cpu: number;
                memory: number;
            };
        }>;
        containers: z.ZodObject<{
            refreshRate: z.ZodNumber;
            services: z.ZodObject<{
                include: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                exclude: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            }, {
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            refreshRate: number;
            services: {
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            };
        }, {
            refreshRate: number;
            services: {
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        server: {
            port: number;
            refreshRate: number;
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
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            };
        };
    }, {
        server: {
            port: number;
            refreshRate: number;
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
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            };
        };
    }>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    metricsConfig: {
        server: {
            port: number;
            refreshRate: number;
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
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            };
        };
    };
    serverId: string;
}, {
    metricsConfig: {
        server: {
            port: number;
            refreshRate: number;
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
                include?: string[] | undefined;
                exclude?: string[] | undefined;
            };
        };
    };
    serverId: string;
}>;

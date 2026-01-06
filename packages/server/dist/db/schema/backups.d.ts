import { z } from "zod";
export declare const databaseType: import("drizzle-orm/pg-core").PgEnum<["postgres", "mariadb", "mysql", "mongo", "web-server"]>;
export declare const backupType: import("drizzle-orm/pg-core").PgEnum<["database", "compose"]>;
export declare const backups: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "backup";
    schema: undefined;
    columns: {
        backupId: import("drizzle-orm/pg-core").PgColumn<{
            name: "backupId";
            tableName: "backup";
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
        appName: import("drizzle-orm/pg-core").PgColumn<{
            name: "appName";
            tableName: "backup";
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
        schedule: import("drizzle-orm/pg-core").PgColumn<{
            name: "schedule";
            tableName: "backup";
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
        enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "enabled";
            tableName: "backup";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
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
        database: import("drizzle-orm/pg-core").PgColumn<{
            name: "database";
            tableName: "backup";
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
        prefix: import("drizzle-orm/pg-core").PgColumn<{
            name: "prefix";
            tableName: "backup";
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
        serviceName: import("drizzle-orm/pg-core").PgColumn<{
            name: "serviceName";
            tableName: "backup";
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
        destinationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "destinationId";
            tableName: "backup";
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
        keepLatestCount: import("drizzle-orm/pg-core").PgColumn<{
            name: "keepLatestCount";
            tableName: "backup";
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
        backupType: import("drizzle-orm/pg-core").PgColumn<{
            name: "backupType";
            tableName: "backup";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "compose" | "database";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["database", "compose"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        databaseType: import("drizzle-orm/pg-core").PgColumn<{
            name: "databaseType";
            tableName: "backup";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "mysql" | "postgres" | "mariadb" | "mongo" | "web-server";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["postgres", "mariadb", "mysql", "mongo", "web-server"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        composeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "composeId";
            tableName: "backup";
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
        postgresId: import("drizzle-orm/pg-core").PgColumn<{
            name: "postgresId";
            tableName: "backup";
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
        mariadbId: import("drizzle-orm/pg-core").PgColumn<{
            name: "mariadbId";
            tableName: "backup";
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
        mysqlId: import("drizzle-orm/pg-core").PgColumn<{
            name: "mysqlId";
            tableName: "backup";
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
        mongoId: import("drizzle-orm/pg-core").PgColumn<{
            name: "mongoId";
            tableName: "backup";
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
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "userId";
            tableName: "backup";
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
        metadata: import("drizzle-orm/pg-core").PgColumn<{
            name: "metadata";
            tableName: "backup";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                postgres?: {
                    databaseUser: string;
                };
                mariadb?: {
                    databaseUser: string;
                    databasePassword: string;
                };
                mongo?: {
                    databaseUser: string;
                    databasePassword: string;
                };
                mysql?: {
                    databaseRootPassword: string;
                };
            } | undefined;
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
            $type: {
                postgres?: {
                    databaseUser: string;
                };
                mariadb?: {
                    databaseUser: string;
                    databasePassword: string;
                };
                mongo?: {
                    databaseUser: string;
                    databasePassword: string;
                };
                mysql?: {
                    databaseRootPassword: string;
                };
            } | undefined;
        }>;
    };
    dialect: "pg";
}>;
export declare const backupsRelations: import("drizzle-orm").Relations<"backup", {
    destination: import("drizzle-orm").One<"destination", true>;
    postgres: import("drizzle-orm").One<"postgres", false>;
    mariadb: import("drizzle-orm").One<"mariadb", false>;
    mysql: import("drizzle-orm").One<"mysql", false>;
    mongo: import("drizzle-orm").One<"mongo", false>;
    user: import("drizzle-orm").One<"user", false>;
    compose: import("drizzle-orm").One<"compose", false>;
    deployments: import("drizzle-orm").Many<"deployment">;
}>;
export declare const apiCreateBackup: z.ZodObject<Pick<{
    serviceName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    metadata: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodAny>>>;
    userId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    composeId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    appName: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    prefix: z.ZodString;
    backupId: z.ZodOptional<z.ZodString>;
    postgresId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    mariadbId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    mongoId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    mysqlId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    databaseType: z.ZodEnum<["postgres", "mariadb", "mysql", "mongo", "web-server"]>;
    backupType: z.ZodOptional<z.ZodEnum<["database", "compose"]>>;
    database: z.ZodString;
    schedule: z.ZodString;
    destinationId: z.ZodString;
    keepLatestCount: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
}, "serviceName" | "metadata" | "userId" | "composeId" | "enabled" | "prefix" | "postgresId" | "mariadbId" | "mongoId" | "mysqlId" | "databaseType" | "backupType" | "database" | "schedule" | "destinationId" | "keepLatestCount">, z.UnknownKeysParam, z.ZodTypeAny, {
    prefix: string;
    databaseType: "mysql" | "postgres" | "mariadb" | "mongo" | "web-server";
    database: string;
    schedule: string;
    destinationId: string;
    serviceName?: string | null | undefined;
    metadata?: any;
    userId?: string | null | undefined;
    composeId?: string | null | undefined;
    enabled?: boolean | null | undefined;
    postgresId?: string | null | undefined;
    mariadbId?: string | null | undefined;
    mongoId?: string | null | undefined;
    mysqlId?: string | null | undefined;
    backupType?: "compose" | "database" | undefined;
    keepLatestCount?: number | null | undefined;
}, {
    prefix: string;
    databaseType: "mysql" | "postgres" | "mariadb" | "mongo" | "web-server";
    database: string;
    schedule: string;
    destinationId: string;
    serviceName?: string | null | undefined;
    metadata?: any;
    userId?: string | null | undefined;
    composeId?: string | null | undefined;
    enabled?: boolean | null | undefined;
    postgresId?: string | null | undefined;
    mariadbId?: string | null | undefined;
    mongoId?: string | null | undefined;
    mysqlId?: string | null | undefined;
    backupType?: "compose" | "database" | undefined;
    keepLatestCount?: number | null | undefined;
}>;
export declare const apiFindOneBackup: z.ZodObject<{
    backupId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    backupId: string;
}, {
    backupId: string;
}>;
export declare const apiRemoveBackup: z.ZodObject<{
    backupId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    backupId: string;
}, {
    backupId: string;
}>;
export declare const apiUpdateBackup: z.ZodObject<{
    serviceName: z.ZodNullable<z.ZodString>;
    metadata: z.ZodNullable<z.ZodAny>;
    enabled: z.ZodNullable<z.ZodBoolean>;
    prefix: z.ZodString;
    backupId: z.ZodString;
    databaseType: z.ZodEnum<["postgres", "mariadb", "mysql", "mongo", "web-server"]>;
    database: z.ZodString;
    schedule: z.ZodString;
    destinationId: z.ZodString;
    keepLatestCount: z.ZodNullable<z.ZodNumber>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    serviceName: string | null;
    enabled: boolean | null;
    prefix: string;
    backupId: string;
    databaseType: "mysql" | "postgres" | "mariadb" | "mongo" | "web-server";
    database: string;
    schedule: string;
    destinationId: string;
    keepLatestCount: number | null;
    metadata?: any;
}, {
    serviceName: string | null;
    enabled: boolean | null;
    prefix: string;
    backupId: string;
    databaseType: "mysql" | "postgres" | "mariadb" | "mongo" | "web-server";
    database: string;
    schedule: string;
    destinationId: string;
    keepLatestCount: number | null;
    metadata?: any;
}>;
export declare const apiRestoreBackup: z.ZodObject<{
    databaseId: z.ZodString;
    databaseType: z.ZodEnum<["postgres", "mysql", "mariadb", "mongo", "web-server"]>;
    backupType: z.ZodEnum<["database", "compose"]>;
    databaseName: z.ZodString;
    backupFile: z.ZodString;
    destinationId: z.ZodString;
    metadata: z.ZodOptional<z.ZodObject<{
        serviceName: z.ZodOptional<z.ZodString>;
        postgres: z.ZodOptional<z.ZodObject<{
            databaseUser: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            databaseUser: string;
        }, {
            databaseUser: string;
        }>>;
        mariadb: z.ZodOptional<z.ZodObject<{
            databaseUser: z.ZodString;
            databasePassword: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            databaseUser: string;
            databasePassword: string;
        }, {
            databaseUser: string;
            databasePassword: string;
        }>>;
        mongo: z.ZodOptional<z.ZodObject<{
            databaseUser: z.ZodString;
            databasePassword: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            databaseUser: string;
            databasePassword: string;
        }, {
            databaseUser: string;
            databasePassword: string;
        }>>;
        mysql: z.ZodOptional<z.ZodObject<{
            databaseRootPassword: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            databaseRootPassword: string;
        }, {
            databaseRootPassword: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        serviceName?: string | undefined;
        mysql?: {
            databaseRootPassword: string;
        } | undefined;
        postgres?: {
            databaseUser: string;
        } | undefined;
        mariadb?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
        mongo?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
    }, {
        serviceName?: string | undefined;
        mysql?: {
            databaseRootPassword: string;
        } | undefined;
        postgres?: {
            databaseUser: string;
        } | undefined;
        mariadb?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
        mongo?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    databaseName: string;
    databaseType: "mysql" | "postgres" | "mariadb" | "mongo" | "web-server";
    backupType: "compose" | "database";
    destinationId: string;
    databaseId: string;
    backupFile: string;
    metadata?: {
        serviceName?: string | undefined;
        mysql?: {
            databaseRootPassword: string;
        } | undefined;
        postgres?: {
            databaseUser: string;
        } | undefined;
        mariadb?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
        mongo?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
    } | undefined;
}, {
    databaseName: string;
    databaseType: "mysql" | "postgres" | "mariadb" | "mongo" | "web-server";
    backupType: "compose" | "database";
    destinationId: string;
    databaseId: string;
    backupFile: string;
    metadata?: {
        serviceName?: string | undefined;
        mysql?: {
            databaseRootPassword: string;
        } | undefined;
        postgres?: {
            databaseUser: string;
        } | undefined;
        mariadb?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
        mongo?: {
            databaseUser: string;
            databasePassword: string;
        } | undefined;
    } | undefined;
}>;

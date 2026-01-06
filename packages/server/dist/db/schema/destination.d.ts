import { z } from "zod";
export declare const destinations: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "destination";
    schema: undefined;
    columns: {
        destinationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "destinationId";
            tableName: "destination";
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
            tableName: "destination";
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
        provider: import("drizzle-orm/pg-core").PgColumn<{
            name: "provider";
            tableName: "destination";
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
        accessKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "accessKey";
            tableName: "destination";
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
        secretAccessKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "secretAccessKey";
            tableName: "destination";
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
        bucket: import("drizzle-orm/pg-core").PgColumn<{
            name: "bucket";
            tableName: "destination";
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
        region: import("drizzle-orm/pg-core").PgColumn<{
            name: "region";
            tableName: "destination";
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
        endpoint: import("drizzle-orm/pg-core").PgColumn<{
            name: "endpoint";
            tableName: "destination";
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
            tableName: "destination";
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "destination";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
    };
    dialect: "pg";
}>;
export declare const destinationsRelations: import("drizzle-orm").Relations<"destination", {
    backups: import("drizzle-orm").Many<"backup">;
    organization: import("drizzle-orm").One<"organization", true>;
}>;
export declare const apiCreateDestination: z.ZodObject<{
    name: z.ZodString;
    provider: z.ZodNullable<z.ZodString>;
    accessKey: z.ZodString;
    secretAccessKey: z.ZodString;
    bucket: z.ZodString;
    region: z.ZodString;
    endpoint: z.ZodString;
} & {
    serverId: z.ZodOptional<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    provider: string | null;
    accessKey: string;
    secretAccessKey: string;
    bucket: string;
    region: string;
    endpoint: string;
    serverId?: string | undefined;
}, {
    name: string;
    provider: string | null;
    accessKey: string;
    secretAccessKey: string;
    bucket: string;
    region: string;
    endpoint: string;
    serverId?: string | undefined;
}>;
export declare const apiFindOneDestination: z.ZodObject<{
    destinationId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    destinationId: string;
}, {
    destinationId: string;
}>;
export declare const apiRemoveDestination: z.ZodObject<{
    destinationId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    destinationId: string;
}, {
    destinationId: string;
}>;
export declare const apiUpdateDestination: z.ZodObject<{
    name: z.ZodString;
    destinationId: z.ZodString;
    provider: z.ZodNullable<z.ZodString>;
    accessKey: z.ZodString;
    secretAccessKey: z.ZodString;
    bucket: z.ZodString;
    region: z.ZodString;
    endpoint: z.ZodString;
} & {
    serverId: z.ZodOptional<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    destinationId: string;
    provider: string | null;
    accessKey: string;
    secretAccessKey: string;
    bucket: string;
    region: string;
    endpoint: string;
    serverId?: string | undefined;
}, {
    name: string;
    destinationId: string;
    provider: string | null;
    accessKey: string;
    secretAccessKey: string;
    bucket: string;
    region: string;
    endpoint: string;
    serverId?: string | undefined;
}>;

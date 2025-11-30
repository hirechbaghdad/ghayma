import { z } from "zod";
export declare const ai: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "ai";
    schema: undefined;
    columns: {
        aiId: import("drizzle-orm/pg-core").PgColumn<{
            name: "aiId";
            tableName: "ai";
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
            tableName: "ai";
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
        apiUrl: import("drizzle-orm/pg-core").PgColumn<{
            name: "apiUrl";
            tableName: "ai";
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
        apiKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "apiKey";
            tableName: "ai";
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
        model: import("drizzle-orm/pg-core").PgColumn<{
            name: "model";
            tableName: "ai";
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
        isEnabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "isEnabled";
            tableName: "ai";
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
        organizationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "organizationId";
            tableName: "ai";
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
            tableName: "ai";
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
    };
    dialect: "pg";
}>;
export declare const aiRelations: import("drizzle-orm").Relations<"ai", {
    organization: import("drizzle-orm").One<"organization", true>;
}>;
export declare const apiCreateAi: z.ZodObject<{
    name: z.ZodString;
    apiUrl: z.ZodString;
    apiKey: z.ZodString;
    model: z.ZodString;
    isEnabled: z.ZodBoolean;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    apiUrl: string;
    apiKey: string;
    model: string;
    isEnabled: boolean;
}, {
    name: string;
    apiUrl: string;
    apiKey: string;
    model: string;
    isEnabled: boolean;
}>;
export declare const apiUpdateAi: z.ZodObject<Omit<{
    name: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    organizationId: z.ZodOptional<z.ZodString>;
    apiUrl: z.ZodOptional<z.ZodString>;
    apiKey: z.ZodOptional<z.ZodString>;
    model: z.ZodOptional<z.ZodString>;
    isEnabled: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodBoolean>>>;
} & {
    aiId: z.ZodString;
}, "organizationId">, z.UnknownKeysParam, z.ZodTypeAny, {
    aiId: string;
    name?: string | undefined;
    createdAt?: string | undefined;
    apiUrl?: string | undefined;
    apiKey?: string | undefined;
    model?: string | undefined;
    isEnabled?: boolean | undefined;
}, {
    aiId: string;
    name?: string | undefined;
    createdAt?: string | undefined;
    apiUrl?: string | undefined;
    apiKey?: string | undefined;
    model?: string | undefined;
    isEnabled?: boolean | undefined;
}>;
export declare const deploySuggestionSchema: z.ZodObject<{
    environmentId: z.ZodString;
    id: z.ZodString;
    dockerCompose: z.ZodString;
    envVariables: z.ZodString;
    serverId: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    description: z.ZodString;
    domains: z.ZodOptional<z.ZodArray<z.ZodObject<{
        host: z.ZodString;
        port: z.ZodNumber;
        serviceName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        host: string;
        port: number;
        serviceName: string;
    }, {
        host: string;
        port: number;
        serviceName: string;
    }>, "many">>;
    configFiles: z.ZodOptional<z.ZodArray<z.ZodObject<{
        filePath: z.ZodString;
        content: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        filePath: string;
        content: string;
    }, {
        filePath: string;
        content: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    description: string;
    id: string;
    environmentId: string;
    dockerCompose: string;
    envVariables: string;
    serverId?: string | undefined;
    domains?: {
        host: string;
        port: number;
        serviceName: string;
    }[] | undefined;
    configFiles?: {
        filePath: string;
        content: string;
    }[] | undefined;
}, {
    name: string;
    description: string;
    id: string;
    environmentId: string;
    dockerCompose: string;
    envVariables: string;
    serverId?: string | undefined;
    domains?: {
        host: string;
        port: number;
        serviceName: string;
    }[] | undefined;
    configFiles?: {
        filePath: string;
        content: string;
    }[] | undefined;
}>;

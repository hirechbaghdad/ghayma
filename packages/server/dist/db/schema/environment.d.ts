import { z } from "zod";
export declare const environments: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "environment";
    schema: undefined;
    columns: {
        environmentId: import("drizzle-orm/pg-core").PgColumn<{
            name: "environmentId";
            tableName: "environment";
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
            tableName: "environment";
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
            tableName: "environment";
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "environment";
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
        env: import("drizzle-orm/pg-core").PgColumn<{
            name: "env";
            tableName: "environment";
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
        projectId: import("drizzle-orm/pg-core").PgColumn<{
            name: "projectId";
            tableName: "environment";
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
    };
    dialect: "pg";
}>;
export declare const environmentRelations: import("drizzle-orm").Relations<"environment", {
    project: import("drizzle-orm").One<"project", true>;
    applications: import("drizzle-orm").Many<"application">;
    mariadb: import("drizzle-orm").Many<"mariadb">;
    postgres: import("drizzle-orm").Many<"postgres">;
    mysql: import("drizzle-orm").Many<"mysql">;
    redis: import("drizzle-orm").Many<"redis">;
    mongo: import("drizzle-orm").Many<"mongo">;
    compose: import("drizzle-orm").Many<"compose">;
}>;
export declare const apiCreateEnvironment: z.ZodObject<Pick<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    env: z.ZodOptional<z.ZodString>;
    environmentId: z.ZodOptional<z.ZodString>;
    projectId: z.ZodString;
}, "name" | "description" | "projectId">, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    projectId: string;
    description?: string | null | undefined;
}, {
    name: string;
    projectId: string;
    description?: string | null | undefined;
}>;
export declare const apiFindOneEnvironment: z.ZodObject<{
    environmentId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    environmentId: string;
}, {
    environmentId: string;
}>;
export declare const apiRemoveEnvironment: z.ZodObject<{
    environmentId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    environmentId: string;
}, {
    environmentId: string;
}>;
export declare const apiUpdateEnvironment: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    env: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    projectId: z.ZodOptional<z.ZodString>;
} & {
    environmentId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    environmentId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    createdAt?: string | undefined;
    env?: string | undefined;
    projectId?: string | undefined;
}, {
    environmentId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    createdAt?: string | undefined;
    env?: string | undefined;
    projectId?: string | undefined;
}>;
export declare const apiDuplicateEnvironment: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    environmentId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    environmentId: string;
    description?: string | null | undefined;
}, {
    name: string;
    environmentId: string;
    description?: string | null | undefined;
}>;

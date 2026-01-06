import { z } from "zod";
export declare const projects: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "project";
    schema: undefined;
    columns: {
        projectId: import("drizzle-orm/pg-core").PgColumn<{
            name: "projectId";
            tableName: "project";
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
            tableName: "project";
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
            tableName: "project";
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
            tableName: "project";
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
        organizationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "organizationId";
            tableName: "project";
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
        env: import("drizzle-orm/pg-core").PgColumn<{
            name: "env";
            tableName: "project";
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
    };
    dialect: "pg";
}>;
export declare const projectRelations: import("drizzle-orm").Relations<"project", {
    environments: import("drizzle-orm").Many<"environment">;
    organization: import("drizzle-orm").One<"organization", true>;
}>;
export declare const apiCreateProject: z.ZodObject<Pick<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
    env: z.ZodOptional<z.ZodString>;
    projectId: z.ZodOptional<z.ZodString>;
}, "name" | "description" | "env">, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    description?: string | null | undefined;
    env?: string | undefined;
}, {
    name: string;
    description?: string | null | undefined;
    env?: string | undefined;
}>;
export declare const apiFindOneProject: z.ZodObject<{
    projectId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    projectId: string;
}, {
    projectId: string;
}>;
export declare const apiRemoveProject: z.ZodObject<{
    projectId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    projectId: string;
}, {
    projectId: string;
}>;
export declare const apiUpdateProject: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    organizationId: z.ZodOptional<z.ZodString>;
    env: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    projectId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    projectId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    createdAt?: string | undefined;
    organizationId?: string | undefined;
    env?: string | undefined;
}, {
    projectId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    createdAt?: string | undefined;
    organizationId?: string | undefined;
    env?: string | undefined;
}>;

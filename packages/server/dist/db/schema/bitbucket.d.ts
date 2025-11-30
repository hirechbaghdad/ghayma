import { z } from "zod";
export declare const bitbucket: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "bitbucket";
    schema: undefined;
    columns: {
        bitbucketId: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketId";
            tableName: "bitbucket";
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
        bitbucketUsername: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketUsername";
            tableName: "bitbucket";
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
        bitbucketEmail: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketEmail";
            tableName: "bitbucket";
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
        appPassword: import("drizzle-orm/pg-core").PgColumn<{
            name: "appPassword";
            tableName: "bitbucket";
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
        apiToken: import("drizzle-orm/pg-core").PgColumn<{
            name: "apiToken";
            tableName: "bitbucket";
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
        bitbucketWorkspaceName: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketWorkspaceName";
            tableName: "bitbucket";
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
        gitProviderId: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitProviderId";
            tableName: "bitbucket";
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
export declare const bitbucketProviderRelations: import("drizzle-orm").Relations<"bitbucket", {
    gitProvider: import("drizzle-orm").One<"git_provider", true>;
}>;
export declare const apiCreateBitbucket: z.ZodObject<{
    bitbucketId: z.ZodOptional<z.ZodString>;
} & {
    bitbucketUsername: z.ZodOptional<z.ZodString>;
    bitbucketEmail: z.ZodOptional<z.ZodString>;
    appPassword: z.ZodOptional<z.ZodString>;
    apiToken: z.ZodOptional<z.ZodString>;
    bitbucketWorkspaceName: z.ZodOptional<z.ZodString>;
    gitProviderId: z.ZodOptional<z.ZodString>;
    authId: z.ZodString;
    name: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    authId: string;
    gitProviderId?: string | undefined;
    bitbucketId?: string | undefined;
    bitbucketUsername?: string | undefined;
    bitbucketEmail?: string | undefined;
    appPassword?: string | undefined;
    apiToken?: string | undefined;
    bitbucketWorkspaceName?: string | undefined;
}, {
    name: string;
    authId: string;
    gitProviderId?: string | undefined;
    bitbucketId?: string | undefined;
    bitbucketUsername?: string | undefined;
    bitbucketEmail?: string | undefined;
    appPassword?: string | undefined;
    apiToken?: string | undefined;
    bitbucketWorkspaceName?: string | undefined;
}>;
export declare const apiFindOneBitbucket: z.ZodObject<Pick<{
    gitProviderId: z.ZodString;
    bitbucketUsername: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketEmail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    appPassword: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    apiToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketWorkspaceName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    bitbucketId: z.ZodString;
}, "bitbucketId">, z.UnknownKeysParam, z.ZodTypeAny, {
    bitbucketId: string;
}, {
    bitbucketId: string;
}>;
export declare const apiBitbucketTestConnection: z.ZodObject<Pick<{
    gitProviderId: z.ZodString;
    bitbucketWorkspaceName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    bitbucketId: z.ZodString;
    bitbucketUsername: z.ZodOptional<z.ZodString>;
    bitbucketEmail: z.ZodOptional<z.ZodString>;
    workspaceName: z.ZodOptional<z.ZodString>;
    apiToken: z.ZodOptional<z.ZodString>;
    appPassword: z.ZodOptional<z.ZodString>;
}, "bitbucketId" | "bitbucketUsername" | "bitbucketEmail" | "appPassword" | "apiToken" | "workspaceName">, z.UnknownKeysParam, z.ZodTypeAny, {
    bitbucketId: string;
    bitbucketUsername?: string | undefined;
    bitbucketEmail?: string | undefined;
    appPassword?: string | undefined;
    apiToken?: string | undefined;
    workspaceName?: string | undefined;
}, {
    bitbucketId: string;
    bitbucketUsername?: string | undefined;
    bitbucketEmail?: string | undefined;
    appPassword?: string | undefined;
    apiToken?: string | undefined;
    workspaceName?: string | undefined;
}>;
export declare const apiFindBitbucketBranches: z.ZodObject<{
    owner: z.ZodString;
    repo: z.ZodString;
    bitbucketId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    bitbucketId?: string | undefined;
}, {
    owner: string;
    repo: string;
    bitbucketId?: string | undefined;
}>;
export declare const apiUpdateBitbucket: z.ZodObject<{
    gitProviderId: z.ZodString;
} & {
    bitbucketId: z.ZodString;
    name: z.ZodString;
    bitbucketUsername: z.ZodOptional<z.ZodString>;
    bitbucketEmail: z.ZodOptional<z.ZodString>;
    appPassword: z.ZodOptional<z.ZodString>;
    apiToken: z.ZodOptional<z.ZodString>;
    bitbucketWorkspaceName: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    gitProviderId: string;
    bitbucketId: string;
    organizationId?: string | undefined;
    bitbucketUsername?: string | undefined;
    bitbucketEmail?: string | undefined;
    appPassword?: string | undefined;
    apiToken?: string | undefined;
    bitbucketWorkspaceName?: string | undefined;
}, {
    name: string;
    gitProviderId: string;
    bitbucketId: string;
    organizationId?: string | undefined;
    bitbucketUsername?: string | undefined;
    bitbucketEmail?: string | undefined;
    appPassword?: string | undefined;
    apiToken?: string | undefined;
    bitbucketWorkspaceName?: string | undefined;
}>;

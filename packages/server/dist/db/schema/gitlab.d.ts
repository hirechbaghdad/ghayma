import { z } from "zod";
export declare const gitlab: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "gitlab";
    schema: undefined;
    columns: {
        gitlabId: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabId";
            tableName: "gitlab";
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
        gitlabUrl: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabUrl";
            tableName: "gitlab";
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
        applicationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "application_id";
            tableName: "gitlab";
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
        redirectUri: import("drizzle-orm/pg-core").PgColumn<{
            name: "redirect_uri";
            tableName: "gitlab";
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
        secret: import("drizzle-orm/pg-core").PgColumn<{
            name: "secret";
            tableName: "gitlab";
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
        accessToken: import("drizzle-orm/pg-core").PgColumn<{
            name: "access_token";
            tableName: "gitlab";
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
        refreshToken: import("drizzle-orm/pg-core").PgColumn<{
            name: "refresh_token";
            tableName: "gitlab";
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
        groupName: import("drizzle-orm/pg-core").PgColumn<{
            name: "group_name";
            tableName: "gitlab";
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
        expiresAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "expires_at";
            tableName: "gitlab";
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
        gitProviderId: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitProviderId";
            tableName: "gitlab";
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
export declare const gitlabProviderRelations: import("drizzle-orm").Relations<"gitlab", {
    gitProvider: import("drizzle-orm").One<"git_provider", true>;
}>;
export declare const apiCreateGitlab: z.ZodObject<{
    accessToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresAt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    gitlabId: z.ZodOptional<z.ZodString>;
} & {
    applicationId: z.ZodOptional<z.ZodString>;
    secret: z.ZodOptional<z.ZodString>;
    groupName: z.ZodOptional<z.ZodString>;
    gitProviderId: z.ZodOptional<z.ZodString>;
    redirectUri: z.ZodOptional<z.ZodString>;
    authId: z.ZodString;
    name: z.ZodString;
    gitlabUrl: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    gitlabUrl: string;
    authId: string;
    redirectUri?: string | undefined;
    gitProviderId?: string | undefined;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    expiresAt?: number | null | undefined;
    gitlabId?: string | undefined;
    applicationId?: string | undefined;
    secret?: string | undefined;
    groupName?: string | undefined;
}, {
    name: string;
    gitlabUrl: string;
    authId: string;
    redirectUri?: string | undefined;
    gitProviderId?: string | undefined;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    expiresAt?: number | null | undefined;
    gitlabId?: string | undefined;
    applicationId?: string | undefined;
    secret?: string | undefined;
    groupName?: string | undefined;
}>;
export declare const apiFindOneGitlab: z.ZodObject<Pick<{
    redirectUri: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitProviderId: z.ZodString;
    accessToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresAt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    gitlabUrl: z.ZodOptional<z.ZodString>;
    applicationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    secret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    groupName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    gitlabId: z.ZodString;
}, "gitlabId">, z.UnknownKeysParam, z.ZodTypeAny, {
    gitlabId: string;
}, {
    gitlabId: string;
}>;
export declare const apiGitlabTestConnection: z.ZodObject<Pick<{
    redirectUri: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitProviderId: z.ZodString;
    accessToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresAt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    gitlabId: z.ZodOptional<z.ZodString>;
    gitlabUrl: z.ZodOptional<z.ZodString>;
    applicationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    secret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    groupName: z.ZodOptional<z.ZodString>;
}, "gitlabId" | "groupName">, z.UnknownKeysParam, z.ZodTypeAny, {
    gitlabId?: string | undefined;
    groupName?: string | undefined;
}, {
    gitlabId?: string | undefined;
    groupName?: string | undefined;
}>;
export declare const apiFindGitlabBranches: z.ZodObject<{
    id: z.ZodOptional<z.ZodNumber>;
    owner: z.ZodString;
    repo: z.ZodString;
    gitlabId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    id?: number | undefined;
    gitlabId?: string | undefined;
}, {
    owner: string;
    repo: string;
    id?: number | undefined;
    gitlabId?: string | undefined;
}>;
export declare const apiUpdateGitlab: z.ZodObject<{
    gitProviderId: z.ZodString;
    accessToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    expiresAt: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
} & {
    applicationId: z.ZodOptional<z.ZodString>;
    secret: z.ZodOptional<z.ZodString>;
    groupName: z.ZodOptional<z.ZodString>;
    redirectUri: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    gitlabId: z.ZodString;
    gitlabUrl: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    gitProviderId: string;
    gitlabId: string;
    gitlabUrl: string;
    redirectUri?: string | undefined;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    expiresAt?: number | null | undefined;
    applicationId?: string | undefined;
    secret?: string | undefined;
    groupName?: string | undefined;
}, {
    name: string;
    gitProviderId: string;
    gitlabId: string;
    gitlabUrl: string;
    redirectUri?: string | undefined;
    accessToken?: string | null | undefined;
    refreshToken?: string | null | undefined;
    expiresAt?: number | null | undefined;
    applicationId?: string | undefined;
    secret?: string | undefined;
    groupName?: string | undefined;
}>;

import { z } from "zod";
export declare const github: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "github";
    schema: undefined;
    columns: {
        githubId: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubId";
            tableName: "github";
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
        githubAppName: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubAppName";
            tableName: "github";
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
        githubAppId: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubAppId";
            tableName: "github";
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
        githubClientId: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubClientId";
            tableName: "github";
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
        githubClientSecret: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubClientSecret";
            tableName: "github";
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
        githubInstallationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubInstallationId";
            tableName: "github";
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
        githubPrivateKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubPrivateKey";
            tableName: "github";
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
        githubWebhookSecret: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubWebhookSecret";
            tableName: "github";
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
            tableName: "github";
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
export declare const githubProviderRelations: import("drizzle-orm").Relations<"github", {
    gitProvider: import("drizzle-orm").One<"git_provider", true>;
}>;
export declare const apiCreateGithub: z.ZodObject<{
    githubId: z.ZodOptional<z.ZodString>;
} & {
    githubAppName: z.ZodOptional<z.ZodString>;
    githubAppId: z.ZodOptional<z.ZodNumber>;
    githubClientId: z.ZodOptional<z.ZodString>;
    githubClientSecret: z.ZodOptional<z.ZodString>;
    githubInstallationId: z.ZodOptional<z.ZodString>;
    githubPrivateKey: z.ZodOptional<z.ZodString>;
    githubWebhookSecret: z.ZodNullable<z.ZodString>;
    gitProviderId: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    githubWebhookSecret: string | null;
    gitProviderId?: string | undefined;
    githubId?: string | undefined;
    githubAppName?: string | undefined;
    githubAppId?: number | undefined;
    githubClientId?: string | undefined;
    githubClientSecret?: string | undefined;
    githubInstallationId?: string | undefined;
    githubPrivateKey?: string | undefined;
}, {
    name: string;
    githubWebhookSecret: string | null;
    gitProviderId?: string | undefined;
    githubId?: string | undefined;
    githubAppName?: string | undefined;
    githubAppId?: number | undefined;
    githubClientId?: string | undefined;
    githubClientSecret?: string | undefined;
    githubInstallationId?: string | undefined;
    githubPrivateKey?: string | undefined;
}>;
export declare const apiFindGithubBranches: z.ZodObject<{
    repo: z.ZodString;
    owner: z.ZodString;
    githubId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    owner: string;
    repo: string;
    githubId?: string | undefined;
}, {
    owner: string;
    repo: string;
    githubId?: string | undefined;
}>;
export declare const apiFindOneGithub: z.ZodObject<Pick<{
    gitProviderId: z.ZodString;
    githubAppName: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubAppId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    githubClientId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubClientSecret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubInstallationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubPrivateKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubWebhookSecret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    githubId: z.ZodString;
}, "githubId">, z.UnknownKeysParam, z.ZodTypeAny, {
    githubId: string;
}, {
    githubId: string;
}>;
export declare const apiUpdateGithub: z.ZodObject<{
    githubAppId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    githubClientId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubClientSecret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubInstallationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubPrivateKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubWebhookSecret: z.ZodOptional<z.ZodNullable<z.ZodString>>;
} & {
    githubId: z.ZodString;
    name: z.ZodString;
    gitProviderId: z.ZodString;
    githubAppName: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    gitProviderId: string;
    githubId: string;
    githubAppName: string;
    githubAppId?: number | null | undefined;
    githubClientId?: string | null | undefined;
    githubClientSecret?: string | null | undefined;
    githubInstallationId?: string | null | undefined;
    githubPrivateKey?: string | null | undefined;
    githubWebhookSecret?: string | null | undefined;
}, {
    name: string;
    gitProviderId: string;
    githubId: string;
    githubAppName: string;
    githubAppId?: number | null | undefined;
    githubClientId?: string | null | undefined;
    githubClientSecret?: string | null | undefined;
    githubInstallationId?: string | null | undefined;
    githubPrivateKey?: string | null | undefined;
    githubWebhookSecret?: string | null | undefined;
}>;

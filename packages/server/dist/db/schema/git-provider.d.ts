import { z } from "zod";
export declare const gitProviderType: import("drizzle-orm/pg-core").PgEnum<["github", "gitlab", "bitbucket", "gitea"]>;
export declare const gitProvider: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "git_provider";
    schema: undefined;
    columns: {
        gitProviderId: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitProviderId";
            tableName: "git_provider";
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
            tableName: "git_provider";
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
        providerType: import("drizzle-orm/pg-core").PgColumn<{
            name: "providerType";
            tableName: "git_provider";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "gitea" | "github" | "gitlab" | "bitbucket";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["github", "gitlab", "bitbucket", "gitea"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "git_provider";
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
            tableName: "git_provider";
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
        userId: import("drizzle-orm/pg-core").PgColumn<{
            name: "userId";
            tableName: "git_provider";
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
export declare const gitProviderRelations: import("drizzle-orm").Relations<"git_provider", {
    github: import("drizzle-orm").One<"github", true>;
    gitlab: import("drizzle-orm").One<"gitlab", true>;
    bitbucket: import("drizzle-orm").One<"bitbucket", true>;
    gitea: import("drizzle-orm").One<"gitea", true>;
    organization: import("drizzle-orm").One<"organization", true>;
    user: import("drizzle-orm").One<"user", true>;
}>;
export declare const apiRemoveGitProvider: z.ZodObject<Pick<{
    name: z.ZodString;
    providerType: z.ZodOptional<z.ZodEnum<["github", "gitlab", "bitbucket", "gitea"]>>;
    createdAt: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodString;
    userId: z.ZodString;
} & {
    gitProviderId: z.ZodString;
}, "gitProviderId">, z.UnknownKeysParam, z.ZodTypeAny, {
    gitProviderId: string;
}, {
    gitProviderId: string;
}>;

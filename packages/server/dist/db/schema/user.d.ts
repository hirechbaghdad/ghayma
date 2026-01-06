import { z } from "zod";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export declare const user: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "user";
    schema: undefined;
    columns: {
        id: import("drizzle-orm/pg-core").PgColumn<{
            name: "id";
            tableName: "user";
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
            tableName: "user";
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
        isRegistered: import("drizzle-orm/pg-core").PgColumn<{
            name: "isRegistered";
            tableName: "user";
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
        expirationDate: import("drizzle-orm/pg-core").PgColumn<{
            name: "expirationDate";
            tableName: "user";
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
        createdAt2: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "user";
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "created_at";
            tableName: "user";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        twoFactorEnabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "two_factor_enabled";
            tableName: "user";
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
        email: import("drizzle-orm/pg-core").PgColumn<{
            name: "email";
            tableName: "user";
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
        emailVerified: import("drizzle-orm/pg-core").PgColumn<{
            name: "email_verified";
            tableName: "user";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
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
        image: import("drizzle-orm/pg-core").PgColumn<{
            name: "image";
            tableName: "user";
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
        banned: import("drizzle-orm/pg-core").PgColumn<{
            name: "banned";
            tableName: "user";
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
        banReason: import("drizzle-orm/pg-core").PgColumn<{
            name: "ban_reason";
            tableName: "user";
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
        banExpires: import("drizzle-orm/pg-core").PgColumn<{
            name: "ban_expires";
            tableName: "user";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
        updatedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "updated_at";
            tableName: "user";
            dataType: "date";
            columnType: "PgTimestamp";
            data: Date;
            driverParam: string;
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
        serverIp: import("drizzle-orm/pg-core").PgColumn<{
            name: "serverIp";
            tableName: "user";
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
        certificateType: import("drizzle-orm/pg-core").PgColumn<{
            name: "certificateType";
            tableName: "user";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "letsencrypt" | "none" | "custom";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["letsencrypt", "none", "custom"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        https: import("drizzle-orm/pg-core").PgColumn<{
            name: "https";
            tableName: "user";
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
        host: import("drizzle-orm/pg-core").PgColumn<{
            name: "host";
            tableName: "user";
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
        letsEncryptEmail: import("drizzle-orm/pg-core").PgColumn<{
            name: "letsEncryptEmail";
            tableName: "user";
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
        sshPrivateKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "sshPrivateKey";
            tableName: "user";
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
        enableDockerCleanup: import("drizzle-orm/pg-core").PgColumn<{
            name: "enableDockerCleanup";
            tableName: "user";
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
        logCleanupCron: import("drizzle-orm/pg-core").PgColumn<{
            name: "logCleanupCron";
            tableName: "user";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        role: import("drizzle-orm/pg-core").PgColumn<{
            name: "role";
            tableName: "user";
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
        enablePaidFeatures: import("drizzle-orm/pg-core").PgColumn<{
            name: "enablePaidFeatures";
            tableName: "user";
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
        allowImpersonation: import("drizzle-orm/pg-core").PgColumn<{
            name: "allowImpersonation";
            tableName: "user";
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
        metricsConfig: import("drizzle-orm/pg-core").PgColumn<{
            name: "metricsConfig";
            tableName: "user";
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
        cleanupCacheApplications: import("drizzle-orm/pg-core").PgColumn<{
            name: "cleanupCacheApplications";
            tableName: "user";
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
        cleanupCacheOnPreviews: import("drizzle-orm/pg-core").PgColumn<{
            name: "cleanupCacheOnPreviews";
            tableName: "user";
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
        cleanupCacheOnCompose: import("drizzle-orm/pg-core").PgColumn<{
            name: "cleanupCacheOnCompose";
            tableName: "user";
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
        stripeCustomerId: import("drizzle-orm/pg-core").PgColumn<{
            name: "stripeCustomerId";
            tableName: "user";
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
        stripeSubscriptionId: import("drizzle-orm/pg-core").PgColumn<{
            name: "stripeSubscriptionId";
            tableName: "user";
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
        serversQuantity: import("drizzle-orm/pg-core").PgColumn<{
            name: "serversQuantity";
            tableName: "user";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
export declare const usersRelations: import("drizzle-orm").Relations<"user", {
    account: import("drizzle-orm").One<"account", true>;
    organizations: import("drizzle-orm").Many<"organization">;
    projects: import("drizzle-orm").Many<"project">;
    apiKeys: import("drizzle-orm").Many<"apikey">;
    backups: import("drizzle-orm").Many<"backup">;
    schedules: import("drizzle-orm").Many<"schedule">;
}>;
export declare const apiCreateUserInvitation: z.ZodObject<Pick<Omit<{
    host: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    https: z.ZodOptional<z.ZodBoolean>;
    certificateType: z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>;
    name: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    id: z.ZodOptional<z.ZodString>;
    isRegistered: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    expirationDate: z.ZodOptional<z.ZodString>;
    createdAt2: z.ZodOptional<z.ZodString>;
    twoFactorEnabled: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    email: z.ZodString;
    emailVerified: z.ZodBoolean;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    banned: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    banReason: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    banExpires: z.ZodOptional<z.ZodNullable<z.ZodDate>>;
    updatedAt: z.ZodDate;
    serverIp: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    letsEncryptEmail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sshPrivateKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enableDockerCleanup: z.ZodOptional<z.ZodBoolean>;
    logCleanupCron: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    role: z.ZodOptional<z.ZodString>;
    enablePaidFeatures: z.ZodOptional<z.ZodBoolean>;
    allowImpersonation: z.ZodOptional<z.ZodBoolean>;
    metricsConfig: z.ZodOptional<z.ZodType<string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null, z.ZodTypeDef, string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | (string | number | boolean | /*elided*/ any | /*elided*/ any | null)[] | null;
    } | (string | number | boolean | {
        [key: string]: string | number | boolean | /*elided*/ any | /*elided*/ any | null;
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null>>;
    cleanupCacheApplications: z.ZodOptional<z.ZodBoolean>;
    cleanupCacheOnPreviews: z.ZodOptional<z.ZodBoolean>;
    cleanupCacheOnCompose: z.ZodOptional<z.ZodBoolean>;
    stripeCustomerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    stripeSubscriptionId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    serversQuantity: z.ZodOptional<z.ZodNumber>;
}, "role">, never> & {
    email: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    email: string;
}, {
    email: string;
}>;
export declare const apiRemoveUser: z.ZodObject<{
    id: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const apiFindOneToken: z.ZodObject<{} & {
    token: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
export declare const apiAssignPermissions: z.ZodObject<{
    id: z.ZodString;
    accessedProjects: z.ZodArray<z.ZodString, "many">;
    accessedEnvironments: z.ZodArray<z.ZodString, "many">;
    accessedServices: z.ZodArray<z.ZodString, "many">;
    canCreateProjects: z.ZodBoolean;
    canCreateServices: z.ZodBoolean;
    canDeleteProjects: z.ZodBoolean;
    canDeleteServices: z.ZodBoolean;
    canAccessToDocker: z.ZodBoolean;
    canAccessToTraefikFiles: z.ZodBoolean;
    canAccessToAPI: z.ZodBoolean;
    canAccessToSSHKeys: z.ZodBoolean;
    canAccessToGitProviders: z.ZodBoolean;
    canDeleteEnvironments: z.ZodBoolean;
    canCreateEnvironments: z.ZodBoolean;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
    canCreateProjects: boolean;
    canAccessToSSHKeys: boolean;
    canCreateServices: boolean;
    canDeleteProjects: boolean;
    canDeleteServices: boolean;
    canAccessToDocker: boolean;
    canAccessToAPI: boolean;
    canAccessToGitProviders: boolean;
    canAccessToTraefikFiles: boolean;
    canDeleteEnvironments: boolean;
    canCreateEnvironments: boolean;
    accessedProjects: string[];
    accessedEnvironments: string[];
    accessedServices: string[];
}, {
    id: string;
    canCreateProjects: boolean;
    canAccessToSSHKeys: boolean;
    canCreateServices: boolean;
    canDeleteProjects: boolean;
    canDeleteServices: boolean;
    canAccessToDocker: boolean;
    canAccessToAPI: boolean;
    canAccessToGitProviders: boolean;
    canAccessToTraefikFiles: boolean;
    canDeleteEnvironments: boolean;
    canCreateEnvironments: boolean;
    accessedProjects: string[];
    accessedEnvironments: string[];
    accessedServices: string[];
}>;
export declare const apiFindOneUser: z.ZodObject<{
    id: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const apiFindOneUserByAuth: z.ZodObject<{}, z.UnknownKeysParam, z.ZodTypeAny, {}, {}>;
export declare const apiSaveSSHKey: z.ZodObject<{
    sshPrivateKey: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    sshPrivateKey: string | null;
}, {
    sshPrivateKey: string | null;
}>;
export declare const apiAssignDomain: z.ZodObject<{
    host: z.ZodNullable<z.ZodString>;
    https: z.ZodOptional<z.ZodBoolean>;
    certificateType: z.ZodEnum<["letsencrypt", "none", "custom"]>;
    letsEncryptEmail: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    host: string | null;
    certificateType: "letsencrypt" | "none" | "custom";
    https?: boolean | undefined;
    letsEncryptEmail?: string | null | undefined;
}, {
    host: string | null;
    certificateType: "letsencrypt" | "none" | "custom";
    https?: boolean | undefined;
    letsEncryptEmail?: string | null | undefined;
}>;
export declare const apiUpdateDockerCleanup: z.ZodObject<{
    enableDockerCleanup: z.ZodBoolean;
} & {
    serverId: z.ZodOptional<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    enableDockerCleanup: boolean;
    serverId?: string | undefined;
}, {
    enableDockerCleanup: boolean;
    serverId?: string | undefined;
}>;
export declare const apiTraefikConfig: z.ZodObject<{
    traefikConfig: z.ZodString;
}, "strip", z.ZodTypeAny, {
    traefikConfig: string;
}, {
    traefikConfig: string;
}>;
export declare const apiModifyTraefikConfig: z.ZodObject<{
    path: z.ZodString;
    traefikConfig: z.ZodString;
    serverId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path: string;
    traefikConfig: string;
    serverId?: string | undefined;
}, {
    path: string;
    traefikConfig: string;
    serverId?: string | undefined;
}>;
export declare const apiReadTraefikConfig: z.ZodObject<{
    path: z.ZodEffects<z.ZodString, string, string>;
    serverId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path: string;
    serverId?: string | undefined;
}, {
    path: string;
    serverId?: string | undefined;
}>;
export declare const apiEnableDashboard: z.ZodObject<{
    enableDashboard: z.ZodOptional<z.ZodBoolean>;
    serverId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    serverId?: string | undefined;
    enableDashboard?: boolean | undefined;
}, {
    serverId?: string | undefined;
    enableDashboard?: boolean | undefined;
}>;
export declare const apiServerSchema: z.ZodOptional<z.ZodObject<{
    serverId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    serverId?: string | undefined;
}, {
    serverId?: string | undefined;
}>>;
export declare const apiReadStatsLogs: z.ZodObject<{
    page: z.ZodOptional<z.ZodObject<{
        pageIndex: z.ZodNumber;
        pageSize: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        pageIndex: number;
        pageSize: number;
    }, {
        pageIndex: number;
        pageSize: number;
    }>>;
    status: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    search: z.ZodOptional<z.ZodString>;
    sort: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        desc: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        desc: boolean;
    }, {
        id: string;
        desc: boolean;
    }>>;
    dateRange: z.ZodOptional<z.ZodObject<{
        start: z.ZodOptional<z.ZodString>;
        end: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        start?: string | undefined;
        end?: string | undefined;
    }, {
        start?: string | undefined;
        end?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    sort?: {
        id: string;
        desc: boolean;
    } | undefined;
    status?: string[] | undefined;
    search?: string | undefined;
    page?: {
        pageIndex: number;
        pageSize: number;
    } | undefined;
    dateRange?: {
        start?: string | undefined;
        end?: string | undefined;
    } | undefined;
}, {
    sort?: {
        id: string;
        desc: boolean;
    } | undefined;
    status?: string[] | undefined;
    search?: string | undefined;
    page?: {
        pageIndex: number;
        pageSize: number;
    } | undefined;
    dateRange?: {
        start?: string | undefined;
        end?: string | undefined;
    } | undefined;
}>;
export declare const apiUpdateWebServerMonitoring: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
export declare const apiUpdateUser: z.ZodObject<{
    host: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    https: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    certificateType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodDate>>>;
    id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isRegistered: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodBoolean>>>;
    expirationDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    createdAt2: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    twoFactorEnabled: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    emailVerified: z.ZodOptional<z.ZodBoolean>;
    image: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    banned: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    banReason: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    banExpires: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodDate>>>;
    updatedAt: z.ZodOptional<z.ZodDate>;
    serverIp: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    letsEncryptEmail: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    sshPrivateKey: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    enableDockerCleanup: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    enablePaidFeatures: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    allowImpersonation: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    cleanupCacheApplications: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    cleanupCacheOnPreviews: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    cleanupCacheOnCompose: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    stripeCustomerId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    stripeSubscriptionId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    serversQuantity: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
} & {
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    currentPassword: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    metricsConfig: z.ZodOptional<z.ZodObject<{
        server: z.ZodObject<{
            type: z.ZodEnum<["Dokploy", "Remote"]>;
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
            type: "Dokploy" | "Remote";
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
            type: "Dokploy" | "Remote";
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
                include: z.ZodArray<z.ZodString, "many">;
                exclude: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                include: string[];
                exclude: string[];
            }, {
                include: string[];
                exclude: string[];
            }>;
        }, "strip", z.ZodTypeAny, {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        }, {
            refreshRate: number;
            services: {
                include: string[];
                exclude: string[];
            };
        }>;
    }, "strip", z.ZodTypeAny, {
        server: {
            port: number;
            type: "Dokploy" | "Remote";
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
                include: string[];
                exclude: string[];
            };
        };
    }, {
        server: {
            port: number;
            type: "Dokploy" | "Remote";
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
                include: string[];
                exclude: string[];
            };
        };
    }>>;
    logCleanupCron: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    host?: string | null | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
    name?: string | undefined;
    createdAt?: Date | null | undefined;
    id?: string | undefined;
    isRegistered?: boolean | undefined;
    expirationDate?: string | undefined;
    createdAt2?: string | undefined;
    twoFactorEnabled?: boolean | null | undefined;
    email?: string | undefined;
    emailVerified?: boolean | undefined;
    image?: string | null | undefined;
    banned?: boolean | null | undefined;
    banReason?: string | null | undefined;
    banExpires?: Date | null | undefined;
    updatedAt?: Date | undefined;
    serverIp?: string | null | undefined;
    letsEncryptEmail?: string | null | undefined;
    sshPrivateKey?: string | null | undefined;
    enableDockerCleanup?: boolean | undefined;
    logCleanupCron?: string | null | undefined;
    enablePaidFeatures?: boolean | undefined;
    allowImpersonation?: boolean | undefined;
    metricsConfig?: {
        server: {
            port: number;
            type: "Dokploy" | "Remote";
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
                include: string[];
                exclude: string[];
            };
        };
    } | undefined;
    cleanupCacheApplications?: boolean | undefined;
    cleanupCacheOnPreviews?: boolean | undefined;
    cleanupCacheOnCompose?: boolean | undefined;
    stripeCustomerId?: string | null | undefined;
    stripeSubscriptionId?: string | null | undefined;
    serversQuantity?: number | undefined;
    password?: string | undefined;
    currentPassword?: string | undefined;
}, {
    host?: string | null | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
    name?: string | undefined;
    createdAt?: Date | null | undefined;
    id?: string | undefined;
    isRegistered?: boolean | undefined;
    expirationDate?: string | undefined;
    createdAt2?: string | undefined;
    twoFactorEnabled?: boolean | null | undefined;
    email?: string | undefined;
    emailVerified?: boolean | undefined;
    image?: string | null | undefined;
    banned?: boolean | null | undefined;
    banReason?: string | null | undefined;
    banExpires?: Date | null | undefined;
    updatedAt?: Date | undefined;
    serverIp?: string | null | undefined;
    letsEncryptEmail?: string | null | undefined;
    sshPrivateKey?: string | null | undefined;
    enableDockerCleanup?: boolean | undefined;
    logCleanupCron?: string | null | undefined;
    enablePaidFeatures?: boolean | undefined;
    allowImpersonation?: boolean | undefined;
    metricsConfig?: {
        server: {
            port: number;
            type: "Dokploy" | "Remote";
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
                include: string[];
                exclude: string[];
            };
        };
    } | undefined;
    cleanupCacheApplications?: boolean | undefined;
    cleanupCacheOnPreviews?: boolean | undefined;
    cleanupCacheOnCompose?: boolean | undefined;
    stripeCustomerId?: string | null | undefined;
    stripeSubscriptionId?: string | null | undefined;
    serversQuantity?: number | undefined;
    password?: string | undefined;
    currentPassword?: string | undefined;
}>;

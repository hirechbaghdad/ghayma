import { z } from "zod";
export declare const certificates: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "certificate";
    schema: undefined;
    columns: {
        certificateId: import("drizzle-orm/pg-core").PgColumn<{
            name: "certificateId";
            tableName: "certificate";
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
            tableName: "certificate";
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
        certificateData: import("drizzle-orm/pg-core").PgColumn<{
            name: "certificateData";
            tableName: "certificate";
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
        privateKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "privateKey";
            tableName: "certificate";
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
        certificatePath: import("drizzle-orm/pg-core").PgColumn<{
            name: "certificatePath";
            tableName: "certificate";
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
        autoRenew: import("drizzle-orm/pg-core").PgColumn<{
            name: "autoRenew";
            tableName: "certificate";
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
        organizationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "organizationId";
            tableName: "certificate";
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
        serverId: import("drizzle-orm/pg-core").PgColumn<{
            name: "serverId";
            tableName: "certificate";
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
    };
    dialect: "pg";
}>;
export declare const certificatesRelations: import("drizzle-orm").Relations<"certificate", {
    server: import("drizzle-orm").One<"server", false>;
    organization: import("drizzle-orm").One<"organization", true>;
}>;
export declare const apiCreateCertificate: z.ZodObject<{
    name: z.ZodString;
    privateKey: z.ZodString;
    organizationId: z.ZodString;
    serverId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    certificateId: z.ZodOptional<z.ZodString>;
    certificateData: z.ZodString;
    certificatePath: z.ZodOptional<z.ZodString>;
    autoRenew: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    privateKey: string;
    organizationId: string;
    certificateData: string;
    serverId?: string | null | undefined;
    certificateId?: string | undefined;
    certificatePath?: string | undefined;
    autoRenew?: boolean | null | undefined;
}, {
    name: string;
    privateKey: string;
    organizationId: string;
    certificateData: string;
    serverId?: string | null | undefined;
    certificateId?: string | undefined;
    certificatePath?: string | undefined;
    autoRenew?: boolean | null | undefined;
}>;
export declare const apiFindCertificate: z.ZodObject<{
    certificateId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    certificateId: string;
}, {
    certificateId: string;
}>;
export declare const apiUpdateCertificate: z.ZodObject<{
    certificateId: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    certificateData: z.ZodOptional<z.ZodString>;
    privateKey: z.ZodOptional<z.ZodString>;
    autoRenew: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    certificateId: string;
    name?: string | undefined;
    privateKey?: string | undefined;
    certificateData?: string | undefined;
    autoRenew?: boolean | undefined;
}, {
    certificateId: string;
    name?: string | undefined;
    privateKey?: string | undefined;
    certificateData?: string | undefined;
    autoRenew?: boolean | undefined;
}>;
export declare const apiDeleteCertificate: z.ZodObject<{
    certificateId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    certificateId: string;
}, {
    certificateId: string;
}>;

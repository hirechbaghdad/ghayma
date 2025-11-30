import { z } from "zod";
export declare const redirects: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "redirect";
    schema: undefined;
    columns: {
        redirectId: import("drizzle-orm/pg-core").PgColumn<{
            name: "redirectId";
            tableName: "redirect";
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
        regex: import("drizzle-orm/pg-core").PgColumn<{
            name: "regex";
            tableName: "redirect";
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
        replacement: import("drizzle-orm/pg-core").PgColumn<{
            name: "replacement";
            tableName: "redirect";
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
        permanent: import("drizzle-orm/pg-core").PgColumn<{
            name: "permanent";
            tableName: "redirect";
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
        uniqueConfigKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "uniqueConfigKey";
            tableName: "redirect";
            dataType: "number";
            columnType: "PgSerial";
            data: number;
            driverParam: number;
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "redirect";
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
        applicationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "applicationId";
            tableName: "redirect";
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
export declare const redirectRelations: import("drizzle-orm").Relations<"redirect", {
    application: import("drizzle-orm").One<"application", true>;
}>;
export declare const apiFindOneRedirect: z.ZodObject<{
    redirectId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    redirectId: string;
}, {
    redirectId: string;
}>;
export declare const apiCreateRedirect: z.ZodObject<{
    applicationId: z.ZodString;
    regex: z.ZodString;
    replacement: z.ZodString;
    permanent: z.ZodBoolean;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    regex: string;
    replacement: string;
    permanent: boolean;
}, {
    applicationId: string;
    regex: string;
    replacement: string;
    permanent: boolean;
}>;
export declare const apiUpdateRedirect: z.ZodObject<{
    redirectId: z.ZodString;
    regex: z.ZodString;
    replacement: z.ZodString;
    permanent: z.ZodBoolean;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    redirectId: string;
    regex: string;
    replacement: string;
    permanent: boolean;
}, {
    redirectId: string;
    regex: string;
    replacement: string;
    permanent: boolean;
}>;

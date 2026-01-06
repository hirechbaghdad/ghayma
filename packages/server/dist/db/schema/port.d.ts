import { z } from "zod";
export declare const protocolType: import("drizzle-orm/pg-core").PgEnum<["tcp", "udp"]>;
export declare const publishModeType: import("drizzle-orm/pg-core").PgEnum<["ingress", "host"]>;
export declare const ports: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "port";
    schema: undefined;
    columns: {
        portId: import("drizzle-orm/pg-core").PgColumn<{
            name: "portId";
            tableName: "port";
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
        publishedPort: import("drizzle-orm/pg-core").PgColumn<{
            name: "publishedPort";
            tableName: "port";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        publishMode: import("drizzle-orm/pg-core").PgColumn<{
            name: "publishMode";
            tableName: "port";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "host" | "ingress";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["ingress", "host"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        targetPort: import("drizzle-orm/pg-core").PgColumn<{
            name: "targetPort";
            tableName: "port";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        protocol: import("drizzle-orm/pg-core").PgColumn<{
            name: "protocol";
            tableName: "port";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "tcp" | "udp";
            driverParam: string;
            notNull: true;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["tcp", "udp"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        applicationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "applicationId";
            tableName: "port";
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
export declare const portsRelations: import("drizzle-orm").Relations<"port", {
    application: import("drizzle-orm").One<"application", true>;
}>;
export declare const apiCreatePort: z.ZodObject<{
    applicationId: z.ZodString;
    publishedPort: z.ZodNumber;
    publishMode: z.ZodDefault<z.ZodEnum<["ingress", "host"]>>;
    targetPort: z.ZodNumber;
    protocol: z.ZodDefault<z.ZodEnum<["tcp", "udp"]>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    publishedPort: number;
    publishMode: "host" | "ingress";
    targetPort: number;
    protocol: "tcp" | "udp";
}, {
    applicationId: string;
    publishedPort: number;
    targetPort: number;
    publishMode?: "host" | "ingress" | undefined;
    protocol?: "tcp" | "udp" | undefined;
}>;
export declare const apiFindOnePort: z.ZodObject<{
    portId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    portId: string;
}, {
    portId: string;
}>;
export declare const apiUpdatePort: z.ZodObject<{
    portId: z.ZodString;
    publishedPort: z.ZodNumber;
    publishMode: z.ZodDefault<z.ZodEnum<["ingress", "host"]>>;
    targetPort: z.ZodNumber;
    protocol: z.ZodDefault<z.ZodEnum<["tcp", "udp"]>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    portId: string;
    publishedPort: number;
    publishMode: "host" | "ingress";
    targetPort: number;
    protocol: "tcp" | "udp";
}, {
    portId: string;
    publishedPort: number;
    targetPort: number;
    publishMode?: "host" | "ingress" | undefined;
    protocol?: "tcp" | "udp" | undefined;
}>;

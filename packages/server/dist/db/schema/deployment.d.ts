import { z } from "zod";
export declare const deploymentStatus: import("drizzle-orm/pg-core").PgEnum<["running", "done", "error", "cancelled"]>;
export declare const deployments: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "deployment";
    schema: undefined;
    columns: {
        deploymentId: import("drizzle-orm/pg-core").PgColumn<{
            name: "deploymentId";
            tableName: "deployment";
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
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "deployment";
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
            tableName: "deployment";
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
        status: import("drizzle-orm/pg-core").PgColumn<{
            name: "status";
            tableName: "deployment";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "running" | "done" | "error" | "cancelled";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["running", "done", "error", "cancelled"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        logPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "logPath";
            tableName: "deployment";
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
        pid: import("drizzle-orm/pg-core").PgColumn<{
            name: "pid";
            tableName: "deployment";
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
        applicationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "applicationId";
            tableName: "deployment";
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
        composeId: import("drizzle-orm/pg-core").PgColumn<{
            name: "composeId";
            tableName: "deployment";
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
        serverId: import("drizzle-orm/pg-core").PgColumn<{
            name: "serverId";
            tableName: "deployment";
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
        isPreviewDeployment: import("drizzle-orm/pg-core").PgColumn<{
            name: "isPreviewDeployment";
            tableName: "deployment";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
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
        previewDeploymentId: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewDeploymentId";
            tableName: "deployment";
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
            tableName: "deployment";
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
        startedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "startedAt";
            tableName: "deployment";
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
        finishedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "finishedAt";
            tableName: "deployment";
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
        errorMessage: import("drizzle-orm/pg-core").PgColumn<{
            name: "errorMessage";
            tableName: "deployment";
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
        scheduleId: import("drizzle-orm/pg-core").PgColumn<{
            name: "scheduleId";
            tableName: "deployment";
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
        backupId: import("drizzle-orm/pg-core").PgColumn<{
            name: "backupId";
            tableName: "deployment";
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
        rollbackId: import("drizzle-orm/pg-core").PgColumn<{
            name: "rollbackId";
            tableName: "deployment";
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
        volumeBackupId: import("drizzle-orm/pg-core").PgColumn<{
            name: "volumeBackupId";
            tableName: "deployment";
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
export declare const deploymentsRelations: import("drizzle-orm").Relations<"deployment", {
    application: import("drizzle-orm").One<"application", false>;
    compose: import("drizzle-orm").One<"compose", false>;
    server: import("drizzle-orm").One<"server", false>;
    previewDeployment: import("drizzle-orm").One<"preview_deployments", false>;
    schedule: import("drizzle-orm").One<"schedule", false>;
    backup: import("drizzle-orm").One<"backup", false>;
    rollback: import("drizzle-orm").One<"rollback", true>;
    volumeBackup: import("drizzle-orm").One<"volume_backup", false>;
}>;
export declare const apiCreateDeployment: z.ZodObject<{
    status: z.ZodOptional<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodString;
    previewDeploymentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    logPath: z.ZodString;
} & {
    applicationId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    title: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
    previewDeploymentId?: string | null | undefined;
}, {
    applicationId: string;
    title: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
    previewDeploymentId?: string | null | undefined;
}>;
export declare const apiCreateDeploymentPreview: z.ZodObject<{
    status: z.ZodOptional<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodString;
    logPath: z.ZodString;
} & {
    previewDeploymentId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    title: string;
    previewDeploymentId: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}, {
    title: string;
    previewDeploymentId: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}>;
export declare const apiCreateDeploymentCompose: z.ZodObject<{
    status: z.ZodOptional<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodString;
    logPath: z.ZodString;
} & {
    composeId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    composeId: string;
    title: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}, {
    composeId: string;
    title: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}>;
export declare const apiCreateDeploymentBackup: z.ZodObject<{
    status: z.ZodOptional<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodString;
    logPath: z.ZodString;
} & {
    backupId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    title: string;
    logPath: string;
    backupId: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}, {
    title: string;
    logPath: string;
    backupId: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}>;
export declare const apiCreateDeploymentServer: z.ZodObject<{
    status: z.ZodOptional<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodString;
    logPath: z.ZodString;
} & {
    serverId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    serverId: string;
    title: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}, {
    serverId: string;
    title: string;
    logPath: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}>;
export declare const apiCreateDeploymentSchedule: z.ZodObject<Pick<{
    status: z.ZodOptional<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    applicationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    composeId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    serverId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    previewDeploymentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deploymentId: z.ZodOptional<z.ZodString>;
    logPath: z.ZodString;
    pid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isPreviewDeployment: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    errorMessage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    scheduleId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    backupId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rollbackId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    volumeBackupId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "status" | "description" | "title" | "logPath"> & {
    scheduleId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    title: string;
    logPath: string;
    scheduleId: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}, {
    title: string;
    logPath: string;
    scheduleId: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}>;
export declare const apiCreateDeploymentVolumeBackup: z.ZodObject<Pick<{
    status: z.ZodOptional<z.ZodNullable<z.ZodDefault<z.ZodString>>>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    createdAt: z.ZodOptional<z.ZodString>;
    applicationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    composeId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    serverId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    previewDeploymentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deploymentId: z.ZodOptional<z.ZodString>;
    logPath: z.ZodString;
    pid: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    isPreviewDeployment: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    finishedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    errorMessage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    scheduleId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    backupId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rollbackId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    volumeBackupId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "status" | "description" | "title" | "logPath"> & {
    volumeBackupId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    title: string;
    logPath: string;
    volumeBackupId: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}, {
    title: string;
    logPath: string;
    volumeBackupId: string;
    status?: string | null | undefined;
    description?: string | null | undefined;
}>;
export declare const apiFindAllByApplication: z.ZodObject<{
    applicationId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
}, {
    applicationId: string;
}>;
export declare const apiFindAllByCompose: z.ZodObject<{
    composeId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    composeId: string;
}, {
    composeId: string;
}>;
export declare const apiFindAllByServer: z.ZodObject<{
    serverId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    serverId: string;
}, {
    serverId: string;
}>;
export declare const apiFindAllByType: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["application", "compose", "server", "schedule", "previewDeployment", "backup", "volumeBackup"]>;
}, "strip", z.ZodTypeAny, {
    type: "server" | "compose" | "application" | "previewDeployment" | "backup" | "schedule" | "volumeBackup";
    id: string;
}, {
    type: "server" | "compose" | "application" | "previewDeployment" | "backup" | "schedule" | "volumeBackup";
    id: string;
}>;

export declare const sshKeys: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "ssh-key";
    schema: undefined;
    columns: {
        sshKeyId: import("drizzle-orm/pg-core").PgColumn<{
            name: "sshKeyId";
            tableName: "ssh-key";
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
        privateKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "privateKey";
            tableName: "ssh-key";
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
        publicKey: import("drizzle-orm/pg-core").PgColumn<{
            name: "publicKey";
            tableName: "ssh-key";
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
        name: import("drizzle-orm/pg-core").PgColumn<{
            name: "name";
            tableName: "ssh-key";
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
            tableName: "ssh-key";
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
            tableName: "ssh-key";
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
        lastUsedAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "lastUsedAt";
            tableName: "ssh-key";
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
        organizationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "organizationId";
            tableName: "ssh-key";
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
export declare const sshKeysRelations: import("drizzle-orm").Relations<"ssh-key", {
    applications: import("drizzle-orm").Many<"application">;
    compose: import("drizzle-orm").Many<"compose">;
    servers: import("drizzle-orm").Many<"server">;
    organization: import("drizzle-orm").One<"organization", true>;
}>;
export declare const apiCreateSshKey: import("zod").ZodObject<{
    name: import("zod").ZodString;
    description: import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>>;
    publicKey: import("zod").ZodEffects<import("zod").ZodString, string, string>;
    organizationId: import("zod").ZodString;
} & {
    privateKey: import("zod").ZodEffects<import("zod").ZodString, string, string>;
}, "strip", import("zod").ZodTypeAny, {
    name: string;
    publicKey: string;
    privateKey: string;
    organizationId: string;
    description?: string | null | undefined;
}, {
    name: string;
    publicKey: string;
    privateKey: string;
    organizationId: string;
    description?: string | null | undefined;
}>;
export declare const apiFindOneSshKey: import("zod").ZodObject<{
    sshKeyId: import("zod").ZodString;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    sshKeyId: string;
}, {
    sshKeyId: string;
}>;
export declare const apiGenerateSSHKey: import("zod").ZodObject<{
    type: import("zod").ZodOptional<import("zod").ZodEnum<["rsa", "ed25519"]>>;
}, "strip", import("zod").ZodTypeAny, {
    type?: "rsa" | "ed25519" | undefined;
}, {
    type?: "rsa" | "ed25519" | undefined;
}>;
export declare const apiRemoveSshKey: import("zod").ZodObject<{
    sshKeyId: import("zod").ZodString;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    sshKeyId: string;
}, {
    sshKeyId: string;
}>;
export declare const apiUpdateSshKey: import("zod").ZodObject<{
    name: import("zod").ZodOptional<import("zod").ZodString>;
    description: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodOptional<import("zod").ZodString>>>>;
    lastUsedAt: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodNullable<import("zod").ZodString>>>;
} & {
    sshKeyId: import("zod").ZodString;
}, import("zod").UnknownKeysParam, import("zod").ZodTypeAny, {
    sshKeyId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    lastUsedAt?: string | null | undefined;
}, {
    sshKeyId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    lastUsedAt?: string | null | undefined;
}>;

import { z } from "zod";
import { type EndpointSpecSwarm, type HealthCheckSwarm, type LabelsSwarm, type NetworkSwarm, type PlacementSwarm, type RestartPolicySwarm, type ServiceModeSwarm, type UpdateConfigSwarm } from "./shared.js";
export declare const sourceType: import("drizzle-orm/pg-core").PgEnum<["docker", "git", "github", "gitlab", "bitbucket", "gitea", "drop"]>;
export declare const buildType: import("drizzle-orm/pg-core").PgEnum<["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"]>;
export declare const applications: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "application";
    schema: undefined;
    columns: {
        applicationId: import("drizzle-orm/pg-core").PgColumn<{
            name: "applicationId";
            tableName: "application";
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
            tableName: "application";
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
        appName: import("drizzle-orm/pg-core").PgColumn<{
            name: "appName";
            tableName: "application";
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
        description: import("drizzle-orm/pg-core").PgColumn<{
            name: "description";
            tableName: "application";
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
        env: import("drizzle-orm/pg-core").PgColumn<{
            name: "env";
            tableName: "application";
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
        previewEnv: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewEnv";
            tableName: "application";
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
        watchPaths: import("drizzle-orm/pg-core").PgColumn<{
            name: "watchPaths";
            tableName: "application";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: import("drizzle-orm").Column<{
                name: "watchPaths";
                tableName: "application";
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
            identity: undefined;
            generated: undefined;
        }, {}, {
            baseBuilder: import("drizzle-orm/pg-core").PgColumnBuilder<{
                name: "watchPaths";
                dataType: "string";
                columnType: "PgText";
                data: string;
                enumValues: [string, ...string[]];
                driverParam: string;
            }, {}, {}, import("drizzle-orm").ColumnBuilderExtraConfig>;
            size: undefined;
        }>;
        previewBuildArgs: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewBuildArgs";
            tableName: "application";
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
        previewBuildSecrets: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewBuildSecrets";
            tableName: "application";
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
        previewLabels: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewLabels";
            tableName: "application";
            dataType: "array";
            columnType: "PgArray";
            data: string[];
            driverParam: string | string[];
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: [string, ...string[]];
            baseColumn: import("drizzle-orm").Column<{
                name: "previewLabels";
                tableName: "application";
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
            identity: undefined;
            generated: undefined;
        }, {}, {
            baseBuilder: import("drizzle-orm/pg-core").PgColumnBuilder<{
                name: "previewLabels";
                dataType: "string";
                columnType: "PgText";
                data: string;
                enumValues: [string, ...string[]];
                driverParam: string;
            }, {}, {}, import("drizzle-orm").ColumnBuilderExtraConfig>;
            size: undefined;
        }>;
        previewWildcard: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewWildcard";
            tableName: "application";
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
        previewPort: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewPort";
            tableName: "application";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        previewHttps: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewHttps";
            tableName: "application";
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
        previewPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewPath";
            tableName: "application";
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
        previewCertificateType: import("drizzle-orm/pg-core").PgColumn<{
            name: "certificateType";
            tableName: "application";
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
        previewCustomCertResolver: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewCustomCertResolver";
            tableName: "application";
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
        previewLimit: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewLimit";
            tableName: "application";
            dataType: "number";
            columnType: "PgInteger";
            data: number;
            driverParam: string | number;
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
        isPreviewDeploymentsActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "isPreviewDeploymentsActive";
            tableName: "application";
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
        previewRequireCollaboratorPermissions: import("drizzle-orm/pg-core").PgColumn<{
            name: "previewRequireCollaboratorPermissions";
            tableName: "application";
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
        rollbackActive: import("drizzle-orm/pg-core").PgColumn<{
            name: "rollbackActive";
            tableName: "application";
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
        buildArgs: import("drizzle-orm/pg-core").PgColumn<{
            name: "buildArgs";
            tableName: "application";
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
        buildSecrets: import("drizzle-orm/pg-core").PgColumn<{
            name: "buildSecrets";
            tableName: "application";
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
        memoryReservation: import("drizzle-orm/pg-core").PgColumn<{
            name: "memoryReservation";
            tableName: "application";
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
        memoryLimit: import("drizzle-orm/pg-core").PgColumn<{
            name: "memoryLimit";
            tableName: "application";
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
        cpuReservation: import("drizzle-orm/pg-core").PgColumn<{
            name: "cpuReservation";
            tableName: "application";
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
        cpuLimit: import("drizzle-orm/pg-core").PgColumn<{
            name: "cpuLimit";
            tableName: "application";
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
        title: import("drizzle-orm/pg-core").PgColumn<{
            name: "title";
            tableName: "application";
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
        enabled: import("drizzle-orm/pg-core").PgColumn<{
            name: "enabled";
            tableName: "application";
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
        subtitle: import("drizzle-orm/pg-core").PgColumn<{
            name: "subtitle";
            tableName: "application";
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
        command: import("drizzle-orm/pg-core").PgColumn<{
            name: "command";
            tableName: "application";
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
            name: "refreshToken";
            tableName: "application";
            dataType: "string";
            columnType: "PgText";
            data: string;
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: [string, ...string[]];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        sourceType: import("drizzle-orm/pg-core").PgColumn<{
            name: "sourceType";
            tableName: "application";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "gitea" | "github" | "gitlab" | "bitbucket" | "git" | "docker" | "drop";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["docker", "git", "github", "gitlab", "bitbucket", "gitea", "drop"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        cleanCache: import("drizzle-orm/pg-core").PgColumn<{
            name: "cleanCache";
            tableName: "application";
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
        repository: import("drizzle-orm/pg-core").PgColumn<{
            name: "repository";
            tableName: "application";
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
        owner: import("drizzle-orm/pg-core").PgColumn<{
            name: "owner";
            tableName: "application";
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
        branch: import("drizzle-orm/pg-core").PgColumn<{
            name: "branch";
            tableName: "application";
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
        buildPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "buildPath";
            tableName: "application";
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
        triggerType: import("drizzle-orm/pg-core").PgColumn<{
            name: "triggerType";
            tableName: "application";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "push" | "tag";
            driverParam: string;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["push", "tag"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        autoDeploy: import("drizzle-orm/pg-core").PgColumn<{
            name: "autoDeploy";
            tableName: "application";
            dataType: "boolean";
            columnType: "PgBoolean";
            data: boolean;
            driverParam: boolean;
            notNull: false;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: true;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        gitlabProjectId: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabProjectId";
            tableName: "application";
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
        gitlabRepository: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabRepository";
            tableName: "application";
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
        gitlabOwner: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabOwner";
            tableName: "application";
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
        gitlabBranch: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabBranch";
            tableName: "application";
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
        gitlabBuildPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabBuildPath";
            tableName: "application";
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
        gitlabPathNamespace: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabPathNamespace";
            tableName: "application";
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
        giteaRepository: import("drizzle-orm/pg-core").PgColumn<{
            name: "giteaRepository";
            tableName: "application";
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
        giteaOwner: import("drizzle-orm/pg-core").PgColumn<{
            name: "giteaOwner";
            tableName: "application";
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
        giteaBranch: import("drizzle-orm/pg-core").PgColumn<{
            name: "giteaBranch";
            tableName: "application";
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
        giteaBuildPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "giteaBuildPath";
            tableName: "application";
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
        bitbucketRepository: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketRepository";
            tableName: "application";
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
        bitbucketOwner: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketOwner";
            tableName: "application";
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
        bitbucketBranch: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketBranch";
            tableName: "application";
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
        bitbucketBuildPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketBuildPath";
            tableName: "application";
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
        username: import("drizzle-orm/pg-core").PgColumn<{
            name: "username";
            tableName: "application";
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
        password: import("drizzle-orm/pg-core").PgColumn<{
            name: "password";
            tableName: "application";
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
        dockerImage: import("drizzle-orm/pg-core").PgColumn<{
            name: "dockerImage";
            tableName: "application";
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
        registryUrl: import("drizzle-orm/pg-core").PgColumn<{
            name: "registryUrl";
            tableName: "application";
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
        customGitUrl: import("drizzle-orm/pg-core").PgColumn<{
            name: "customGitUrl";
            tableName: "application";
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
        customGitBranch: import("drizzle-orm/pg-core").PgColumn<{
            name: "customGitBranch";
            tableName: "application";
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
        customGitBuildPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "customGitBuildPath";
            tableName: "application";
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
        customGitSSHKeyId: import("drizzle-orm/pg-core").PgColumn<{
            name: "customGitSSHKeyId";
            tableName: "application";
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
        enableSubmodules: import("drizzle-orm/pg-core").PgColumn<{
            name: "enableSubmodules";
            tableName: "application";
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
        dockerfile: import("drizzle-orm/pg-core").PgColumn<{
            name: "dockerfile";
            tableName: "application";
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
        dockerContextPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "dockerContextPath";
            tableName: "application";
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
        dockerBuildStage: import("drizzle-orm/pg-core").PgColumn<{
            name: "dockerBuildStage";
            tableName: "application";
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
        dropBuildPath: import("drizzle-orm/pg-core").PgColumn<{
            name: "dropBuildPath";
            tableName: "application";
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
        healthCheckSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "healthCheckSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: HealthCheckSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: HealthCheckSwarm;
        }>;
        restartPolicySwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "restartPolicySwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: RestartPolicySwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: RestartPolicySwarm;
        }>;
        placementSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "placementSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: PlacementSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: PlacementSwarm;
        }>;
        updateConfigSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "updateConfigSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: UpdateConfigSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: UpdateConfigSwarm;
        }>;
        rollbackConfigSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "rollbackConfigSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: UpdateConfigSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: UpdateConfigSwarm;
        }>;
        modeSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "modeSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: ServiceModeSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: ServiceModeSwarm;
        }>;
        labelsSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "labelsSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: LabelsSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: LabelsSwarm;
        }>;
        networkSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "networkSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: NetworkSwarm[];
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: NetworkSwarm[];
        }>;
        stopGracePeriodSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "stopGracePeriodSwarm";
            tableName: "application";
            dataType: "bigint";
            columnType: "PgBigInt64";
            data: bigint;
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
        endpointSpecSwarm: import("drizzle-orm/pg-core").PgColumn<{
            name: "endpointSpecSwarm";
            tableName: "application";
            dataType: "json";
            columnType: "PgJson";
            data: EndpointSpecSwarm;
            driverParam: unknown;
            notNull: false;
            hasDefault: false;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: undefined;
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {
            $type: EndpointSpecSwarm;
        }>;
        replicas: import("drizzle-orm/pg-core").PgColumn<{
            name: "replicas";
            tableName: "application";
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
        applicationStatus: import("drizzle-orm/pg-core").PgColumn<{
            name: "applicationStatus";
            tableName: "application";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "idle" | "running" | "done" | "error";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["idle", "running", "done", "error"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        buildType: import("drizzle-orm/pg-core").PgColumn<{
            name: "buildType";
            tableName: "application";
            dataType: "string";
            columnType: "PgEnumColumn";
            data: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
            driverParam: string;
            notNull: true;
            hasDefault: true;
            isPrimaryKey: false;
            isAutoincrement: false;
            hasRuntimeDefault: false;
            enumValues: ["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"];
            baseColumn: never;
            identity: undefined;
            generated: undefined;
        }, {}, {}>;
        railpackVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "railpackVersion";
            tableName: "application";
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
        herokuVersion: import("drizzle-orm/pg-core").PgColumn<{
            name: "herokuVersion";
            tableName: "application";
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
        publishDirectory: import("drizzle-orm/pg-core").PgColumn<{
            name: "publishDirectory";
            tableName: "application";
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
        isStaticSpa: import("drizzle-orm/pg-core").PgColumn<{
            name: "isStaticSpa";
            tableName: "application";
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
        createdAt: import("drizzle-orm/pg-core").PgColumn<{
            name: "createdAt";
            tableName: "application";
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
        registryId: import("drizzle-orm/pg-core").PgColumn<{
            name: "registryId";
            tableName: "application";
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
        environmentId: import("drizzle-orm/pg-core").PgColumn<{
            name: "environmentId";
            tableName: "application";
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
        githubId: import("drizzle-orm/pg-core").PgColumn<{
            name: "githubId";
            tableName: "application";
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
        gitlabId: import("drizzle-orm/pg-core").PgColumn<{
            name: "gitlabId";
            tableName: "application";
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
        giteaId: import("drizzle-orm/pg-core").PgColumn<{
            name: "giteaId";
            tableName: "application";
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
        bitbucketId: import("drizzle-orm/pg-core").PgColumn<{
            name: "bitbucketId";
            tableName: "application";
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
            tableName: "application";
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
export declare const applicationsRelations: import("drizzle-orm").Relations<"application", {
    environment: import("drizzle-orm").One<"environment", true>;
    deployments: import("drizzle-orm").Many<"deployment">;
    customGitSSHKey: import("drizzle-orm").One<"ssh-key", false>;
    domains: import("drizzle-orm").Many<"domain">;
    mounts: import("drizzle-orm").Many<"mount">;
    redirects: import("drizzle-orm").Many<"redirect">;
    security: import("drizzle-orm").Many<"security">;
    ports: import("drizzle-orm").Many<"port">;
    registry: import("drizzle-orm").One<"registry", false>;
    github: import("drizzle-orm").One<"github", false>;
    gitlab: import("drizzle-orm").One<"gitlab", false>;
    gitea: import("drizzle-orm").One<"gitea", false>;
    bitbucket: import("drizzle-orm").One<"bitbucket", false>;
    server: import("drizzle-orm").One<"server", false>;
    previewDeployments: import("drizzle-orm").Many<"preview_deployments">;
}>;
export declare const apiCreateApplication: z.ZodObject<Pick<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    giteaId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    applicationId: z.ZodOptional<z.ZodString>;
    applicationStatus: z.ZodOptional<z.ZodEnum<["idle", "running", "done", "error"]>>;
    triggerType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["push", "tag"]>>>;
    appName: z.ZodOptional<z.ZodString>;
    env: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    sourceType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["github", "docker", "git", "gitlab", "bitbucket", "gitea", "drop"]>>>;
    repository: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    branch: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    autoDeploy: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    gitlabProjectId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    gitlabRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabPathNamespace: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customGitUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitBranch: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitSSHKeyId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    command: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enableSubmodules: z.ZodOptional<z.ZodBoolean>;
    environmentId: z.ZodString;
    watchPaths: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    bitbucketId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    serverId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    username: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewEnv: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewBuildArgs: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewBuildSecrets: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewLabels: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    previewWildcard: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewPort: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    previewHttps: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    previewPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewCertificateType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>>;
    previewCustomCertResolver: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    previewLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    isPreviewDeploymentsActive: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    previewRequireCollaboratorPermissions: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    rollbackActive: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    buildArgs: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    buildSecrets: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    memoryReservation: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    memoryLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cpuReservation: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cpuLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    enabled: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    subtitle: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cleanCache: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    buildPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    gitlabBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    password: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerImage: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    registryUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitBuildPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerfile: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerContextPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dockerBuildStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dropBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    healthCheckSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Test: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Interval: z.ZodOptional<z.ZodNumber>;
        Timeout: z.ZodOptional<z.ZodNumber>;
        StartPeriod: z.ZodOptional<z.ZodNumber>;
        Retries: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }>>>>;
    restartPolicySwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Condition: z.ZodOptional<z.ZodString>;
        Delay: z.ZodOptional<z.ZodNumber>;
        MaxAttempts: z.ZodOptional<z.ZodNumber>;
        Window: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }>>>>;
    placementSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Preferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Spread: z.ZodObject<{
                SpreadDescriptor: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                SpreadDescriptor: string;
            }, {
                SpreadDescriptor: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            Spread: {
                SpreadDescriptor: string;
            };
        }, {
            Spread: {
                SpreadDescriptor: string;
            };
        }>, "many">>;
        MaxReplicas: z.ZodOptional<z.ZodNumber>;
        Platforms: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Architecture: z.ZodString;
            OS: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            Architecture: string;
            OS: string;
        }, {
            Architecture: string;
            OS: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }>>>>;
    updateConfigSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>;
    rollbackConfigSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>;
    modeSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Replicated: z.ZodOptional<z.ZodObject<{
            Replicas: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            Replicas?: number | undefined;
        }, {
            Replicas?: number | undefined;
        }>>;
        Global: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        ReplicatedJob: z.ZodOptional<z.ZodObject<{
            MaxConcurrent: z.ZodOptional<z.ZodNumber>;
            TotalCompletions: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }>>;
        GlobalJob: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }>>>>;
    labelsSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>>;
    networkSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodArray<z.ZodObject<{
        Target: z.ZodOptional<z.ZodString>;
        Aliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        DriverOpts: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }>, "many">>>>;
    stopGracePeriodSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodBigInt>>>;
    endpointSpecSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Mode: z.ZodOptional<z.ZodString>;
        Ports: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Protocol: z.ZodOptional<z.ZodString>;
            TargetPort: z.ZodOptional<z.ZodNumber>;
            PublishedPort: z.ZodOptional<z.ZodNumber>;
            PublishMode: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }>>>>;
    replicas: z.ZodOptional<z.ZodNumber>;
    buildType: z.ZodOptional<z.ZodEnum<["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"]>>;
    railpackVersion: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    herokuVersion: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    publishDirectory: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    isStaticSpa: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    registryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "name" | "description" | "appName" | "environmentId" | "serverId">, z.UnknownKeysParam, z.ZodTypeAny, {
    name: string;
    environmentId: string;
    description?: string | null | undefined;
    appName?: string | undefined;
    serverId?: string | null | undefined;
}, {
    name: string;
    environmentId: string;
    description?: string | null | undefined;
    appName?: string | undefined;
    serverId?: string | null | undefined;
}>;
export declare const apiFindOneApplication: z.ZodObject<{
    applicationId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
}, {
    applicationId: string;
}>;
export declare const apiDeployApplication: z.ZodObject<{} & {
    applicationId: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    description?: string | undefined;
    title?: string | undefined;
}, {
    applicationId: string;
    description?: string | undefined;
    title?: string | undefined;
}>;
export declare const apiRedeployApplication: z.ZodObject<{} & {
    applicationId: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    description?: string | undefined;
    title?: string | undefined;
}, {
    applicationId: string;
    description?: string | undefined;
    title?: string | undefined;
}>;
export declare const apiReloadApplication: z.ZodObject<{
    applicationId: z.ZodString;
    appName: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    appName: string;
}, {
    applicationId: string;
    appName: string;
}>;
export declare const apiSaveBuildType: z.ZodObject<{
    applicationId: z.ZodString;
    dockerfile: z.ZodNullable<z.ZodString>;
    dockerContextPath: z.ZodNullable<z.ZodString>;
    dockerBuildStage: z.ZodNullable<z.ZodString>;
    buildType: z.ZodEnum<["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"]>;
    railpackVersion: z.ZodNullable<z.ZodString>;
    herokuVersion: z.ZodNullable<z.ZodString>;
} & Pick<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    giteaId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    applicationId: z.ZodOptional<z.ZodString>;
    applicationStatus: z.ZodOptional<z.ZodEnum<["idle", "running", "done", "error"]>>;
    triggerType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["push", "tag"]>>>;
    appName: z.ZodOptional<z.ZodString>;
    env: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    sourceType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["github", "docker", "git", "gitlab", "bitbucket", "gitea", "drop"]>>>;
    repository: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    branch: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    autoDeploy: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    gitlabProjectId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    gitlabRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabPathNamespace: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customGitUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitBranch: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitSSHKeyId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    command: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enableSubmodules: z.ZodOptional<z.ZodBoolean>;
    environmentId: z.ZodString;
    watchPaths: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    bitbucketId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    serverId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    username: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewEnv: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewBuildArgs: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewBuildSecrets: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewLabels: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    previewWildcard: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewPort: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    previewHttps: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    previewPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewCertificateType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>>;
    previewCustomCertResolver: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    previewLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    isPreviewDeploymentsActive: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    previewRequireCollaboratorPermissions: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    rollbackActive: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    buildArgs: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    buildSecrets: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    memoryReservation: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    memoryLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cpuReservation: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cpuLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    enabled: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    subtitle: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cleanCache: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    buildPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    gitlabBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    password: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerImage: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    registryUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitBuildPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerfile: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerContextPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dockerBuildStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dropBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    healthCheckSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Test: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Interval: z.ZodOptional<z.ZodNumber>;
        Timeout: z.ZodOptional<z.ZodNumber>;
        StartPeriod: z.ZodOptional<z.ZodNumber>;
        Retries: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }>>>>;
    restartPolicySwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Condition: z.ZodOptional<z.ZodString>;
        Delay: z.ZodOptional<z.ZodNumber>;
        MaxAttempts: z.ZodOptional<z.ZodNumber>;
        Window: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }>>>>;
    placementSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Preferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Spread: z.ZodObject<{
                SpreadDescriptor: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                SpreadDescriptor: string;
            }, {
                SpreadDescriptor: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            Spread: {
                SpreadDescriptor: string;
            };
        }, {
            Spread: {
                SpreadDescriptor: string;
            };
        }>, "many">>;
        MaxReplicas: z.ZodOptional<z.ZodNumber>;
        Platforms: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Architecture: z.ZodString;
            OS: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            Architecture: string;
            OS: string;
        }, {
            Architecture: string;
            OS: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }>>>>;
    updateConfigSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>;
    rollbackConfigSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>;
    modeSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Replicated: z.ZodOptional<z.ZodObject<{
            Replicas: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            Replicas?: number | undefined;
        }, {
            Replicas?: number | undefined;
        }>>;
        Global: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        ReplicatedJob: z.ZodOptional<z.ZodObject<{
            MaxConcurrent: z.ZodOptional<z.ZodNumber>;
            TotalCompletions: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }>>;
        GlobalJob: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }>>>>;
    labelsSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>>;
    networkSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodArray<z.ZodObject<{
        Target: z.ZodOptional<z.ZodString>;
        Aliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        DriverOpts: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }>, "many">>>>;
    stopGracePeriodSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodBigInt>>>;
    endpointSpecSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Mode: z.ZodOptional<z.ZodString>;
        Ports: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Protocol: z.ZodOptional<z.ZodString>;
            TargetPort: z.ZodOptional<z.ZodNumber>;
            PublishedPort: z.ZodOptional<z.ZodNumber>;
            PublishMode: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }>>>>;
    replicas: z.ZodOptional<z.ZodNumber>;
    buildType: z.ZodOptional<z.ZodEnum<["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"]>>;
    railpackVersion: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    herokuVersion: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    publishDirectory: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    isStaticSpa: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    registryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "publishDirectory" | "isStaticSpa">, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    dockerfile: string | null;
    dockerContextPath: string | null;
    dockerBuildStage: string | null;
    buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
    railpackVersion: string | null;
    herokuVersion: string | null;
    publishDirectory?: string | null | undefined;
    isStaticSpa?: boolean | null | undefined;
}, {
    applicationId: string;
    dockerfile: string | null;
    dockerContextPath: string | null;
    dockerBuildStage: string | null;
    buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
    railpackVersion: string | null;
    herokuVersion: string | null;
    publishDirectory?: string | null | undefined;
    isStaticSpa?: boolean | null | undefined;
}>;
export declare const apiSaveGithubProvider: z.ZodObject<{
    owner: z.ZodNullable<z.ZodString>;
    githubId: z.ZodNullable<z.ZodString>;
    applicationId: z.ZodString;
    repository: z.ZodNullable<z.ZodString>;
    branch: z.ZodNullable<z.ZodString>;
    enableSubmodules: z.ZodBoolean;
    watchPaths: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    buildPath: z.ZodNullable<z.ZodString>;
} & {
    triggerType: z.ZodDefault<z.ZodEnum<["push", "tag"]>>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    owner: string | null;
    githubId: string | null;
    applicationId: string;
    triggerType: "push" | "tag";
    repository: string | null;
    branch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    buildPath: string | null;
}, {
    owner: string | null;
    githubId: string | null;
    applicationId: string;
    repository: string | null;
    branch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    buildPath: string | null;
    triggerType?: "push" | "tag" | undefined;
}>;
export declare const apiSaveGitlabProvider: z.ZodObject<{
    gitlabId: z.ZodNullable<z.ZodString>;
    applicationId: z.ZodString;
    gitlabProjectId: z.ZodNullable<z.ZodNumber>;
    gitlabRepository: z.ZodNullable<z.ZodString>;
    gitlabOwner: z.ZodNullable<z.ZodString>;
    gitlabBranch: z.ZodNullable<z.ZodString>;
    gitlabPathNamespace: z.ZodNullable<z.ZodString>;
    enableSubmodules: z.ZodBoolean;
    watchPaths: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    gitlabBuildPath: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    gitlabId: string | null;
    applicationId: string;
    gitlabProjectId: number | null;
    gitlabRepository: string | null;
    gitlabOwner: string | null;
    gitlabBranch: string | null;
    gitlabPathNamespace: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    gitlabBuildPath: string | null;
}, {
    gitlabId: string | null;
    applicationId: string;
    gitlabProjectId: number | null;
    gitlabRepository: string | null;
    gitlabOwner: string | null;
    gitlabBranch: string | null;
    gitlabPathNamespace: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    gitlabBuildPath: string | null;
}>;
export declare const apiSaveBitbucketProvider: z.ZodObject<{
    applicationId: z.ZodString;
    bitbucketRepository: z.ZodNullable<z.ZodString>;
    bitbucketOwner: z.ZodNullable<z.ZodString>;
    bitbucketBranch: z.ZodNullable<z.ZodString>;
    enableSubmodules: z.ZodBoolean;
    watchPaths: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    bitbucketId: z.ZodNullable<z.ZodString>;
    bitbucketBuildPath: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    bitbucketRepository: string | null;
    bitbucketOwner: string | null;
    bitbucketBranch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    bitbucketId: string | null;
    bitbucketBuildPath: string | null;
}, {
    applicationId: string;
    bitbucketRepository: string | null;
    bitbucketOwner: string | null;
    bitbucketBranch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    bitbucketId: string | null;
    bitbucketBuildPath: string | null;
}>;
export declare const apiSaveGiteaProvider: z.ZodObject<{
    giteaId: z.ZodNullable<z.ZodString>;
    applicationId: z.ZodString;
    giteaRepository: z.ZodNullable<z.ZodString>;
    giteaOwner: z.ZodNullable<z.ZodString>;
    giteaBranch: z.ZodNullable<z.ZodString>;
    enableSubmodules: z.ZodBoolean;
    watchPaths: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    giteaBuildPath: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    giteaId: string | null;
    applicationId: string;
    giteaRepository: string | null;
    giteaOwner: string | null;
    giteaBranch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    giteaBuildPath: string | null;
}, {
    giteaId: string | null;
    applicationId: string;
    giteaRepository: string | null;
    giteaOwner: string | null;
    giteaBranch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    giteaBuildPath: string | null;
}>;
export declare const apiSaveDockerProvider: z.ZodObject<{
    applicationId: z.ZodString;
    username: z.ZodNullable<z.ZodString>;
    password: z.ZodNullable<z.ZodString>;
    dockerImage: z.ZodNullable<z.ZodString>;
    registryUrl: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    username: string | null;
    password: string | null;
    dockerImage: string | null;
    registryUrl: string | null;
}, {
    applicationId: string;
    username: string | null;
    password: string | null;
    dockerImage: string | null;
    registryUrl: string | null;
}>;
export declare const apiSaveGitProvider: z.ZodObject<{
    applicationId: z.ZodString;
    customGitUrl: z.ZodNullable<z.ZodString>;
    customGitBranch: z.ZodNullable<z.ZodString>;
    enableSubmodules: z.ZodBoolean;
    watchPaths: z.ZodNullable<z.ZodArray<z.ZodString, "many">>;
    customGitBuildPath: z.ZodNullable<z.ZodString>;
} & Pick<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    giteaId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodOptional<z.ZodString>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    owner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    githubId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    applicationId: z.ZodOptional<z.ZodString>;
    applicationStatus: z.ZodOptional<z.ZodEnum<["idle", "running", "done", "error"]>>;
    triggerType: z.ZodOptional<z.ZodNullable<z.ZodEnum<["push", "tag"]>>>;
    appName: z.ZodOptional<z.ZodString>;
    env: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    sourceType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["github", "docker", "git", "gitlab", "bitbucket", "gitea", "drop"]>>>;
    repository: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    branch: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    autoDeploy: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    gitlabProjectId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    gitlabRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    gitlabPathNamespace: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaRepository: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaOwner: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaBranch: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    customGitUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitBranch: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitSSHKeyId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    command: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    enableSubmodules: z.ZodOptional<z.ZodBoolean>;
    environmentId: z.ZodString;
    watchPaths: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    bitbucketId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    serverId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    username: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewEnv: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewBuildArgs: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewBuildSecrets: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewLabels: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>;
    previewWildcard: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewPort: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    previewHttps: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    previewPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    previewCertificateType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>>;
    previewCustomCertResolver: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    previewLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    isPreviewDeploymentsActive: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    previewRequireCollaboratorPermissions: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    rollbackActive: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    buildArgs: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    buildSecrets: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    memoryReservation: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    memoryLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cpuReservation: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cpuLimit: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    title: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    enabled: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    subtitle: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    cleanCache: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    buildPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    gitlabBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    giteaBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    bitbucketBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    password: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerImage: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    registryUrl: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    customGitBuildPath: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerfile: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    dockerContextPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dockerBuildStage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    dropBuildPath: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    healthCheckSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Test: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Interval: z.ZodOptional<z.ZodNumber>;
        Timeout: z.ZodOptional<z.ZodNumber>;
        StartPeriod: z.ZodOptional<z.ZodNumber>;
        Retries: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }>>>>;
    restartPolicySwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Condition: z.ZodOptional<z.ZodString>;
        Delay: z.ZodOptional<z.ZodNumber>;
        MaxAttempts: z.ZodOptional<z.ZodNumber>;
        Window: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }>>>>;
    placementSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Preferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Spread: z.ZodObject<{
                SpreadDescriptor: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                SpreadDescriptor: string;
            }, {
                SpreadDescriptor: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            Spread: {
                SpreadDescriptor: string;
            };
        }, {
            Spread: {
                SpreadDescriptor: string;
            };
        }>, "many">>;
        MaxReplicas: z.ZodOptional<z.ZodNumber>;
        Platforms: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Architecture: z.ZodString;
            OS: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            Architecture: string;
            OS: string;
        }, {
            Architecture: string;
            OS: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }>>>>;
    updateConfigSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>;
    rollbackConfigSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>;
    modeSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Replicated: z.ZodOptional<z.ZodObject<{
            Replicas: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            Replicas?: number | undefined;
        }, {
            Replicas?: number | undefined;
        }>>;
        Global: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        ReplicatedJob: z.ZodOptional<z.ZodObject<{
            MaxConcurrent: z.ZodOptional<z.ZodNumber>;
            TotalCompletions: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }>>;
        GlobalJob: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }>>>>;
    labelsSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>>;
    networkSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodArray<z.ZodObject<{
        Target: z.ZodOptional<z.ZodString>;
        Aliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        DriverOpts: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }>, "many">>>>;
    stopGracePeriodSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodBigInt>>>;
    endpointSpecSwarm: z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Mode: z.ZodOptional<z.ZodString>;
        Ports: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Protocol: z.ZodOptional<z.ZodString>;
            TargetPort: z.ZodOptional<z.ZodNumber>;
            PublishedPort: z.ZodOptional<z.ZodNumber>;
            PublishMode: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }>>>>;
    replicas: z.ZodOptional<z.ZodNumber>;
    buildType: z.ZodOptional<z.ZodEnum<["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"]>>;
    railpackVersion: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    herokuVersion: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    publishDirectory: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    isStaticSpa: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>;
    registryId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "customGitSSHKeyId">, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    customGitUrl: string | null;
    customGitBranch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    customGitBuildPath: string | null;
    customGitSSHKeyId?: string | null | undefined;
}, {
    applicationId: string;
    customGitUrl: string | null;
    customGitBranch: string | null;
    enableSubmodules: boolean;
    watchPaths: string[] | null;
    customGitBuildPath: string | null;
    customGitSSHKeyId?: string | null | undefined;
}>;
export declare const apiSaveEnvironmentVariables: z.ZodObject<{
    applicationId: z.ZodString;
    env: z.ZodNullable<z.ZodString>;
    buildArgs: z.ZodNullable<z.ZodString>;
    buildSecrets: z.ZodNullable<z.ZodString>;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    env: string | null;
    buildArgs: string | null;
    buildSecrets: string | null;
}, {
    applicationId: string;
    env: string | null;
    buildArgs: string | null;
    buildSecrets: string | null;
}>;
export declare const apiFindMonitoringStats: z.ZodObject<{
    appName: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    appName: string;
}, {
    appName: string;
}>;
export declare const apiUpdateApplication: z.ZodObject<Omit<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    giteaId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    createdAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    refreshToken: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    owner: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    githubId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    gitlabId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    applicationStatus: z.ZodOptional<z.ZodOptional<z.ZodEnum<["idle", "running", "done", "error"]>>>;
    triggerType: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodEnum<["push", "tag"]>>>>;
    appName: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    env: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    sourceType: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodEnum<["github", "docker", "git", "gitlab", "bitbucket", "gitea", "drop"]>>>>;
    repository: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    branch: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    autoDeploy: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    gitlabProjectId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    gitlabRepository: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    gitlabOwner: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    gitlabBranch: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    gitlabPathNamespace: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    bitbucketRepository: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    bitbucketOwner: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    bitbucketBranch: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    giteaRepository: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    giteaOwner: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    giteaBranch: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    customGitUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    customGitBranch: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    customGitSSHKeyId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    command: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    enableSubmodules: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    environmentId: z.ZodOptional<z.ZodString>;
    watchPaths: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>>;
    bitbucketId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    serverId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    username: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    previewEnv: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    previewBuildArgs: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    previewBuildSecrets: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    previewLabels: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodString, "many">>>>>;
    previewWildcard: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    previewPort: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>>;
    previewHttps: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodBoolean>>>;
    previewPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    previewCertificateType: z.ZodOptional<z.ZodOptional<z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>>>;
    previewCustomCertResolver: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    previewLimit: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>>;
    isPreviewDeploymentsActive: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>>;
    previewRequireCollaboratorPermissions: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>>;
    rollbackActive: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodBoolean>>>;
    buildArgs: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    buildSecrets: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    memoryReservation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    memoryLimit: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    cpuReservation: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    cpuLimit: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    title: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    enabled: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>>;
    subtitle: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    cleanCache: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>>;
    buildPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    gitlabBuildPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    giteaBuildPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    bitbucketBuildPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    password: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    dockerImage: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    registryUrl: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    customGitBuildPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    dockerfile: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    dockerContextPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    dockerBuildStage: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    dropBuildPath: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    healthCheckSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Test: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Interval: z.ZodOptional<z.ZodNumber>;
        Timeout: z.ZodOptional<z.ZodNumber>;
        StartPeriod: z.ZodOptional<z.ZodNumber>;
        Retries: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }, {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    }>>>>>;
    restartPolicySwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Condition: z.ZodOptional<z.ZodString>;
        Delay: z.ZodOptional<z.ZodNumber>;
        MaxAttempts: z.ZodOptional<z.ZodNumber>;
        Window: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }, {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    }>>>>>;
    placementSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        Preferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Spread: z.ZodObject<{
                SpreadDescriptor: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                SpreadDescriptor: string;
            }, {
                SpreadDescriptor: string;
            }>;
        }, "strict", z.ZodTypeAny, {
            Spread: {
                SpreadDescriptor: string;
            };
        }, {
            Spread: {
                SpreadDescriptor: string;
            };
        }>, "many">>;
        MaxReplicas: z.ZodOptional<z.ZodNumber>;
        Platforms: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Architecture: z.ZodString;
            OS: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            Architecture: string;
            OS: string;
        }, {
            Architecture: string;
            OS: string;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }, {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    }>>>>>;
    updateConfigSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>>;
    rollbackConfigSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Parallelism: z.ZodNumber;
        Delay: z.ZodOptional<z.ZodNumber>;
        FailureAction: z.ZodOptional<z.ZodString>;
        Monitor: z.ZodOptional<z.ZodNumber>;
        MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
        Order: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }, {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    }>>>>>;
    modeSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Replicated: z.ZodOptional<z.ZodObject<{
            Replicas: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            Replicas?: number | undefined;
        }, {
            Replicas?: number | undefined;
        }>>;
        Global: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
        ReplicatedJob: z.ZodOptional<z.ZodObject<{
            MaxConcurrent: z.ZodOptional<z.ZodNumber>;
            TotalCompletions: z.ZodOptional<z.ZodNumber>;
        }, "strict", z.ZodTypeAny, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }, {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        }>>;
        GlobalJob: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }, {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    }>>>>>;
    labelsSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodString>>>>>;
    networkSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodArray<z.ZodObject<{
        Target: z.ZodOptional<z.ZodString>;
        Aliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        DriverOpts: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    }, "strict", z.ZodTypeAny, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }, {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }>, "many">>>>>;
    stopGracePeriodSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodBigInt>>>>;
    endpointSpecSwarm: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNullable<z.ZodObject<{
        Mode: z.ZodOptional<z.ZodString>;
        Ports: z.ZodOptional<z.ZodArray<z.ZodObject<{
            Protocol: z.ZodOptional<z.ZodString>;
            TargetPort: z.ZodOptional<z.ZodNumber>;
            PublishedPort: z.ZodOptional<z.ZodNumber>;
            PublishMode: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }, {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }, {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    }>>>>>;
    replicas: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    buildType: z.ZodOptional<z.ZodOptional<z.ZodEnum<["dockerfile", "heroku_buildpacks", "paketo_buildpacks", "nixpacks", "static", "railpack"]>>>;
    railpackVersion: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    herokuVersion: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    publishDirectory: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>>;
    isStaticSpa: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodBoolean>>>>;
    registryId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
} & {
    applicationId: z.ZodString;
}, "serverId">, z.UnknownKeysParam, z.ZodTypeAny, {
    applicationId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    giteaId?: string | null | undefined;
    createdAt?: string | undefined;
    refreshToken?: string | null | undefined;
    owner?: string | null | undefined;
    githubId?: string | null | undefined;
    gitlabId?: string | null | undefined;
    applicationStatus?: "idle" | "running" | "done" | "error" | undefined;
    triggerType?: "push" | "tag" | null | undefined;
    appName?: string | undefined;
    env?: string | null | undefined;
    sourceType?: "gitea" | "github" | "gitlab" | "bitbucket" | "git" | "docker" | "drop" | undefined;
    repository?: string | null | undefined;
    branch?: string | null | undefined;
    autoDeploy?: boolean | null | undefined;
    gitlabProjectId?: number | null | undefined;
    gitlabRepository?: string | null | undefined;
    gitlabOwner?: string | null | undefined;
    gitlabBranch?: string | null | undefined;
    gitlabPathNamespace?: string | null | undefined;
    bitbucketRepository?: string | null | undefined;
    bitbucketOwner?: string | null | undefined;
    bitbucketBranch?: string | null | undefined;
    giteaRepository?: string | null | undefined;
    giteaOwner?: string | null | undefined;
    giteaBranch?: string | null | undefined;
    customGitUrl?: string | null | undefined;
    customGitBranch?: string | null | undefined;
    customGitSSHKeyId?: string | null | undefined;
    command?: string | null | undefined;
    enableSubmodules?: boolean | undefined;
    environmentId?: string | undefined;
    watchPaths?: string[] | null | undefined;
    bitbucketId?: string | null | undefined;
    username?: string | null | undefined;
    previewEnv?: string | null | undefined;
    previewBuildArgs?: string | null | undefined;
    previewBuildSecrets?: string | null | undefined;
    previewLabels?: string[] | null | undefined;
    previewWildcard?: string | null | undefined;
    previewPort?: number | null | undefined;
    previewHttps?: boolean | undefined;
    previewPath?: string | null | undefined;
    previewCertificateType?: "letsencrypt" | "none" | "custom" | undefined;
    previewCustomCertResolver?: string | null | undefined;
    previewLimit?: number | null | undefined;
    isPreviewDeploymentsActive?: boolean | null | undefined;
    previewRequireCollaboratorPermissions?: boolean | null | undefined;
    rollbackActive?: boolean | null | undefined;
    buildArgs?: string | null | undefined;
    buildSecrets?: string | null | undefined;
    memoryReservation?: string | null | undefined;
    memoryLimit?: string | null | undefined;
    cpuReservation?: string | null | undefined;
    cpuLimit?: string | null | undefined;
    title?: string | null | undefined;
    enabled?: boolean | null | undefined;
    subtitle?: string | null | undefined;
    cleanCache?: boolean | null | undefined;
    buildPath?: string | null | undefined;
    gitlabBuildPath?: string | null | undefined;
    giteaBuildPath?: string | null | undefined;
    bitbucketBuildPath?: string | null | undefined;
    password?: string | null | undefined;
    dockerImage?: string | null | undefined;
    registryUrl?: string | null | undefined;
    customGitBuildPath?: string | null | undefined;
    dockerfile?: string | null | undefined;
    dockerContextPath?: string | null | undefined;
    dockerBuildStage?: string | null | undefined;
    dropBuildPath?: string | null | undefined;
    healthCheckSwarm?: {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    } | null | undefined;
    restartPolicySwarm?: {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    } | null | undefined;
    placementSwarm?: {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    } | null | undefined;
    updateConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    rollbackConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    modeSwarm?: {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    } | null | undefined;
    labelsSwarm?: Record<string, string> | null | undefined;
    networkSwarm?: {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }[] | null | undefined;
    stopGracePeriodSwarm?: bigint | null | undefined;
    endpointSpecSwarm?: {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    } | null | undefined;
    replicas?: number | undefined;
    buildType?: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack" | undefined;
    railpackVersion?: string | null | undefined;
    herokuVersion?: string | null | undefined;
    publishDirectory?: string | null | undefined;
    isStaticSpa?: boolean | null | undefined;
    registryId?: string | null | undefined;
}, {
    applicationId: string;
    name?: string | undefined;
    description?: string | null | undefined;
    giteaId?: string | null | undefined;
    createdAt?: string | undefined;
    refreshToken?: string | null | undefined;
    owner?: string | null | undefined;
    githubId?: string | null | undefined;
    gitlabId?: string | null | undefined;
    applicationStatus?: "idle" | "running" | "done" | "error" | undefined;
    triggerType?: "push" | "tag" | null | undefined;
    appName?: string | undefined;
    env?: string | null | undefined;
    sourceType?: "gitea" | "github" | "gitlab" | "bitbucket" | "git" | "docker" | "drop" | undefined;
    repository?: string | null | undefined;
    branch?: string | null | undefined;
    autoDeploy?: boolean | null | undefined;
    gitlabProjectId?: number | null | undefined;
    gitlabRepository?: string | null | undefined;
    gitlabOwner?: string | null | undefined;
    gitlabBranch?: string | null | undefined;
    gitlabPathNamespace?: string | null | undefined;
    bitbucketRepository?: string | null | undefined;
    bitbucketOwner?: string | null | undefined;
    bitbucketBranch?: string | null | undefined;
    giteaRepository?: string | null | undefined;
    giteaOwner?: string | null | undefined;
    giteaBranch?: string | null | undefined;
    customGitUrl?: string | null | undefined;
    customGitBranch?: string | null | undefined;
    customGitSSHKeyId?: string | null | undefined;
    command?: string | null | undefined;
    enableSubmodules?: boolean | undefined;
    environmentId?: string | undefined;
    watchPaths?: string[] | null | undefined;
    bitbucketId?: string | null | undefined;
    username?: string | null | undefined;
    previewEnv?: string | null | undefined;
    previewBuildArgs?: string | null | undefined;
    previewBuildSecrets?: string | null | undefined;
    previewLabels?: string[] | null | undefined;
    previewWildcard?: string | null | undefined;
    previewPort?: number | null | undefined;
    previewHttps?: boolean | undefined;
    previewPath?: string | null | undefined;
    previewCertificateType?: "letsencrypt" | "none" | "custom" | undefined;
    previewCustomCertResolver?: string | null | undefined;
    previewLimit?: number | null | undefined;
    isPreviewDeploymentsActive?: boolean | null | undefined;
    previewRequireCollaboratorPermissions?: boolean | null | undefined;
    rollbackActive?: boolean | null | undefined;
    buildArgs?: string | null | undefined;
    buildSecrets?: string | null | undefined;
    memoryReservation?: string | null | undefined;
    memoryLimit?: string | null | undefined;
    cpuReservation?: string | null | undefined;
    cpuLimit?: string | null | undefined;
    title?: string | null | undefined;
    enabled?: boolean | null | undefined;
    subtitle?: string | null | undefined;
    cleanCache?: boolean | null | undefined;
    buildPath?: string | null | undefined;
    gitlabBuildPath?: string | null | undefined;
    giteaBuildPath?: string | null | undefined;
    bitbucketBuildPath?: string | null | undefined;
    password?: string | null | undefined;
    dockerImage?: string | null | undefined;
    registryUrl?: string | null | undefined;
    customGitBuildPath?: string | null | undefined;
    dockerfile?: string | null | undefined;
    dockerContextPath?: string | null | undefined;
    dockerBuildStage?: string | null | undefined;
    dropBuildPath?: string | null | undefined;
    healthCheckSwarm?: {
        Test?: string[] | undefined;
        Interval?: number | undefined;
        Timeout?: number | undefined;
        StartPeriod?: number | undefined;
        Retries?: number | undefined;
    } | null | undefined;
    restartPolicySwarm?: {
        Condition?: string | undefined;
        Delay?: number | undefined;
        MaxAttempts?: number | undefined;
        Window?: number | undefined;
    } | null | undefined;
    placementSwarm?: {
        Constraints?: string[] | undefined;
        Preferences?: {
            Spread: {
                SpreadDescriptor: string;
            };
        }[] | undefined;
        MaxReplicas?: number | undefined;
        Platforms?: {
            Architecture: string;
            OS: string;
        }[] | undefined;
    } | null | undefined;
    updateConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    rollbackConfigSwarm?: {
        Parallelism: number;
        Order: string;
        Delay?: number | undefined;
        FailureAction?: string | undefined;
        Monitor?: number | undefined;
        MaxFailureRatio?: number | undefined;
    } | null | undefined;
    modeSwarm?: {
        Replicated?: {
            Replicas?: number | undefined;
        } | undefined;
        Global?: {} | undefined;
        ReplicatedJob?: {
            MaxConcurrent?: number | undefined;
            TotalCompletions?: number | undefined;
        } | undefined;
        GlobalJob?: {} | undefined;
    } | null | undefined;
    labelsSwarm?: Record<string, string> | null | undefined;
    networkSwarm?: {
        Target?: string | undefined;
        Aliases?: string[] | undefined;
        DriverOpts?: {} | undefined;
    }[] | null | undefined;
    stopGracePeriodSwarm?: bigint | null | undefined;
    endpointSpecSwarm?: {
        Mode?: string | undefined;
        Ports?: {
            Protocol?: string | undefined;
            TargetPort?: number | undefined;
            PublishedPort?: number | undefined;
            PublishMode?: string | undefined;
        }[] | undefined;
    } | null | undefined;
    replicas?: number | undefined;
    buildType?: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack" | undefined;
    railpackVersion?: string | null | undefined;
    herokuVersion?: string | null | undefined;
    publishDirectory?: string | null | undefined;
    isStaticSpa?: boolean | null | undefined;
    registryId?: string | null | undefined;
}>;

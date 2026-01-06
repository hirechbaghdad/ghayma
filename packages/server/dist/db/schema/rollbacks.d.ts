import type { Mount } from "../../services/mount.js";
import type { Port } from "../../services/port.js";
import type { Project } from "../../services/project.js";
import type { Registry } from "../../services/registry.js";
import { z } from "zod";
export declare const rollbacks: import("drizzle-orm/pg-core").PgTableWithColumns<{
    name: "rollback";
    schema: undefined;
    columns: {
        rollbackId: import("drizzle-orm/pg-core").PgColumn<{
            name: "rollbackId";
            tableName: "rollback";
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
        deploymentId: import("drizzle-orm/pg-core").PgColumn<{
            name: "deploymentId";
            tableName: "rollback";
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
        version: import("drizzle-orm/pg-core").PgColumn<{
            name: "version";
            tableName: "rollback";
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
        image: import("drizzle-orm/pg-core").PgColumn<{
            name: "image";
            tableName: "rollback";
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
            tableName: "rollback";
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
        fullContext: import("drizzle-orm/pg-core").PgColumn<{
            name: "fullContext";
            tableName: "rollback";
            dataType: "json";
            columnType: "PgJsonb";
            data: {
                name: string;
                description: string | null;
                giteaId: string | null;
                createdAt: string;
                refreshToken: string | null;
                owner: string | null;
                githubId: string | null;
                gitlabId: string | null;
                applicationId: string;
                applicationStatus: "idle" | "running" | "done" | "error";
                triggerType: "push" | "tag" | null;
                appName: string;
                env: string | null;
                sourceType: "gitea" | "github" | "gitlab" | "bitbucket" | "git" | "docker" | "drop";
                repository: string | null;
                branch: string | null;
                autoDeploy: boolean | null;
                gitlabProjectId: number | null;
                gitlabRepository: string | null;
                gitlabOwner: string | null;
                gitlabBranch: string | null;
                gitlabPathNamespace: string | null;
                bitbucketRepository: string | null;
                bitbucketOwner: string | null;
                bitbucketBranch: string | null;
                giteaRepository: string | null;
                giteaOwner: string | null;
                giteaBranch: string | null;
                customGitUrl: string | null;
                customGitBranch: string | null;
                customGitSSHKeyId: string | null;
                command: string | null;
                enableSubmodules: boolean;
                environmentId: string;
                watchPaths: string[] | null;
                bitbucketId: string | null;
                serverId: string | null;
                username: string | null;
                previewEnv: string | null;
                previewBuildArgs: string | null;
                previewBuildSecrets: string | null;
                previewLabels: string[] | null;
                previewWildcard: string | null;
                previewPort: number | null;
                previewHttps: boolean;
                previewPath: string | null;
                previewCertificateType: "letsencrypt" | "none" | "custom";
                previewCustomCertResolver: string | null;
                previewLimit: number | null;
                isPreviewDeploymentsActive: boolean | null;
                previewRequireCollaboratorPermissions: boolean | null;
                rollbackActive: boolean | null;
                buildArgs: string | null;
                buildSecrets: string | null;
                memoryReservation: string | null;
                memoryLimit: string | null;
                cpuReservation: string | null;
                cpuLimit: string | null;
                title: string | null;
                enabled: boolean | null;
                subtitle: string | null;
                cleanCache: boolean | null;
                buildPath: string | null;
                gitlabBuildPath: string | null;
                giteaBuildPath: string | null;
                bitbucketBuildPath: string | null;
                password: string | null;
                dockerImage: string | null;
                registryUrl: string | null;
                customGitBuildPath: string | null;
                dockerfile: string | null;
                dockerContextPath: string | null;
                dockerBuildStage: string | null;
                dropBuildPath: string | null;
                healthCheckSwarm: import("./shared.js").HealthCheckSwarm | null;
                restartPolicySwarm: import("./shared.js").RestartPolicySwarm | null;
                placementSwarm: import("./shared.js").PlacementSwarm | null;
                updateConfigSwarm: import("./shared.js").UpdateConfigSwarm | null;
                rollbackConfigSwarm: import("./shared.js").UpdateConfigSwarm | null;
                modeSwarm: import("./shared.js").ServiceModeSwarm | null;
                labelsSwarm: import("./shared.js").LabelsSwarm | null;
                networkSwarm: import("./shared.js").NetworkSwarm[] | null;
                stopGracePeriodSwarm: bigint | null;
                endpointSpecSwarm: import("./shared.js").EndpointSpecSwarm | null;
                replicas: number;
                buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
                railpackVersion: string | null;
                herokuVersion: string | null;
                publishDirectory: string | null;
                isStaticSpa: boolean | null;
                registryId: string | null;
            } & {
                environment: {
                    project: Project;
                };
                mounts: Mount[];
                ports: Port[];
                registry?: Registry | null;
            };
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
            $type: {
                name: string;
                description: string | null;
                giteaId: string | null;
                createdAt: string;
                refreshToken: string | null;
                owner: string | null;
                githubId: string | null;
                gitlabId: string | null;
                applicationId: string;
                applicationStatus: "idle" | "running" | "done" | "error";
                triggerType: "push" | "tag" | null;
                appName: string;
                env: string | null;
                sourceType: "gitea" | "github" | "gitlab" | "bitbucket" | "git" | "docker" | "drop";
                repository: string | null;
                branch: string | null;
                autoDeploy: boolean | null;
                gitlabProjectId: number | null;
                gitlabRepository: string | null;
                gitlabOwner: string | null;
                gitlabBranch: string | null;
                gitlabPathNamespace: string | null;
                bitbucketRepository: string | null;
                bitbucketOwner: string | null;
                bitbucketBranch: string | null;
                giteaRepository: string | null;
                giteaOwner: string | null;
                giteaBranch: string | null;
                customGitUrl: string | null;
                customGitBranch: string | null;
                customGitSSHKeyId: string | null;
                command: string | null;
                enableSubmodules: boolean;
                environmentId: string;
                watchPaths: string[] | null;
                bitbucketId: string | null;
                serverId: string | null;
                username: string | null;
                previewEnv: string | null;
                previewBuildArgs: string | null;
                previewBuildSecrets: string | null;
                previewLabels: string[] | null;
                previewWildcard: string | null;
                previewPort: number | null;
                previewHttps: boolean;
                previewPath: string | null;
                previewCertificateType: "letsencrypt" | "none" | "custom";
                previewCustomCertResolver: string | null;
                previewLimit: number | null;
                isPreviewDeploymentsActive: boolean | null;
                previewRequireCollaboratorPermissions: boolean | null;
                rollbackActive: boolean | null;
                buildArgs: string | null;
                buildSecrets: string | null;
                memoryReservation: string | null;
                memoryLimit: string | null;
                cpuReservation: string | null;
                cpuLimit: string | null;
                title: string | null;
                enabled: boolean | null;
                subtitle: string | null;
                cleanCache: boolean | null;
                buildPath: string | null;
                gitlabBuildPath: string | null;
                giteaBuildPath: string | null;
                bitbucketBuildPath: string | null;
                password: string | null;
                dockerImage: string | null;
                registryUrl: string | null;
                customGitBuildPath: string | null;
                dockerfile: string | null;
                dockerContextPath: string | null;
                dockerBuildStage: string | null;
                dropBuildPath: string | null;
                healthCheckSwarm: import("./shared.js").HealthCheckSwarm | null;
                restartPolicySwarm: import("./shared.js").RestartPolicySwarm | null;
                placementSwarm: import("./shared.js").PlacementSwarm | null;
                updateConfigSwarm: import("./shared.js").UpdateConfigSwarm | null;
                rollbackConfigSwarm: import("./shared.js").UpdateConfigSwarm | null;
                modeSwarm: import("./shared.js").ServiceModeSwarm | null;
                labelsSwarm: import("./shared.js").LabelsSwarm | null;
                networkSwarm: import("./shared.js").NetworkSwarm[] | null;
                stopGracePeriodSwarm: bigint | null;
                endpointSpecSwarm: import("./shared.js").EndpointSpecSwarm | null;
                replicas: number;
                buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
                railpackVersion: string | null;
                herokuVersion: string | null;
                publishDirectory: string | null;
                isStaticSpa: boolean | null;
                registryId: string | null;
            } & {
                environment: {
                    project: Project;
                };
                mounts: Mount[];
                ports: Port[];
                registry?: Registry | null;
            };
        }>;
    };
    dialect: "pg";
}>;
export type Rollback = typeof rollbacks.$inferSelect;
export declare const rollbacksRelations: import("drizzle-orm").Relations<"rollback", {
    deployment: import("drizzle-orm").One<"deployment", true>;
}>;
export declare const createRollbackSchema: z.ZodObject<{
    createdAt: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deploymentId: z.ZodString;
    rollbackId: z.ZodOptional<z.ZodString>;
    version: z.ZodOptional<z.ZodNumber>;
    fullContext: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
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
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null>>>;
} & {
    appName: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    appName: string;
    deploymentId: string;
    createdAt?: string | undefined;
    image?: string | null | undefined;
    rollbackId?: string | undefined;
    version?: number | undefined;
    fullContext?: (string | number | boolean | {
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
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null) | undefined;
}, {
    appName: string;
    deploymentId: string;
    createdAt?: string | undefined;
    image?: string | null | undefined;
    rollbackId?: string | undefined;
    version?: number | undefined;
    fullContext?: (string | number | boolean | {
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
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null) | undefined;
}>;
export declare const updateRollbackSchema: z.ZodObject<{
    createdAt: z.ZodOptional<z.ZodString>;
    image: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    deploymentId: z.ZodString;
    version: z.ZodOptional<z.ZodNumber>;
    fullContext: z.ZodOptional<z.ZodNullable<z.ZodType<string | number | boolean | {
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
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null>>>;
    appName: z.ZodString;
} & {
    rollbackId: z.ZodString;
}, z.UnknownKeysParam, z.ZodTypeAny, {
    appName: string;
    deploymentId: string;
    rollbackId: string;
    createdAt?: string | undefined;
    image?: string | null | undefined;
    version?: number | undefined;
    fullContext?: (string | number | boolean | {
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
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null) | undefined;
}, {
    appName: string;
    deploymentId: string;
    rollbackId: string;
    createdAt?: string | undefined;
    image?: string | null | undefined;
    version?: number | undefined;
    fullContext?: (string | number | boolean | {
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
    } | /*elided*/ any | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null)[] | null) | undefined;
}>;
export declare const apiFindOneRollback: z.ZodObject<{
    rollbackId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    rollbackId: string;
}, {
    rollbackId: string;
}>;

import { db } from "../db/index.js";
import { backups, buildAppName, postgres, } from "../db/schema/index.js";
import { generatePassword } from "../templates/index.js";
import { buildPostgres } from "../utils/databases/postgres.js";
import { pullImage } from "../utils/docker/utils.js";
import { execAsyncRemote } from "../utils/process/execAsync.js";
import { TRPCError } from "@trpc/server";
import { eq, getTableColumns } from "drizzle-orm";
import { validUniqueServerAppName } from "./project.js";
export function getMountPath(dockerImage) {
    const versionMatch = dockerImage.match(/postgres:(\d+)/);
    if (versionMatch?.[1]) {
        const version = Number.parseInt(versionMatch[1], 10);
        if (version >= 18) {
            return `/var/lib/postgresql/${version}/data`;
        }
    }
    return "/var/lib/postgresql/data";
}
export const createPostgres = async (input) => {
    const appName = buildAppName("postgres", input.appName);
    const valid = await validUniqueServerAppName(appName);
    if (!valid) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Service with this 'AppName' already exists",
        });
    }
    const newPostgres = await db
        .insert(postgres)
        .values({
        ...input,
        databasePassword: input.databasePassword
            ? input.databasePassword
            : generatePassword(),
        appName,
    })
        .returning()
        .then((value) => value[0]);
    if (!newPostgres) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error input: Inserting postgresql database",
        });
    }
    return newPostgres;
};
export const findPostgresById = async (postgresId) => {
    const result = await db.query.postgres.findFirst({
        where: eq(postgres.postgresId, postgresId),
        with: {
            environment: {
                with: {
                    project: true,
                },
            },
            mounts: true,
            server: true,
            backups: {
                with: {
                    destination: true,
                    deployments: true,
                },
            },
        },
    });
    if (!result) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Postgres not found",
        });
    }
    return result;
};
export const findPostgresByBackupId = async (backupId) => {
    const result = await db
        .select({
        ...getTableColumns(postgres),
    })
        .from(postgres)
        .innerJoin(backups, eq(postgres.postgresId, backups.postgresId))
        .where(eq(backups.backupId, backupId))
        .limit(1);
    if (!result || !result[0]) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Postgres not found",
        });
    }
    return result[0];
};
export const updatePostgresById = async (postgresId, postgresData) => {
    const { appName, ...rest } = postgresData;
    const result = await db
        .update(postgres)
        .set({
        ...rest,
    })
        .where(eq(postgres.postgresId, postgresId))
        .returning();
    return result[0];
};
export const removePostgresById = async (postgresId) => {
    const result = await db
        .delete(postgres)
        .where(eq(postgres.postgresId, postgresId))
        .returning();
    return result[0];
};
export const deployPostgres = async (postgresId, onData) => {
    const postgres = await findPostgresById(postgresId);
    try {
        await updatePostgresById(postgresId, {
            applicationStatus: "running",
        });
        onData?.("Starting postgres deployment...");
        if (postgres.serverId) {
            await execAsyncRemote(postgres.serverId, `docker pull ${postgres.dockerImage}`, onData);
        }
        else {
            await pullImage(postgres.dockerImage, onData);
        }
        await buildPostgres(postgres);
        await updatePostgresById(postgresId, {
            applicationStatus: "done",
        });
        onData?.("Deployment completed successfully!");
    }
    catch (error) {
        onData?.(`Error: ${error}`);
        await updatePostgresById(postgresId, {
            applicationStatus: "error",
        });
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Error on deploy postgres${error}`,
        });
    }
    return postgres;
};

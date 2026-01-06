import { db } from "../db/index.js";
import { backups, buildAppName, compose, mongo, } from "../db/schema/index.js";
import { generatePassword } from "../templates/index.js";
import { buildMongo } from "../utils/databases/mongo.js";
import { pullImage } from "../utils/docker/utils.js";
import { execAsyncRemote } from "../utils/process/execAsync.js";
import { TRPCError } from "@trpc/server";
import { eq, getTableColumns } from "drizzle-orm";
import { validUniqueServerAppName } from "./project.js";
export const createMongo = async (input) => {
    const appName = buildAppName("mongo", input.appName);
    const valid = await validUniqueServerAppName(appName);
    if (!valid) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Service with this 'AppName' already exists",
        });
    }
    const newMongo = await db
        .insert(mongo)
        .values({
        ...input,
        databasePassword: input.databasePassword
            ? input.databasePassword
            : generatePassword(),
        appName,
    })
        .returning()
        .then((value) => value[0]);
    if (!newMongo) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error input: Inserting mongo database",
        });
    }
    return newMongo;
};
export const findMongoById = async (mongoId) => {
    const result = await db.query.mongo.findFirst({
        where: eq(mongo.mongoId, mongoId),
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
            message: "Mongo not found",
        });
    }
    return result;
};
export const updateMongoById = async (mongoId, mongoData) => {
    const { appName, ...rest } = mongoData;
    const result = await db
        .update(mongo)
        .set({
        ...rest,
    })
        .where(eq(mongo.mongoId, mongoId))
        .returning();
    return result[0];
};
export const findMongoByBackupId = async (backupId) => {
    const result = await db
        .select({
        ...getTableColumns(mongo),
    })
        .from(mongo)
        .innerJoin(backups, eq(mongo.mongoId, backups.mongoId))
        .where(eq(backups.backupId, backupId))
        .limit(1);
    if (!result || !result[0]) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Mongo not found",
        });
    }
    return result[0];
};
export const findComposeByBackupId = async (backupId) => {
    const result = await db
        .select({
        ...getTableColumns(compose),
    })
        .from(compose)
        .innerJoin(backups, eq(compose.composeId, backups.composeId))
        .where(eq(backups.backupId, backupId))
        .limit(1);
    if (!result || !result[0]) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Compose not found",
        });
    }
    return result[0];
};
export const removeMongoById = async (mongoId) => {
    const result = await db
        .delete(mongo)
        .where(eq(mongo.mongoId, mongoId))
        .returning();
    return result[0];
};
export const deployMongo = async (mongoId, onData) => {
    const mongo = await findMongoById(mongoId);
    try {
        await updateMongoById(mongoId, {
            applicationStatus: "running",
        });
        onData?.("Starting mongo deployment...");
        if (mongo.serverId) {
            await execAsyncRemote(mongo.serverId, `docker pull ${mongo.dockerImage}`, onData);
        }
        else {
            await pullImage(mongo.dockerImage, onData);
        }
        await buildMongo(mongo);
        await updateMongoById(mongoId, {
            applicationStatus: "done",
        });
        onData?.("Deployment completed successfully!");
    }
    catch (error) {
        onData?.(`Error: ${error}`);
        await updateMongoById(mongoId, {
            applicationStatus: "error",
        });
        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Error on deploy mongo${error}`,
        });
    }
    return mongo;
};

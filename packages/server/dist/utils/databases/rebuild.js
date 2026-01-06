import { db } from "../../db/index.js";
import { mariadb, mongo, mysql, postgres, redis, } from "../../db/schema/index.js";
import { deployMariadb } from "../../services/mariadb.js";
import { deployMongo } from "../../services/mongo.js";
import { deployMySql } from "../../services/mysql.js";
import { deployPostgres } from "../../services/postgres.js";
import { deployRedis } from "../../services/redis.js";
import { eq } from "drizzle-orm";
import { removeService } from "../docker/utils.js";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
export const rebuildDatabase = async (databaseId, type) => {
    const database = await findDatabaseById(databaseId, type);
    if (!database) {
        throw new Error("Database not found");
    }
    await removeService(database.appName, database.serverId);
    await new Promise((resolve) => setTimeout(resolve, 6000));
    for (const mount of database.mounts) {
        if (mount.type === "volume") {
            const command = `docker volume rm ${mount?.volumeName} --force`;
            if (database.serverId) {
                await execAsyncRemote(database.serverId, command);
            }
            else {
                await execAsync(command);
            }
        }
    }
    if (type === "postgres") {
        await deployPostgres(databaseId);
    }
    else if (type === "mysql") {
        await deployMySql(databaseId);
    }
    else if (type === "mariadb") {
        await deployMariadb(databaseId);
    }
    else if (type === "mongo") {
        await deployMongo(databaseId);
    }
    else if (type === "redis") {
        await deployRedis(databaseId);
    }
};
const findDatabaseById = async (databaseId, type) => {
    if (type === "postgres") {
        return await db.query.postgres.findFirst({
            where: eq(postgres.postgresId, databaseId),
            with: {
                mounts: true,
            },
        });
    }
    if (type === "mysql") {
        return await db.query.mysql.findFirst({
            where: eq(mysql.mysqlId, databaseId),
            with: {
                mounts: true,
            },
        });
    }
    if (type === "mariadb") {
        return await db.query.mariadb.findFirst({
            where: eq(mariadb.mariadbId, databaseId),
            with: {
                mounts: true,
            },
        });
    }
    if (type === "mongo") {
        return await db.query.mongo.findFirst({
            where: eq(mongo.mongoId, databaseId),
            with: {
                mounts: true,
            },
        });
    }
    if (type === "redis") {
        return await db.query.redis.findFirst({
            where: eq(redis.redisId, databaseId),
            with: {
                mounts: true,
            },
        });
    }
};

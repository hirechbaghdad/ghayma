import { getS3Credentials } from "../backups/utils.js";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
import { getRestoreCommand } from "./utils.js";
export const restoreMongoBackup = async (mongo, destination, backupInput, emit) => {
    try {
        const { appName, databasePassword, databaseUser, serverId } = mongo;
        const rcloneFlags = getS3Credentials(destination);
        const bucketPath = `:s3:${destination.bucket}`;
        const backupPath = `${bucketPath}/${backupInput.backupFile}`;
        const rcloneCommand = `rclone copy ${rcloneFlags.join(" ")} "${backupPath}"`;
        const command = getRestoreCommand({
            appName,
            type: "mongo",
            credentials: {
                database: backupInput.databaseName,
                databaseUser,
                databasePassword,
            },
            restoreType: "database",
            rcloneCommand,
            backupFile: backupInput.backupFile,
        });
        emit("Starting restore...");
        emit(`Executing command: ${command}`);
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
        emit("Restore completed successfully!");
    }
    catch (error) {
        console.error(error);
        emit(`Error: ${error instanceof Error ? error.message : "Error restoring mongo backup"}`);
        throw new Error(error instanceof Error ? error.message : "Error restoring mongo backup");
    }
};

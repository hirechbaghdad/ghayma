import { getS3Credentials } from "../backups/utils.js";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
import { getRestoreCommand } from "./utils.js";
export const restorePostgresBackup = async (postgres, destination, backupInput, emit) => {
    try {
        const { appName, databaseUser, serverId } = postgres;
        const rcloneFlags = getS3Credentials(destination);
        const bucketPath = `:s3:${destination.bucket}`;
        const backupPath = `${bucketPath}/${backupInput.backupFile}`;
        const rcloneCommand = `rclone cat ${rcloneFlags.join(" ")} "${backupPath}" | gunzip`;
        emit("Starting restore...");
        emit(`Backup path: ${backupPath}`);
        const command = getRestoreCommand({
            appName,
            credentials: {
                database: backupInput.databaseName,
                databaseUser,
            },
            type: "postgres",
            rcloneCommand,
            restoreType: "database",
        });
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
        emit(`Error: ${error instanceof Error
            ? error.message
            : "Error restoring postgres backup"}`);
        throw error;
    }
};

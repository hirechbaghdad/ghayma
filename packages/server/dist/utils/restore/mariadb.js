import { getS3Credentials } from "../backups/utils.js";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
import { getRestoreCommand } from "./utils.js";
export const restoreMariadbBackup = async (mariadb, destination, backupInput, emit) => {
    try {
        const { appName, serverId, databaseUser, databasePassword } = mariadb;
        const rcloneFlags = getS3Credentials(destination);
        const bucketPath = `:s3:${destination.bucket}`;
        const backupPath = `${bucketPath}/${backupInput.backupFile}`;
        const rcloneCommand = `rclone cat ${rcloneFlags.join(" ")} "${backupPath}" | gunzip`;
        const command = getRestoreCommand({
            appName,
            credentials: {
                database: backupInput.databaseName,
                databaseUser,
                databasePassword,
            },
            type: "mariadb",
            rcloneCommand,
            restoreType: "database",
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
        emit(`Error: ${error instanceof Error
            ? error.message
            : "Error restoring mariadb backup"}`);
        throw new Error(error instanceof Error ? error.message : "Error restoring mariadb backup");
    }
};

import { getS3Credentials } from "../backups/utils.js";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
import { getRestoreCommand } from "./utils.js";
export const restoreMySqlBackup = async (mysql, destination, backupInput, emit) => {
    try {
        const { appName, databaseRootPassword, serverId } = mysql;
        const rcloneFlags = getS3Credentials(destination);
        const bucketPath = `:s3:${destination.bucket}`;
        const backupPath = `${bucketPath}/${backupInput.backupFile}`;
        const rcloneCommand = `rclone cat ${rcloneFlags.join(" ")} "${backupPath}" | gunzip`;
        const command = getRestoreCommand({
            appName,
            type: "mysql",
            credentials: {
                database: backupInput.databaseName,
                databasePassword: databaseRootPassword,
            },
            restoreType: "database",
            rcloneCommand,
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
        emit(`Error: ${error instanceof Error ? error.message : "Error restoring mysql backup"}`);
        throw new Error(error instanceof Error ? error.message : "Error restoring mysql backup");
    }
};

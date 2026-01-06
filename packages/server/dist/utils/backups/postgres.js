import { createDeploymentBackup, updateDeploymentStatus, } from "../../services/deployment.js";
import { findEnvironmentById } from "../../services/environment.js";
import { findProjectById } from "../../services/project.js";
import { sendDatabaseBackupNotifications } from "../notifications/database-backup.js";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
import { getBackupCommand, getS3Credentials, normalizeS3Path } from "./utils.js";
export const runPostgresBackup = async (postgres, backup) => {
    const { name, environmentId } = postgres;
    const environment = await findEnvironmentById(environmentId);
    const project = await findProjectById(environment.projectId);
    const deployment = await createDeploymentBackup({
        backupId: backup.backupId,
        title: "Initializing Backup",
        description: "Initializing Backup",
    });
    const { prefix } = backup;
    const destination = backup.destination;
    const backupFileName = `${new Date().toISOString()}.sql.gz`;
    const bucketDestination = `${normalizeS3Path(prefix)}${backupFileName}`;
    try {
        const rcloneFlags = getS3Credentials(destination);
        const rcloneDestination = `:s3:${destination.bucket}/${bucketDestination}`;
        const rcloneCommand = `rclone rcat ${rcloneFlags.join(" ")} "${rcloneDestination}"`;
        const backupCommand = getBackupCommand(backup, rcloneCommand, deployment.logPath);
        if (postgres.serverId) {
            await execAsyncRemote(postgres.serverId, backupCommand);
        }
        else {
            await execAsync(backupCommand, {
                shell: "/bin/bash",
            });
        }
        await sendDatabaseBackupNotifications({
            applicationName: name,
            projectName: project.name,
            databaseType: "postgres",
            type: "success",
            organizationId: project.organizationId,
            databaseName: backup.database,
        });
        await updateDeploymentStatus(deployment.deploymentId, "done");
    }
    catch (error) {
        await sendDatabaseBackupNotifications({
            applicationName: name,
            projectName: project.name,
            databaseType: "postgres",
            type: "error",
            // @ts-ignore
            errorMessage: error?.message || "Error message not provided",
            organizationId: project.organizationId,
            databaseName: backup.database,
        });
        await updateDeploymentStatus(deployment.deploymentId, "error");
        throw error;
    }
    finally {
    }
};

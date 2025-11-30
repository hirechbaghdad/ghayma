import path from "node:path";
import { paths } from "../../constants/index.js";
import { createDeploymentVolumeBackup, updateDeploymentStatus, } from "../../services/deployment.js";
import { findVolumeBackupById } from "../../services/volume-backups.js";
import { execAsync, execAsyncRemote, } from "../../utils/process/execAsync.js";
import { scheduledJobs, scheduleJob } from "node-schedule";
import { getS3Credentials, normalizeS3Path } from "../backups/utils.js";
import { backupVolume } from "./backup.js";
export const scheduleVolumeBackup = async (volumeBackupId) => {
    const volumeBackup = await findVolumeBackupById(volumeBackupId);
    scheduleJob(volumeBackupId, volumeBackup.cronExpression, async () => {
        await runVolumeBackup(volumeBackupId);
    });
};
export const removeVolumeBackupJob = async (volumeBackupId) => {
    const currentJob = scheduledJobs[volumeBackupId];
    currentJob?.cancel();
};
const cleanupOldVolumeBackups = async (volumeBackup, serverId) => {
    const { keepLatestCount, destination, prefix, volumeName } = volumeBackup;
    if (!keepLatestCount)
        return;
    try {
        const rcloneFlags = getS3Credentials(destination);
        const normalizedPrefix = normalizeS3Path(prefix);
        const backupFilesPath = `:s3:${destination.bucket}/${normalizedPrefix}`;
        const listCommand = `rclone lsf ${rcloneFlags.join(" ")} --include \"${volumeName}-*.tar\" :s3:${destination.bucket}/${normalizedPrefix}`;
        const sortAndPick = `sort -r | tail -n +$((${keepLatestCount}+1)) | xargs -I{}`;
        const deleteCommand = `rclone delete ${rcloneFlags.join(" ")} ${backupFilesPath}{}`;
        const fullCommand = `${listCommand} | ${sortAndPick} ${deleteCommand}`;
        if (serverId) {
            await execAsyncRemote(serverId, fullCommand);
        }
        else {
            await execAsync(fullCommand);
        }
    }
    catch (error) {
        console.error("Volume backup retention error", error);
    }
};
export const runVolumeBackup = async (volumeBackupId) => {
    const volumeBackup = await findVolumeBackupById(volumeBackupId);
    const serverId = volumeBackup.application?.serverId || volumeBackup.compose?.serverId;
    const deployment = await createDeploymentVolumeBackup({
        volumeBackupId: volumeBackup.volumeBackupId,
        title: "Volume Backup",
        description: "Volume Backup",
    });
    try {
        const command = await backupVolume(volumeBackup);
        const commandWithLog = `(${command}) >> ${deployment.logPath} 2>&1`;
        if (serverId) {
            await execAsyncRemote(serverId, commandWithLog);
        }
        else {
            await execAsync(commandWithLog);
        }
        if (volumeBackup.keepLatestCount && volumeBackup.keepLatestCount > 0) {
            await cleanupOldVolumeBackups(volumeBackup, serverId);
        }
        await updateDeploymentStatus(deployment.deploymentId, "done");
    }
    catch (error) {
        const { VOLUME_BACKUPS_PATH } = paths(!!serverId);
        const volumeBackupPath = path.join(VOLUME_BACKUPS_PATH, volumeBackup.appName);
        // delete all the .tar files
        const command = `rm -rf ${volumeBackupPath}/*.tar`;
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
        await updateDeploymentStatus(deployment.deploymentId, "error");
        console.error(error);
    }
};

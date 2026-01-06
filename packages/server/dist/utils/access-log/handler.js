import { paths } from "../../constants/index.js";
import { findAdmin } from "../../services/admin.js";
import { updateUser } from "../../services/user.js";
import { scheduledJobs, scheduleJob } from "node-schedule";
import { execAsync } from "../process/execAsync.js";
const LOG_CLEANUP_JOB_NAME = "access-log-cleanup";
export const startLogCleanup = async (cronExpression = "0 0 * * *") => {
    try {
        const { DYNAMIC_TRAEFIK_PATH } = paths();
        const existingJob = scheduledJobs[LOG_CLEANUP_JOB_NAME];
        if (existingJob) {
            existingJob.cancel();
        }
        scheduleJob(LOG_CLEANUP_JOB_NAME, cronExpression, async () => {
            try {
                await execAsync(`tail -n 1000 ${DYNAMIC_TRAEFIK_PATH}/access.log > ${DYNAMIC_TRAEFIK_PATH}/access.log.tmp && mv ${DYNAMIC_TRAEFIK_PATH}/access.log.tmp ${DYNAMIC_TRAEFIK_PATH}/access.log`);
                await execAsync("docker exec dokploy-traefik kill -USR1 1");
            }
            catch (error) {
                console.error("Error during log cleanup:", error);
            }
        });
        const admin = await findAdmin();
        if (admin) {
            await updateUser(admin.user.id, {
                logCleanupCron: cronExpression,
            });
        }
        return true;
    }
    catch (error) {
        console.error("Error starting log cleanup:", error);
        return false;
    }
};
export const stopLogCleanup = async () => {
    try {
        const existingJob = scheduledJobs[LOG_CLEANUP_JOB_NAME];
        if (existingJob) {
            existingJob.cancel();
        }
        // Update database
        const admin = await findAdmin();
        if (admin) {
            await updateUser(admin.user.id, {
                logCleanupCron: null,
            });
        }
        return true;
    }
    catch (error) {
        console.error("Error stopping log cleanup:", error);
        return false;
    }
};
export const getLogCleanupStatus = async () => {
    const admin = await findAdmin();
    const cronExpression = admin?.user.logCleanupCron ?? null;
    return {
        enabled: cronExpression !== null,
        cronExpression,
    };
};

import { existsSync, promises as fsPromises } from "node:fs";
import path from "node:path";
import { paths } from "../constants/index.js";
import { db } from "../db/index.js";
import { deployments, } from "../db/schema/index.js";
import { removeDirectoryIfExistsContent } from "../utils/filesystem/directory.js";
import { execAsyncRemote } from "../utils/process/execAsync.js";
import { TRPCError } from "@trpc/server";
import { format } from "date-fns";
import { desc, eq } from "drizzle-orm";
import { findApplicationById, updateApplicationStatus, } from "./application.js";
import { findBackupById } from "./backup.js";
import { findComposeById, updateCompose } from "./compose.js";
import { findPreviewDeploymentById, updatePreviewDeployment, } from "./preview-deployment.js";
import { removeRollbackById } from "./rollbacks.js";
import { findScheduleById } from "./schedule.js";
import { findServerById } from "./server.js";
import { findVolumeBackupById } from "./volume-backups.js";
export const findDeploymentById = async (deploymentId) => {
    const deployment = await db.query.deployments.findFirst({
        where: eq(deployments.deploymentId, deploymentId),
        with: {
            application: true,
            schedule: true,
        },
    });
    if (!deployment) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Deployment not found",
        });
    }
    return deployment;
};
export const findDeploymentByApplicationId = async (applicationId) => {
    const deployment = await db.query.deployments.findFirst({
        where: eq(deployments.applicationId, applicationId),
    });
    if (!deployment) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Deployment not found",
        });
    }
    return deployment;
};
export const createDeployment = async (deployment) => {
    const application = await findApplicationById(deployment.applicationId);
    try {
        await removeLastTenDeployments(deployment.applicationId, "application", application.serverId);
        const serverId = application.serverId;
        const { LOGS_PATH } = paths(!!serverId);
        const formattedDateTime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
        const fileName = `${application.appName}-${formattedDateTime}.log`;
        const logFilePath = path.join(LOGS_PATH, application.appName, fileName);
        if (serverId) {
            const server = await findServerById(serverId);
            const command = `
				mkdir -p ${LOGS_PATH}/${application.appName};
            	echo "Initializing deployment" >> ${logFilePath};
			`;
            await execAsyncRemote(server.serverId, command);
        }
        else {
            await fsPromises.mkdir(path.join(LOGS_PATH, application.appName), {
                recursive: true,
            });
            await fsPromises.writeFile(logFilePath, "Initializing deployment\n");
        }
        const deploymentCreate = await db
            .insert(deployments)
            .values({
            applicationId: deployment.applicationId,
            title: deployment.title || "Deployment",
            status: "running",
            logPath: logFilePath,
            description: deployment.description || "",
            startedAt: new Date().toISOString(),
        })
            .returning();
        if (deploymentCreate.length === 0 || !deploymentCreate[0]) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the deployment",
            });
        }
        return deploymentCreate[0];
    }
    catch (error) {
        await db
            .insert(deployments)
            .values({
            applicationId: deployment.applicationId,
            title: deployment.title || "Deployment",
            status: "error",
            logPath: "",
            description: deployment.description || "",
            errorMessage: `An error have occured: ${error instanceof Error ? error.message : error}`,
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
        })
            .returning();
        await updateApplicationStatus(application.applicationId, "error");
        console.log(error);
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the deployment",
        });
    }
};
export const createDeploymentPreview = async (deployment) => {
    const previewDeployment = await findPreviewDeploymentById(deployment.previewDeploymentId);
    try {
        await removeLastTenDeployments(deployment.previewDeploymentId, "previewDeployment", previewDeployment?.application?.serverId);
        const appName = `${previewDeployment.appName}`;
        const { LOGS_PATH } = paths(!!previewDeployment?.application?.serverId);
        const formattedDateTime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
        const fileName = `${appName}-${formattedDateTime}.log`;
        const logFilePath = path.join(LOGS_PATH, appName, fileName);
        if (previewDeployment?.application?.serverId) {
            const server = await findServerById(previewDeployment?.application?.serverId);
            const command = `
				mkdir -p ${LOGS_PATH}/${appName};
            	echo "Initializing deployment" >> ${logFilePath};
			`;
            await execAsyncRemote(server.serverId, command);
        }
        else {
            await fsPromises.mkdir(path.join(LOGS_PATH, appName), {
                recursive: true,
            });
            await fsPromises.writeFile(logFilePath, "Initializing deployment");
        }
        const deploymentCreate = await db
            .insert(deployments)
            .values({
            title: deployment.title || "Deployment",
            status: "running",
            logPath: logFilePath,
            description: deployment.description || "",
            previewDeploymentId: deployment.previewDeploymentId,
            startedAt: new Date().toISOString(),
        })
            .returning();
        if (deploymentCreate.length === 0 || !deploymentCreate[0]) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the deployment",
            });
        }
        return deploymentCreate[0];
    }
    catch (error) {
        await db
            .insert(deployments)
            .values({
            previewDeploymentId: deployment.previewDeploymentId,
            title: deployment.title || "Deployment",
            status: "error",
            logPath: "",
            description: deployment.description || "",
            errorMessage: `An error have occured: ${error instanceof Error ? error.message : error}`,
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
        })
            .returning();
        await updatePreviewDeployment(deployment.previewDeploymentId, {
            previewStatus: "error",
        });
        console.log(error);
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the deployment",
        });
    }
};
export const createDeploymentCompose = async (deployment) => {
    const compose = await findComposeById(deployment.composeId);
    try {
        await removeLastTenDeployments(deployment.composeId, "compose", compose.serverId);
        const { LOGS_PATH } = paths(!!compose.serverId);
        const formattedDateTime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
        const fileName = `${compose.appName}-${formattedDateTime}.log`;
        const logFilePath = path.join(LOGS_PATH, compose.appName, fileName);
        if (compose.serverId) {
            const server = await findServerById(compose.serverId);
            const command = `
mkdir -p ${LOGS_PATH}/${compose.appName};
echo "Initializing deployment\n" >> ${logFilePath};
`;
            await execAsyncRemote(server.serverId, command);
        }
        else {
            await fsPromises.mkdir(path.join(LOGS_PATH, compose.appName), {
                recursive: true,
            });
            await fsPromises.writeFile(logFilePath, "Initializing deployment\n");
        }
        const deploymentCreate = await db
            .insert(deployments)
            .values({
            composeId: deployment.composeId,
            title: deployment.title || "Deployment",
            description: deployment.description || "",
            status: "running",
            logPath: logFilePath,
            startedAt: new Date().toISOString(),
        })
            .returning();
        if (deploymentCreate.length === 0 || !deploymentCreate[0]) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the deployment",
            });
        }
        return deploymentCreate[0];
    }
    catch (error) {
        await db
            .insert(deployments)
            .values({
            composeId: deployment.composeId,
            title: deployment.title || "Deployment",
            status: "error",
            logPath: "",
            description: deployment.description || "",
            errorMessage: `An error have occured: ${error instanceof Error ? error.message : error}`,
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
        })
            .returning();
        await updateCompose(compose.composeId, {
            composeStatus: "error",
        });
        console.log(error);
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the deployment",
        });
    }
};
export const createDeploymentBackup = async (deployment) => {
    const backup = await findBackupById(deployment.backupId);
    let serverId;
    if (backup.backupType === "database") {
        serverId =
            backup.postgres?.serverId ||
                backup.mariadb?.serverId ||
                backup.mysql?.serverId ||
                backup.mongo?.serverId;
    }
    else if (backup.backupType === "compose") {
        serverId = backup.compose?.serverId;
    }
    try {
        await removeLastTenDeployments(deployment.backupId, "backup", serverId);
        const { LOGS_PATH } = paths(!!serverId);
        const formattedDateTime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
        const fileName = `${backup.appName}-${formattedDateTime}.log`;
        const logFilePath = path.join(LOGS_PATH, backup.appName, fileName);
        if (serverId) {
            const server = await findServerById(serverId);
            const command = `
mkdir -p ${LOGS_PATH}/${backup.appName};
echo "Initializing backup\n" >> ${logFilePath};
`;
            await execAsyncRemote(server.serverId, command);
        }
        else {
            await fsPromises.mkdir(path.join(LOGS_PATH, backup.appName), {
                recursive: true,
            });
            await fsPromises.writeFile(logFilePath, "Initializing backup\n");
        }
        const deploymentCreate = await db
            .insert(deployments)
            .values({
            backupId: deployment.backupId,
            title: deployment.title || "Backup",
            description: deployment.description || "",
            status: "running",
            logPath: logFilePath,
            startedAt: new Date().toISOString(),
        })
            .returning();
        if (deploymentCreate.length === 0 || !deploymentCreate[0]) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the backup",
            });
        }
        return deploymentCreate[0];
    }
    catch (error) {
        await db
            .insert(deployments)
            .values({
            backupId: deployment.backupId,
            title: deployment.title || "Backup",
            status: "error",
            logPath: "",
            description: deployment.description || "",
            errorMessage: `An error have occured: ${error instanceof Error ? error.message : error}`,
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
        })
            .returning();
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the backup",
        });
    }
};
export const createDeploymentSchedule = async (deployment) => {
    const schedule = await findScheduleById(deployment.scheduleId);
    try {
        const serverId = schedule.application?.serverId ||
            schedule.compose?.serverId ||
            schedule.server?.serverId;
        await removeLastTenDeployments(deployment.scheduleId, "schedule", serverId);
        const { SCHEDULES_PATH } = paths(!!serverId);
        const formattedDateTime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
        const fileName = `${schedule.appName}-${formattedDateTime}.log`;
        const logFilePath = path.join(SCHEDULES_PATH, schedule.appName, fileName);
        if (serverId) {
            const server = await findServerById(serverId);
            const command = `
				mkdir -p ${SCHEDULES_PATH}/${schedule.appName};
            	echo "Initializing schedule" >> ${logFilePath};
			`;
            await execAsyncRemote(server.serverId, command);
        }
        else {
            await fsPromises.mkdir(path.join(SCHEDULES_PATH, schedule.appName), {
                recursive: true,
            });
            await fsPromises.writeFile(logFilePath, "Initializing schedule\n");
        }
        const deploymentCreate = await db
            .insert(deployments)
            .values({
            scheduleId: deployment.scheduleId,
            title: deployment.title || "Deployment",
            status: "running",
            logPath: logFilePath,
            description: deployment.description || "",
            startedAt: new Date().toISOString(),
        })
            .returning();
        if (deploymentCreate.length === 0 || !deploymentCreate[0]) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the deployment",
            });
        }
        return deploymentCreate[0];
    }
    catch (error) {
        console.log(error);
        await db
            .insert(deployments)
            .values({
            scheduleId: deployment.scheduleId,
            title: deployment.title || "Deployment",
            status: "error",
            logPath: "",
            description: deployment.description || "",
            errorMessage: `An error have occured: ${error instanceof Error ? error.message : error}`,
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
        })
            .returning();
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the deployment",
        });
    }
};
export const createDeploymentVolumeBackup = async (deployment) => {
    const volumeBackup = await findVolumeBackupById(deployment.volumeBackupId);
    try {
        const serverId = volumeBackup.application?.serverId || volumeBackup.compose?.serverId;
        await removeLastTenDeployments(deployment.volumeBackupId, "volumeBackup", serverId);
        const { VOLUME_BACKUPS_PATH } = paths(!!serverId);
        const formattedDateTime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
        const fileName = `${volumeBackup.appName}-${formattedDateTime}.log`;
        const logFilePath = path.join(VOLUME_BACKUPS_PATH, volumeBackup.appName, fileName);
        if (serverId) {
            const server = await findServerById(serverId);
            const command = `
				mkdir -p ${VOLUME_BACKUPS_PATH}/${volumeBackup.appName};
            	echo "Initializing volume backup" >> ${logFilePath};
			`;
            await execAsyncRemote(server.serverId, command);
        }
        else {
            await fsPromises.mkdir(path.join(VOLUME_BACKUPS_PATH, volumeBackup.appName), {
                recursive: true,
            });
            await fsPromises.writeFile(logFilePath, "Initializing volume backup\n");
        }
        const deploymentCreate = await db
            .insert(deployments)
            .values({
            volumeBackupId: deployment.volumeBackupId,
            title: deployment.title || "Deployment",
            status: "running",
            logPath: logFilePath,
            description: deployment.description || "",
            startedAt: new Date().toISOString(),
        })
            .returning();
        if (deploymentCreate.length === 0 || !deploymentCreate[0]) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the deployment",
            });
        }
        return deploymentCreate[0];
    }
    catch (error) {
        console.log(error);
        await db
            .insert(deployments)
            .values({
            volumeBackupId: deployment.volumeBackupId,
            title: deployment.title || "Deployment",
            status: "error",
            logPath: "",
            description: deployment.description || "",
            errorMessage: `An error have occured: ${error instanceof Error ? error.message : error}`,
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
        })
            .returning();
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the deployment",
        });
    }
};
export const removeDeployment = async (deploymentId) => {
    try {
        const deployment = await db
            .delete(deployments)
            .where(eq(deployments.deploymentId, deploymentId))
            .returning();
        return deployment[0];
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error creating the deployment";
        throw new TRPCError({
            code: "BAD_REQUEST",
            message,
        });
    }
};
export const removeDeploymentsByApplicationId = async (applicationId) => {
    await db
        .delete(deployments)
        .where(eq(deployments.applicationId, applicationId))
        .returning();
};
const getDeploymentsByType = async (id, type) => {
    const deploymentList = await db.query.deployments.findMany({
        where: eq(deployments[`${type}Id`], id),
        orderBy: desc(deployments.createdAt),
        with: {
            rollback: true,
        },
    });
    return deploymentList;
};
export const removeDeployments = async (application) => {
    const { appName, applicationId } = application;
    const { LOGS_PATH } = paths(!!application.serverId);
    const logsPath = path.join(LOGS_PATH, appName);
    if (application.serverId) {
        await execAsyncRemote(application.serverId, `rm -rf ${logsPath}`);
    }
    else {
        await removeDirectoryIfExistsContent(logsPath);
    }
    await removeDeploymentsByApplicationId(applicationId);
};
const removeLastTenDeployments = async (id, type, serverId) => {
    const deploymentList = await getDeploymentsByType(id, type);
    if (deploymentList.length > 10) {
        const deploymentsToDelete = deploymentList.slice(10);
        if (serverId) {
            let command = "";
            for (const oldDeployment of deploymentsToDelete) {
                const logPath = path.join(oldDeployment.logPath);
                if (oldDeployment.rollbackId) {
                    await removeRollbackById(oldDeployment.rollbackId);
                }
                if (logPath !== ".") {
                    command += `
					rm -rf ${logPath};
					`;
                }
                await removeDeployment(oldDeployment.deploymentId);
            }
            await execAsyncRemote(serverId, command);
        }
        else {
            for (const oldDeployment of deploymentsToDelete) {
                if (oldDeployment.rollbackId) {
                    await removeRollbackById(oldDeployment.rollbackId);
                }
                const logPath = path.join(oldDeployment.logPath);
                if (existsSync(logPath) &&
                    !oldDeployment.errorMessage &&
                    logPath !== ".") {
                    await fsPromises.unlink(logPath);
                }
                await removeDeployment(oldDeployment.deploymentId);
            }
        }
    }
};
export const removeDeploymentsByPreviewDeploymentId = async (previewDeployment, serverId) => {
    const { appName } = previewDeployment;
    const { LOGS_PATH } = paths(!!serverId);
    const logsPath = path.join(LOGS_PATH, appName);
    if (serverId) {
        await execAsyncRemote(serverId, `rm -rf ${logsPath}`);
    }
    else {
        await removeDirectoryIfExistsContent(logsPath);
    }
    await db
        .delete(deployments)
        .where(eq(deployments.previewDeploymentId, previewDeployment.previewDeploymentId))
        .returning();
};
export const removeDeploymentsByComposeId = async (compose) => {
    const { appName } = compose;
    const { LOGS_PATH } = paths(!!compose.serverId);
    const logsPath = path.join(LOGS_PATH, appName);
    if (compose.serverId) {
        await execAsyncRemote(compose.serverId, `rm -rf ${logsPath}`);
    }
    else {
        await removeDirectoryIfExistsContent(logsPath);
    }
    await db
        .delete(deployments)
        .where(eq(deployments.composeId, compose.composeId))
        .returning();
};
export const findAllDeploymentsByApplicationId = async (applicationId) => {
    const deploymentsList = await db.query.deployments.findMany({
        where: eq(deployments.applicationId, applicationId),
        orderBy: desc(deployments.createdAt),
    });
    return deploymentsList;
};
export const findAllDeploymentsByComposeId = async (composeId) => {
    const deploymentsList = await db.query.deployments.findMany({
        where: eq(deployments.composeId, composeId),
        orderBy: desc(deployments.createdAt),
    });
    return deploymentsList;
};
export const updateDeployment = async (deploymentId, deploymentData) => {
    const application = await db
        .update(deployments)
        .set({
        ...deploymentData,
    })
        .where(eq(deployments.deploymentId, deploymentId))
        .returning();
    return application;
};
export const updateDeploymentStatus = async (deploymentId, deploymentStatus) => {
    const application = await db
        .update(deployments)
        .set({
        status: deploymentStatus,
        finishedAt: deploymentStatus === "done" || deploymentStatus === "error"
            ? new Date().toISOString()
            : null,
    })
        .where(eq(deployments.deploymentId, deploymentId))
        .returning();
    return application;
};
export const createServerDeployment = async (deployment) => {
    try {
        const { LOGS_PATH } = paths();
        const server = await findServerById(deployment.serverId);
        await removeLastFiveDeployments(deployment.serverId);
        const formattedDateTime = format(new Date(), "yyyy-MM-dd:HH:mm:ss");
        const fileName = `${server.appName}-${formattedDateTime}.log`;
        const logFilePath = path.join(LOGS_PATH, server.appName, fileName);
        await fsPromises.mkdir(path.join(LOGS_PATH, server.appName), {
            recursive: true,
        });
        await fsPromises.writeFile(logFilePath, "Initializing Setup Server");
        const deploymentCreate = await db
            .insert(deployments)
            .values({
            serverId: server.serverId,
            title: deployment.title || "Deployment",
            description: deployment.description || "",
            status: "running",
            logPath: logFilePath,
        })
            .returning();
        if (deploymentCreate.length === 0 || !deploymentCreate[0]) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the deployment",
            });
        }
        return deploymentCreate[0];
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error creating the deployment";
        throw new TRPCError({
            code: "BAD_REQUEST",
            message,
        });
    }
};
export const removeLastFiveDeployments = async (serverId) => {
    const deploymentList = await db.query.deployments.findMany({
        where: eq(deployments.serverId, serverId),
        orderBy: desc(deployments.createdAt),
    });
    if (deploymentList.length >= 5) {
        const deploymentsToDelete = deploymentList.slice(4);
        for (const oldDeployment of deploymentsToDelete) {
            const logPath = path.join(oldDeployment.logPath);
            if (existsSync(logPath)) {
                await fsPromises.unlink(logPath);
            }
            await removeDeployment(oldDeployment.deploymentId);
        }
    }
};
export const removeDeploymentsByServerId = async (server) => {
    const { LOGS_PATH } = paths();
    const { appName } = server;
    const logsPath = path.join(LOGS_PATH, appName);
    await removeDirectoryIfExistsContent(logsPath);
    await db
        .delete(deployments)
        .where(eq(deployments.serverId, server.serverId))
        .returning();
};
export const findAllDeploymentsByServerId = async (serverId) => {
    const deploymentsList = await db.query.deployments.findMany({
        where: eq(deployments.serverId, serverId),
        orderBy: desc(deployments.createdAt),
    });
    return deploymentsList;
};

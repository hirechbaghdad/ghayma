import { docker } from "../constants/index.js";
import { db } from "../db/index.js";
import { applications, buildAppName, } from "../db/schema/index.js";
import { getAdvancedStats } from "../monitoring/utils.js";
import { getBuildCommand, mechanizeDockerContainer, } from "../utils/builders/index.js";
import { sendBuildErrorNotifications } from "../utils/notifications/build-error.js";
import { sendBuildSuccessNotifications } from "../utils/notifications/build-success.js";
import { ExecError, execAsync, execAsyncRemote, } from "../utils/process/execAsync.js";
import { cloneBitbucketRepository } from "../utils/providers/bitbucket.js";
import { buildRemoteDocker } from "../utils/providers/docker.js";
import { cloneGitRepository, getGitCommitInfo, } from "../utils/providers/git.js";
import { cloneGiteaRepository } from "../utils/providers/gitea.js";
import { cloneGithubRepository } from "../utils/providers/github.js";
import { cloneGitlabRepository } from "../utils/providers/gitlab.js";
import { createTraefikConfig } from "../utils/traefik/application.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { encodeBase64 } from "../utils/docker/utils.js";
import { getDokployUrl } from "./admin.js";
import { createDeployment, createDeploymentPreview, updateDeployment, updateDeploymentStatus, } from "./deployment.js";
import { getDomainHost } from "./domain.js";
import { createPreviewDeploymentComment, getIssueComment, issueCommentExists, updateIssueComment, } from "./github.js";
import { findPreviewDeploymentById, updatePreviewDeployment, } from "./preview-deployment.js";
import { validUniqueServerAppName } from "./project.js";
import { createRollback } from "./rollbacks.js";
export const createApplication = async (input) => {
    const appName = buildAppName("app", input.appName);
    const valid = await validUniqueServerAppName(appName);
    if (!valid) {
        throw new TRPCError({
            code: "CONFLICT",
            message: "Application with this 'AppName' already exists",
        });
    }
    return await db.transaction(async (tx) => {
        const newApplication = await tx
            .insert(applications)
            .values({
            ...input,
            appName,
        })
            .returning()
            .then((value) => value[0]);
        if (!newApplication) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the application",
            });
        }
        if (process.env.NODE_ENV === "development") {
            createTraefikConfig(newApplication.appName);
        }
        return newApplication;
    });
};
export const findApplicationById = async (applicationId) => {
    const application = await db.query.applications.findFirst({
        where: eq(applications.applicationId, applicationId),
        with: {
            environment: {
                with: {
                    project: true,
                },
            },
            domains: true,
            deployments: true,
            mounts: true,
            redirects: true,
            security: true,
            ports: true,
            registry: true,
            gitlab: true,
            github: true,
            bitbucket: true,
            gitea: true,
            server: true,
            previewDeployments: true,
        },
    });
    if (!application) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Application not found",
        });
    }
    return application;
};
export const findApplicationByName = async (appName) => {
    const application = await db.query.applications.findFirst({
        where: eq(applications.appName, appName),
    });
    return application;
};
export const updateApplication = async (applicationId, applicationData) => {
    const { appName, ...rest } = applicationData;
    const application = await db
        .update(applications)
        .set({
        ...rest,
    })
        .where(eq(applications.applicationId, applicationId))
        .returning();
    return application[0];
};
export const updateApplicationStatus = async (applicationId, applicationStatus) => {
    const application = await db
        .update(applications)
        .set({
        applicationStatus: applicationStatus,
    })
        .where(eq(applications.applicationId, applicationId))
        .returning();
    return application;
};
export const deployApplication = async ({ applicationId, titleLog = "Manual deployment", descriptionLog = "", }) => {
    const application = await findApplicationById(applicationId);
    const buildLink = `${await getDokployUrl()}/dashboard/project/${application.environment.projectId}/environment/${application.environmentId}/services/application/${application.applicationId}?tab=deployments`;
    const deployment = await createDeployment({
        applicationId: applicationId,
        title: titleLog,
        description: descriptionLog,
    });
    try {
        let command = "set -e;";
        if (application.sourceType === "github") {
            command += await cloneGithubRepository(application);
        }
        else if (application.sourceType === "gitlab") {
            command += await cloneGitlabRepository(application);
        }
        else if (application.sourceType === "gitea") {
            command += await cloneGiteaRepository(application);
        }
        else if (application.sourceType === "bitbucket") {
            command += await cloneBitbucketRepository(application);
        }
        else if (application.sourceType === "git") {
            command += await cloneGitRepository(application);
        }
        else if (application.sourceType === "docker") {
            command += await buildRemoteDocker(application);
        }
        command += getBuildCommand(application);
        const commandWithLog = `(${command}) >> ${deployment.logPath} 2>&1`;
        if (application.serverId) {
            await execAsyncRemote(application.serverId, commandWithLog);
        }
        else {
            await execAsync(commandWithLog);
        }
        await mechanizeDockerContainer(application);
        await updateDeploymentStatus(deployment.deploymentId, "done");
        await updateApplicationStatus(applicationId, "done");
        if (application.rollbackActive) {
            const tagImage = application.sourceType === "docker"
                ? application.dockerImage
                : application.appName;
            await createRollback({
                appName: tagImage || "",
                deploymentId: deployment.deploymentId,
            });
        }
        await sendBuildSuccessNotifications({
            projectName: application.environment.project.name,
            applicationName: application.name,
            applicationType: "application",
            buildLink,
            organizationId: application.environment.project.organizationId,
            domains: application.domains,
            environmentName: application.environment.name,
        });
    }
    catch (error) {
        let command = "";
        // Only log details for non-ExecError errors
        if (!(error instanceof ExecError)) {
            const message = error instanceof Error ? error.message : String(error);
            const encodedMessage = encodeBase64(message);
            command += `echo "${encodedMessage}" | base64 -d >> "${deployment.logPath}";`;
        }
        command += `echo "\nError occurred ❌, check the logs for details." >> ${deployment.logPath};`;
        if (application.serverId) {
            await execAsyncRemote(application.serverId, command);
        }
        else {
            await execAsync(command);
        }
        await updateDeploymentStatus(deployment.deploymentId, "error");
        await updateApplicationStatus(applicationId, "error");
        await sendBuildErrorNotifications({
            projectName: application.environment.project.name,
            applicationName: application.name,
            applicationType: "application",
            // @ts-ignore
            errorMessage: error?.message || "Error building",
            buildLink,
            organizationId: application.environment.project.organizationId,
        });
        throw error;
    }
    finally {
        // Only extract commit info for non-docker sources
        if (application.sourceType !== "docker") {
            const commitInfo = await getGitCommitInfo(application);
            if (commitInfo) {
                await updateDeployment(deployment.deploymentId, {
                    title: commitInfo.message,
                    description: `Commit: ${commitInfo.hash}`,
                });
            }
        }
    }
    return true;
};
export const rebuildApplication = async ({ applicationId, titleLog = "Rebuild deployment", descriptionLog = "", }) => {
    const application = await findApplicationById(applicationId);
    const buildLink = `${await getDokployUrl()}/dashboard/project/${application.environment.projectId}/environment/${application.environmentId}/services/application/${application.applicationId}?tab=deployments`;
    const deployment = await createDeployment({
        applicationId: applicationId,
        title: titleLog,
        description: descriptionLog,
    });
    try {
        let command = "set -e;";
        // Check case for docker only
        command += getBuildCommand(application);
        const commandWithLog = `(${command}) >> ${deployment.logPath} 2>&1`;
        if (application.serverId) {
            await execAsyncRemote(application.serverId, commandWithLog);
        }
        else {
            await execAsync(commandWithLog);
        }
        await mechanizeDockerContainer(application);
        await updateDeploymentStatus(deployment.deploymentId, "done");
        await updateApplicationStatus(applicationId, "done");
        if (application.rollbackActive) {
            const tagImage = application.sourceType === "docker"
                ? application.dockerImage
                : application.appName;
            await createRollback({
                appName: tagImage || "",
                deploymentId: deployment.deploymentId,
            });
        }
        await sendBuildSuccessNotifications({
            projectName: application.environment.project.name,
            applicationName: application.name,
            applicationType: "application",
            buildLink,
            organizationId: application.environment.project.organizationId,
            domains: application.domains,
            environmentName: application.environment.name,
        });
    }
    catch (error) {
        let command = "";
        // Only log details for non-ExecError errors
        if (!(error instanceof ExecError)) {
            const message = error instanceof Error ? error.message : String(error);
            const encodedMessage = encodeBase64(message);
            command += `echo "${encodedMessage}" | base64 -d >> "${deployment.logPath}";`;
        }
        command += `echo "\nError occurred ❌, check the logs for details." >> ${deployment.logPath};`;
        if (application.serverId) {
            await execAsyncRemote(application.serverId, command);
        }
        else {
            await execAsync(command);
        }
        await updateDeploymentStatus(deployment.deploymentId, "error");
        await updateApplicationStatus(applicationId, "error");
        throw error;
    }
    return true;
};
export const deployPreviewApplication = async ({ applicationId, titleLog = "Preview Deployment", descriptionLog = "", previewDeploymentId, }) => {
    const application = await findApplicationById(applicationId);
    const deployment = await createDeploymentPreview({
        title: titleLog,
        description: descriptionLog,
        previewDeploymentId: previewDeploymentId,
    });
    const previewDeployment = await findPreviewDeploymentById(previewDeploymentId);
    await updatePreviewDeployment(previewDeploymentId, {
        createdAt: new Date().toISOString(),
    });
    const previewDomain = getDomainHost(previewDeployment?.domain);
    const issueParams = {
        owner: application?.owner || "",
        repository: application?.repository || "",
        issue_number: previewDeployment.pullRequestNumber,
        comment_id: Number.parseInt(previewDeployment.pullRequestCommentId),
        githubId: application?.githubId || "",
    };
    try {
        const commentExists = await issueCommentExists({
            ...issueParams,
        });
        if (!commentExists) {
            const result = await createPreviewDeploymentComment({
                ...issueParams,
                previewDomain,
                appName: previewDeployment.appName,
                githubId: application?.githubId || "",
                previewDeploymentId,
            });
            if (!result) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Pull request comment not found",
                });
            }
            issueParams.comment_id = Number.parseInt(result?.pullRequestCommentId);
        }
        const buildingComment = getIssueComment(application.name, "running", previewDomain);
        await updateIssueComment({
            ...issueParams,
            body: `### Dokploy Preview Deployment\n\n${buildingComment}`,
        });
        application.appName = previewDeployment.appName;
        application.env = `${application.previewEnv}\nDOKPLOY_DEPLOY_URL=${previewDeployment?.domain?.host}`;
        application.buildArgs = `${application.previewBuildArgs}\nDOKPLOY_DEPLOY_URL=${previewDeployment?.domain?.host}`;
        application.buildSecrets = `${application.previewBuildSecrets}\nDOKPLOY_DEPLOY_URL=${previewDeployment?.domain?.host}`;
        let command = "set -e;";
        if (application.sourceType === "github") {
            command += await cloneGithubRepository({
                ...application,
                appName: previewDeployment.appName,
                branch: previewDeployment.branch,
            });
            command += getBuildCommand(application);
            const commandWithLog = `(${command}) >> ${deployment.logPath} 2>&1`;
            if (application.serverId) {
                await execAsyncRemote(application.serverId, commandWithLog);
            }
            else {
                await execAsync(commandWithLog);
            }
            await mechanizeDockerContainer(application);
        }
        const successComment = getIssueComment(application.name, "success", previewDomain);
        await updateIssueComment({
            ...issueParams,
            body: `### Dokploy Preview Deployment\n\n${successComment}`,
        });
        await updateDeploymentStatus(deployment.deploymentId, "done");
        await updatePreviewDeployment(previewDeploymentId, {
            previewStatus: "done",
        });
    }
    catch (error) {
        const comment = getIssueComment(application.name, "error", previewDomain);
        await updateIssueComment({
            ...issueParams,
            body: `### Dokploy Preview Deployment\n\n${comment}`,
        });
        await updateDeploymentStatus(deployment.deploymentId, "error");
        await updatePreviewDeployment(previewDeploymentId, {
            previewStatus: "error",
        });
        throw error;
    }
    return true;
};
export const getApplicationStats = async (appName) => {
    if (appName === "dokploy") {
        return await getAdvancedStats(appName);
    }
    const filter = {
        status: ["running"],
        label: [`com.docker.swarm.service.name=${appName}`],
    };
    const containers = await docker.listContainers({
        filters: JSON.stringify(filter),
    });
    const container = containers[0];
    if (!container || container?.State !== "running") {
        return null;
    }
    const data = await getAdvancedStats(appName);
    return data;
};

import fs, { promises as fsPromises } from "node:fs";
import path from "node:path";
import { paths } from "../../constants/index.js";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
export const recreateDirectory = async (pathFolder) => {
    try {
        await removeDirectoryIfExistsContent(pathFolder);
        await fsPromises.mkdir(pathFolder, { recursive: true });
    }
    catch (error) {
        console.error(`Error recreating directory '${pathFolder}':`, error);
    }
};
export const recreateDirectoryRemote = async (pathFolder, serverId) => {
    try {
        await execAsyncRemote(serverId, `rm -rf ${pathFolder}; mkdir -p ${pathFolder}`);
    }
    catch (error) {
        console.error(`Error recreating directory '${pathFolder}':`, error);
    }
};
export const removeDirectoryIfExistsContent = async (path) => {
    if (fs.existsSync(path) && fs.readdirSync(path).length !== 0) {
        await execAsync(`rm -rf ${path}`);
    }
};
export const removeFileOrDirectory = async (path) => {
    try {
        await execAsync(`rm -rf ${path}`);
    }
    catch (error) {
        console.error(`Error removing ${path}: ${error}`);
        throw error;
    }
};
export const removeDirectoryCode = async (appName, serverId) => {
    const { APPLICATIONS_PATH } = paths(!!serverId);
    const directoryPath = path.join(APPLICATIONS_PATH, appName);
    const command = `rm -rf ${directoryPath}`;
    try {
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
    }
    catch (error) {
        console.error(`Error removing ${directoryPath}: ${error}`);
        throw error;
    }
};
export const removeComposeDirectory = async (appName, serverId) => {
    const { COMPOSE_PATH } = paths(!!serverId);
    const directoryPath = path.join(COMPOSE_PATH, appName);
    const command = `rm -rf ${directoryPath}`;
    try {
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
    }
    catch (error) {
        console.error(`Error removing ${directoryPath}: ${error}`);
        throw error;
    }
};
export const removeMonitoringDirectory = async (appName, serverId) => {
    const { MONITORING_PATH } = paths(!!serverId);
    const directoryPath = path.join(MONITORING_PATH, appName);
    const command = `rm -rf ${directoryPath}`;
    try {
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
    }
    catch (error) {
        console.error(`Error removing ${directoryPath}: ${error}`);
        throw error;
    }
};
export const getBuildAppDirectory = (application) => {
    const { APPLICATIONS_PATH } = paths(!!application.serverId);
    const { appName, buildType, sourceType, customGitBuildPath, dockerfile } = application;
    let buildPath = "";
    if (sourceType === "github") {
        buildPath = application?.buildPath || "";
    }
    else if (sourceType === "gitlab") {
        buildPath = application?.gitlabBuildPath || "";
    }
    else if (sourceType === "bitbucket") {
        buildPath = application?.bitbucketBuildPath || "";
    }
    else if (sourceType === "gitea") {
        buildPath = application?.giteaBuildPath || "";
    }
    else if (sourceType === "drop") {
        buildPath = application?.dropBuildPath || "";
    }
    else if (sourceType === "git") {
        buildPath = customGitBuildPath || "";
    }
    if (buildType === "dockerfile") {
        return path.join(APPLICATIONS_PATH, appName, "code", buildPath ?? "", dockerfile || "");
    }
    return path.join(APPLICATIONS_PATH, appName, "code", buildPath ?? "");
};
export const getDockerContextPath = (application) => {
    const { APPLICATIONS_PATH } = paths(!!application.serverId);
    const { appName, dockerContextPath } = application;
    if (!dockerContextPath) {
        return null;
    }
    return path.join(APPLICATIONS_PATH, appName, "code", dockerContextPath);
};

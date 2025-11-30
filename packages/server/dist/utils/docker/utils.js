import fs from "node:fs";
import path from "node:path";
import { docker, paths } from "../../constants/index.js";
import { parse } from "dotenv";
import { quote } from "shell-quote";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
import { spawnAsync } from "../process/spawnAsync.js";
import { getRemoteDocker } from "../servers/remote-docker.js";
export const pullImage = async (dockerImage, onData, authConfig) => {
    try {
        if (!dockerImage) {
            throw new Error("Docker image not found");
        }
        if (authConfig?.username && authConfig?.password) {
            await spawnAsync("docker", [
                "login",
                authConfig.registryUrl || "",
                "-u",
                authConfig.username,
                "-p",
                authConfig.password,
            ], onData);
        }
        await spawnAsync("docker", ["pull", dockerImage], onData);
    }
    catch (error) {
        throw error;
    }
};
export const pullRemoteImage = async (dockerImage, serverId, onData, authConfig) => {
    try {
        if (!dockerImage) {
            throw new Error("Docker image not found");
        }
        const remoteDocker = await getRemoteDocker(serverId);
        await new Promise((resolve, reject) => {
            remoteDocker.pull(dockerImage, { authconfig: authConfig }, (err, stream) => {
                if (err) {
                    reject(err);
                    return;
                }
                remoteDocker.modem.followProgress(stream, (err, res) => {
                    if (!err) {
                        resolve(res);
                    }
                    if (err) {
                        reject(err);
                    }
                }, (event) => {
                    onData?.(event);
                });
            });
        });
    }
    catch (error) {
        throw error;
    }
};
export const containerExists = async (containerName) => {
    const container = docker.getContainer(containerName);
    try {
        await container.inspect();
        return true;
    }
    catch {
        return false;
    }
};
export const stopService = async (appName) => {
    try {
        await execAsync(`docker service scale ${appName}=0 `);
    }
    catch (error) {
        console.error(error);
        return error;
    }
};
export const stopServiceRemote = async (serverId, appName) => {
    try {
        await execAsyncRemote(serverId, `docker service scale ${appName}=0 `);
    }
    catch (error) {
        console.error(error);
        return error;
    }
};
export const getContainerByName = (name) => {
    const opts = {
        limit: 1,
        filters: {
            name: [name],
        },
    };
    return new Promise((resolve, reject) => {
        docker.listContainers(opts, (err, containers) => {
            if (err) {
                reject(err);
            }
            else if (containers?.length === 0) {
                reject(new Error(`No container found with name: ${name}`));
            }
            else if (containers && containers?.length > 0 && containers[0]) {
                resolve(containers[0]);
            }
        });
    });
};
export const cleanUpUnusedImages = async (serverId) => {
    try {
        const command = "docker image prune --force";
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const cleanStoppedContainers = async (serverId) => {
    try {
        const command = "docker container prune --force";
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const cleanUpUnusedVolumes = async (serverId) => {
    try {
        const command = "docker volume prune --force";
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const cleanUpInactiveContainers = async () => {
    try {
        const containers = await docker.listContainers({ all: true });
        const inactiveContainers = containers.filter((container) => container.State !== "running");
        for (const container of inactiveContainers) {
            await docker.getContainer(container.Id).remove({ force: true });
            console.log(`Cleaning up inactive container: ${container.Id}`);
        }
    }
    catch (error) {
        console.error("Error cleaning up inactive containers:", error);
        throw error;
    }
};
export const cleanUpDockerBuilder = async (serverId) => {
    const command = "docker builder prune --all --force";
    if (serverId) {
        await execAsyncRemote(serverId, command);
    }
    else {
        await execAsync(command);
    }
};
export const cleanUpSystemPrune = async (serverId) => {
    const command = "docker system prune --force --volumes";
    if (serverId) {
        await execAsyncRemote(serverId, command);
    }
    else {
        await execAsync(command);
    }
};
export const startService = async (appName) => {
    try {
        await execAsync(`docker service scale ${appName}=1 `);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const startServiceRemote = async (serverId, appName) => {
    try {
        await execAsyncRemote(serverId, `docker service scale ${appName}=1 `);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
};
export const removeService = async (appName, serverId, _deleteVolumes = false) => {
    try {
        const command = `docker service rm ${appName}`;
        if (serverId) {
            await execAsyncRemote(serverId, command);
        }
        else {
            await execAsync(command);
        }
    }
    catch (error) {
        return error;
    }
};
export const prepareEnvironmentVariables = (serviceEnv, projectEnv, environmentEnv) => {
    const projectVars = parse(projectEnv ?? "");
    const environmentVars = parse(environmentEnv ?? "");
    const serviceVars = parse(serviceEnv ?? "");
    const resolvedVars = Object.entries(serviceVars).map(([key, value]) => {
        let resolvedValue = value;
        // Replace project variables
        if (projectVars) {
            resolvedValue = resolvedValue.replace(/\$\{\{project\.(.*?)\}\}/g, (_, ref) => {
                if (projectVars[ref] !== undefined) {
                    return projectVars[ref];
                }
                throw new Error(`Invalid project environment variable: project.${ref}`);
            });
        }
        // Replace environment variables
        if (environmentVars) {
            resolvedValue = resolvedValue.replace(/\$\{\{environment\.(.*?)\}\}/g, (_, ref) => {
                if (environmentVars[ref] !== undefined) {
                    return environmentVars[ref];
                }
                throw new Error(`Invalid environment variable: environment.${ref}`);
            });
        }
        // Replace self-references (service variables)
        resolvedValue = resolvedValue.replace(/\$\{\{(.*?)\}\}/g, (_, ref) => {
            if (serviceVars[ref] !== undefined) {
                return serviceVars[ref];
            }
            throw new Error(`Invalid service environment variable: ${ref}`);
        });
        return `${key}=${resolvedValue}`;
    });
    return resolvedVars;
};
export const prepareEnvironmentVariablesForShell = (serviceEnv, projectEnv, environmentEnv) => {
    const envVars = prepareEnvironmentVariables(serviceEnv, projectEnv, environmentEnv);
    // Using shell-quote library to properly escape shell arguments
    // This is the standard way to handle special characters in shell commands
    return envVars.map((env) => quote([env]));
};
export const parseEnvironmentKeyValuePair = (pair) => {
    const [key, ...valueParts] = pair.split("=");
    if (!key || !valueParts.length) {
        throw new Error(`Invalid environment variable pair: ${pair}`);
    }
    return [key, valueParts.join("=")];
};
export const getEnviromentVariablesObject = (input, projectEnv, environmentEnv) => {
    const envs = prepareEnvironmentVariables(input, projectEnv, environmentEnv);
    const jsonObject = {};
    for (const pair of envs) {
        const [key, value] = parseEnvironmentKeyValuePair(pair);
        if (key && value) {
            jsonObject[key] = value;
        }
    }
    return jsonObject;
};
export const generateVolumeMounts = (mounts) => {
    if (!mounts || mounts.length === 0) {
        return [];
    }
    return mounts
        .filter((mount) => mount.type === "volume")
        .map((mount) => ({
        Type: "volume",
        Source: mount.volumeName || "",
        Target: mount.mountPath,
    }));
};
export const calculateResources = ({ memoryLimit, memoryReservation, cpuLimit, cpuReservation, }) => {
    return {
        Limits: {
            MemoryBytes: memoryLimit ? Number.parseInt(memoryLimit) : undefined,
            NanoCPUs: cpuLimit ? Number.parseInt(cpuLimit) : undefined,
        },
        Reservations: {
            MemoryBytes: memoryReservation
                ? Number.parseInt(memoryReservation)
                : undefined,
            NanoCPUs: cpuReservation ? Number.parseInt(cpuReservation) : undefined,
        },
    };
};
export const generateConfigContainer = (application) => {
    const { healthCheckSwarm, restartPolicySwarm, placementSwarm, updateConfigSwarm, rollbackConfigSwarm, modeSwarm, labelsSwarm, replicas, mounts, networkSwarm, stopGracePeriodSwarm, endpointSpecSwarm, } = application;
    const sanitizedStopGracePeriodSwarm = typeof stopGracePeriodSwarm === "bigint"
        ? Number(stopGracePeriodSwarm)
        : stopGracePeriodSwarm;
    const haveMounts = mounts && mounts.length > 0;
    return {
        ...(healthCheckSwarm && {
            HealthCheck: healthCheckSwarm,
        }),
        ...(restartPolicySwarm && {
            RestartPolicy: restartPolicySwarm,
        }),
        ...(placementSwarm
            ? {
                Placement: placementSwarm,
            }
            : {
                // if app have mounts keep manager as constraint
                Placement: {
                    Constraints: haveMounts ? ["node.role==manager"] : [],
                },
            }),
        ...(labelsSwarm && {
            Labels: labelsSwarm,
        }),
        ...(modeSwarm
            ? {
                Mode: modeSwarm,
            }
            : {
                // use replicas value if no modeSwarm provided
                Mode: {
                    Replicated: {
                        Replicas: replicas,
                    },
                },
            }),
        ...(rollbackConfigSwarm && {
            RollbackConfig: rollbackConfigSwarm,
        }),
        ...(updateConfigSwarm
            ? { UpdateConfig: updateConfigSwarm }
            : {
                // default config if no updateConfigSwarm provided
                UpdateConfig: {
                    Parallelism: 1,
                    Order: "start-first",
                },
            }),
        ...(sanitizedStopGracePeriodSwarm !== null &&
            sanitizedStopGracePeriodSwarm !== undefined && {
            StopGracePeriod: sanitizedStopGracePeriodSwarm,
        }),
        ...(networkSwarm
            ? {
                Networks: networkSwarm,
            }
            : {
                Networks: [{ Target: "dokploy-network" }],
            }),
        ...(endpointSpecSwarm && {
            EndpointSpec: {
                ...(endpointSpecSwarm.Mode && { Mode: endpointSpecSwarm.Mode }),
                Ports: endpointSpecSwarm.Ports?.map((port) => ({
                    Protocol: (port.Protocol || "tcp"),
                    TargetPort: port.TargetPort || 0,
                    PublishedPort: port.PublishedPort || 0,
                    PublishMode: (port.PublishMode || "host"),
                })) || [],
            },
        }),
    };
};
export const generateBindMounts = (mounts) => {
    if (!mounts || mounts.length === 0) {
        return [];
    }
    return mounts
        .filter((mount) => mount.type === "bind")
        .map((mount) => ({
        Type: "bind",
        Source: mount.hostPath || "",
        Target: mount.mountPath,
    }));
};
export const generateFileMounts = (appName, service) => {
    const { mounts } = service;
    const { APPLICATIONS_PATH } = paths(!!service.serverId);
    if (!mounts || mounts.length === 0) {
        return [];
    }
    return mounts
        .filter((mount) => mount.type === "file")
        .map((mount) => {
        const fileName = mount.filePath;
        const absoluteBasePath = path.resolve(APPLICATIONS_PATH);
        const directory = path.join(absoluteBasePath, appName, "files");
        const sourcePath = path.join(directory, fileName || "");
        return {
            Type: "bind",
            Source: sourcePath,
            Target: mount.mountPath,
        };
    });
};
export const createFile = async (outputPath, filePath, content) => {
    try {
        const fullPath = path.join(outputPath, filePath);
        if (fullPath.endsWith(path.sep) || filePath.endsWith("/")) {
            fs.mkdirSync(fullPath, { recursive: true });
            return;
        }
        const directory = path.dirname(fullPath);
        fs.mkdirSync(directory, { recursive: true });
        fs.writeFileSync(fullPath, content || "");
    }
    catch (error) {
        throw error;
    }
};
export const encodeBase64 = (content) => Buffer.from(content, "utf-8").toString("base64");
export const getCreateFileCommand = (outputPath, filePath, content) => {
    const fullPath = path.join(outputPath, filePath);
    if (fullPath.endsWith(path.sep) || filePath.endsWith("/")) {
        return `mkdir -p ${fullPath};`;
    }
    const directory = path.dirname(fullPath);
    const encodedContent = encodeBase64(content);
    return `
		mkdir -p ${directory};
		echo "${encodedContent}" | base64 -d > "${fullPath}";
	`;
};
export const getServiceContainer = async (appName, serverId) => {
    try {
        const filter = {
            status: ["running"],
            label: [`com.docker.swarm.service.name=${appName}`],
        };
        const remoteDocker = await getRemoteDocker(serverId);
        const containers = await remoteDocker.listContainers({
            filters: JSON.stringify(filter),
        });
        if (containers.length === 0 || !containers[0]) {
            return null;
        }
        const container = containers[0];
        return container;
    }
    catch (error) {
        throw error;
    }
};
export const getComposeContainer = async (compose, serviceName) => {
    try {
        const { appName, composeType, serverId } = compose;
        // 1. Determine the correct labels based on composeType
        const labels = [];
        if (composeType === "stack") {
            // Labels for Docker Swarm stack services
            labels.push(`com.docker.stack.namespace=${appName}`);
            labels.push(`com.docker.swarm.service.name=${appName}_${serviceName}`);
        }
        else {
            // Labels for Docker Compose projects (default)
            labels.push(`com.docker.compose.project=${appName}`);
            labels.push(`com.docker.compose.service=${serviceName}`);
        }
        const filter = {
            status: ["running"],
            label: labels,
        };
        const remoteDocker = await getRemoteDocker(serverId);
        const containers = await remoteDocker.listContainers({
            filters: JSON.stringify(filter),
            limit: 1,
        });
        if (containers.length === 0 || !containers[0]) {
            return null;
        }
        const container = containers[0];
        return container;
    }
    catch (error) {
        throw error;
    }
};

import { uploadImageRemoteCommand } from "../cluster/upload.js";
import { calculateResources, generateBindMounts, generateConfigContainer, generateFileMounts, generateVolumeMounts, prepareEnvironmentVariables, } from "../docker/utils.js";
import { getRemoteDocker } from "../servers/remote-docker.js";
import { getDockerCommand } from "./docker-file.js";
import { getHerokuCommand } from "./heroku.js";
import { getNixpacksCommand } from "./nixpacks.js";
import { getPaketoCommand } from "./paketo.js";
import { getRailpackCommand } from "./railpack.js";
import { getStaticCommand } from "./static.js";
export const getBuildCommand = (application) => {
    let command = "";
    const { buildType, registry } = application;
    if (application.sourceType === "docker") {
        return "";
    }
    switch (buildType) {
        case "nixpacks":
            command = getNixpacksCommand(application);
            break;
        case "heroku_buildpacks":
            command = getHerokuCommand(application);
            break;
        case "paketo_buildpacks":
            command = getPaketoCommand(application);
            break;
        case "static":
            command = getStaticCommand(application);
            break;
        case "dockerfile":
            command = getDockerCommand(application);
            break;
        case "railpack":
            command = getRailpackCommand(application);
            break;
    }
    if (registry) {
        command += uploadImageRemoteCommand(application);
    }
    return command;
};
export const mechanizeDockerContainer = async (application) => {
    const { appName, env, mounts, cpuLimit, memoryLimit, memoryReservation, cpuReservation, command, ports, } = application;
    const resources = calculateResources({
        memoryLimit,
        memoryReservation,
        cpuLimit,
        cpuReservation,
    });
    const volumesMount = generateVolumeMounts(mounts);
    const { HealthCheck, RestartPolicy, Placement, Labels, Mode, RollbackConfig, UpdateConfig, Networks, StopGracePeriod, EndpointSpec, } = generateConfigContainer(application);
    const bindsMount = generateBindMounts(mounts);
    const filesMount = generateFileMounts(appName, application);
    const envVariables = prepareEnvironmentVariables(env, application.environment.project.env, application.environment.env);
    const image = getImageName(application);
    const authConfig = getAuthConfig(application);
    const docker = await getRemoteDocker(application.serverId);
    const settings = {
        authconfig: authConfig,
        Name: appName,
        TaskTemplate: {
            ContainerSpec: {
                HealthCheck,
                Image: image,
                Env: envVariables,
                Mounts: [...volumesMount, ...bindsMount, ...filesMount],
                ...(command
                    ? {
                        Command: ["/bin/sh"],
                        Args: ["-c", command],
                    }
                    : {}),
                Labels,
            },
            Networks,
            RestartPolicy,
            Placement,
            Resources: {
                ...resources,
            },
        },
        Mode,
        RollbackConfig,
        EndpointSpec: EndpointSpec
            ? EndpointSpec
            : {
                Ports: ports.map((port) => ({
                    PublishMode: port.publishMode,
                    Protocol: port.protocol,
                    TargetPort: port.targetPort,
                    PublishedPort: port.publishedPort,
                })),
            },
        UpdateConfig,
        ...(StopGracePeriod !== undefined &&
            StopGracePeriod !== null && { StopGracePeriod }),
    };
    try {
        const service = docker.getService(appName);
        const inspect = await service.inspect();
        await service.update({
            version: Number.parseInt(inspect.Version.Index),
            ...settings,
            TaskTemplate: {
                ...settings.TaskTemplate,
                ForceUpdate: inspect.Spec.TaskTemplate.ForceUpdate + 1,
            },
        });
    }
    catch {
        await docker.createService(settings);
    }
};
const getImageName = (application) => {
    const { appName, sourceType, dockerImage, registry } = application;
    const imageName = `${appName}:latest`;
    if (sourceType === "docker") {
        return dockerImage || "ERROR-NO-IMAGE-PROVIDED";
    }
    if (registry) {
        const { registryUrl, imagePrefix, username } = registry;
        const registryTag = imagePrefix
            ? `${registryUrl ? `${registryUrl}/` : ""}${imagePrefix}/${imageName}`
            : `${registryUrl ? `${registryUrl}/` : ""}${username}/${imageName}`;
        return registryTag;
    }
    return imageName;
};
export const getAuthConfig = (application) => {
    const { registry, username, password, sourceType, registryUrl } = application;
    if (sourceType === "docker") {
        if (username && password) {
            return {
                password,
                username,
                serveraddress: registryUrl || "",
            };
        }
    }
    else if (registry) {
        return {
            password: registry.password,
            username: registry.username,
            serveraddress: registry.registryUrl,
        };
    }
    return undefined;
};

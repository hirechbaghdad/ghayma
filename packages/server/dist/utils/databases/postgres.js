import { calculateResources, generateBindMounts, generateConfigContainer, generateFileMounts, generateVolumeMounts, prepareEnvironmentVariables, } from "../docker/utils.js";
import { getRemoteDocker } from "../servers/remote-docker.js";
export const buildPostgres = async (postgres) => {
    const { appName, env, externalPort, dockerImage, memoryLimit, memoryReservation, cpuLimit, cpuReservation, databaseName, databaseUser, databasePassword, command, mounts, } = postgres;
    const defaultPostgresEnv = `POSTGRES_DB="${databaseName}"\nPOSTGRES_USER="${databaseUser}"\nPOSTGRES_PASSWORD="${databasePassword}"${env ? `\n${env}` : ""}`;
    const { HealthCheck, RestartPolicy, Placement, Labels, Mode, RollbackConfig, UpdateConfig, Networks, StopGracePeriod, EndpointSpec, } = generateConfigContainer(postgres);
    const resources = calculateResources({
        memoryLimit,
        memoryReservation,
        cpuLimit,
        cpuReservation,
    });
    const envVariables = prepareEnvironmentVariables(defaultPostgresEnv, postgres.environment.project.env, postgres.environment.env);
    const volumesMount = generateVolumeMounts(mounts);
    const bindsMount = generateBindMounts(mounts);
    const filesMount = generateFileMounts(appName, postgres);
    const docker = await getRemoteDocker(postgres.serverId);
    const settings = {
        Name: appName,
        TaskTemplate: {
            ContainerSpec: {
                HealthCheck,
                Image: dockerImage,
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
                Mode: "dnsrr",
                Ports: externalPort
                    ? [
                        {
                            Protocol: "tcp",
                            TargetPort: 5432,
                            PublishedPort: externalPort,
                            PublishMode: "host",
                        },
                    ]
                    : [],
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
    catch (error) {
        console.log("error", error);
        await docker.createService(settings);
    }
};

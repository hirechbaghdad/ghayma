import { calculateResources, generateBindMounts, generateConfigContainer, generateFileMounts, generateVolumeMounts, prepareEnvironmentVariables, } from "../docker/utils.js";
import { getRemoteDocker } from "../servers/remote-docker.js";
export const buildMysql = async (mysql) => {
    const { appName, env, externalPort, dockerImage, memoryLimit, memoryReservation, databaseName, databaseUser, databasePassword, databaseRootPassword, cpuLimit, cpuReservation, command, mounts, } = mysql;
    const defaultMysqlEnv = databaseUser !== "root"
        ? `MYSQL_USER="${databaseUser}"\nMYSQL_DATABASE="${databaseName}"\nMYSQL_PASSWORD="${databasePassword}"\nMYSQL_ROOT_PASSWORD="${databaseRootPassword}"${env ? `\n${env}` : ""}`
        : `MYSQL_DATABASE="${databaseName}"\nMYSQL_ROOT_PASSWORD="${databaseRootPassword}"${env ? `\n${env}` : ""}`;
    const { HealthCheck, RestartPolicy, Placement, Labels, Mode, RollbackConfig, UpdateConfig, Networks, StopGracePeriod, EndpointSpec, } = generateConfigContainer(mysql);
    const resources = calculateResources({
        memoryLimit,
        memoryReservation,
        cpuLimit,
        cpuReservation,
    });
    const envVariables = prepareEnvironmentVariables(defaultMysqlEnv, mysql.environment.project.env, mysql.environment.env);
    const volumesMount = generateVolumeMounts(mounts);
    const bindsMount = generateBindMounts(mounts);
    const filesMount = generateFileMounts(appName, mysql);
    const docker = await getRemoteDocker(mysql.serverId);
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
                            TargetPort: 3306,
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
    catch {
        await docker.createService(settings);
    }
};

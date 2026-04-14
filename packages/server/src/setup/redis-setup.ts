import type { CreateServiceOptions } from "dockerode";
import { docker } from "../constants";
import {
	PRIMARY_SHARED_NETWORK_NAME,
	REDIS_RESOURCE_NAME,
} from "../constants/runtime";
import { pullImage } from "../utils/docker/utils";

type InitializeRedisOptions = {
	publishPorts?: boolean;
};

export const initializeRedis = async (
	options: InitializeRedisOptions = {},
) => {
	const { publishPorts = false } = options;
	const imageName = "redis:7";
	const containerName = REDIS_RESOURCE_NAME;

	const settings: CreateServiceOptions = {
		Name: containerName,
		TaskTemplate: {
			ContainerSpec: {
				Image: imageName,
				Mounts: [
					{
						Type: "volume",
						Source: REDIS_RESOURCE_NAME,
						Target: "/data",
					},
				],
			},
			Networks: [{ Target: PRIMARY_SHARED_NETWORK_NAME }],
			Placement: {
				Constraints: ["node.role==manager"],
			},
		},
		Mode: {
			Replicated: {
				Replicas: 1,
			},
		},
		...(publishPorts && {
			EndpointSpec: {
				Ports: [
					{
						TargetPort: 6379,
						PublishedPort: 6379,
						Protocol: "tcp",
						PublishMode: "host",
					},
				],
			},
		}),
	};
	try {
		await pullImage(imageName);

		const service = docker.getService(containerName);
		const inspect = await service.inspect();
		await service.update({
			version: Number.parseInt(inspect.Version.Index),
			...settings,
		});
		console.log("Redis Started ✅");
	} catch (_) {
		try {
			await docker.createService(settings);
		} catch (error: any) {
			if (error?.statusCode !== 409) {
				throw error;
			}
			console.log("Redis service already exists, continuing...");
		}
		console.log("Redis Not Found: Starting ✅");
	}
};

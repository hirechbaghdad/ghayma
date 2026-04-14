import type { CreateServiceOptions } from "dockerode";
import { docker } from "../constants";
import {
	POSTGRES_RESOURCE_NAME,
	PRIMARY_SHARED_NETWORK_NAME,
	WEB_SERVER_DATABASE_NAME,
	WEB_SERVER_DATABASE_USER,
} from "../constants/runtime";
import { pullImage } from "../utils/docker/utils";

type InitializePostgresOptions = {
	publishPorts?: boolean;
};

export const initializePostgres = async (
	options: InitializePostgresOptions = {},
) => {
	const { publishPorts = false } = options;
	const imageName = "postgres:16";
	const containerName = POSTGRES_RESOURCE_NAME;
	const settings: CreateServiceOptions = {
		Name: containerName,
		TaskTemplate: {
			ContainerSpec: {
				Image: imageName,
				Env: [
					`POSTGRES_USER=${WEB_SERVER_DATABASE_USER}`,
					`POSTGRES_DB=${WEB_SERVER_DATABASE_NAME}`,
					"POSTGRES_PASSWORD=amukds4wi9001583845717ad2",
				],
				Mounts: [
					{
						Type: "volume",
						Source: POSTGRES_RESOURCE_NAME,
						Target: "/var/lib/postgresql/data",
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
						TargetPort: 5432,
						PublishedPort: 5432,
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
		console.log("Postgres Started ✅");
	} catch (_) {
		try {
			await docker.createService(settings);
		} catch (error: any) {
			if (error?.statusCode !== 409) {
				throw error;
			}
			console.log("Postgres service already exists, continuing...");
		}
		console.log("Postgres Not Found: Starting ✅");
	}
};

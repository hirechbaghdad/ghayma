import fs, { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { paths } from "@dokploy/server/constants";
import { PRIMARY_SHARED_NETWORK_NAME } from "@dokploy/server/constants/runtime";
import type { Compose } from "@dokploy/server/services/compose";
import type { Domain } from "@dokploy/server/services/domain";
import { parse, stringify } from "yaml";
import { execAsyncRemote } from "../process/execAsync";
import { cloneBitbucketRepository } from "../providers/bitbucket";
import { cloneGitRepository } from "../providers/git";
import { cloneGiteaRepository } from "../providers/gitea";
import { cloneGithubRepository } from "../providers/github";
import { cloneGitlabRepository } from "../providers/gitlab";
import { getCreateComposeFileCommand } from "../providers/raw";
import { randomizeDeployableSpecificationFile } from "./collision";
import { randomizeSpecificationFile } from "./compose";
import type {
	ComposeSpecification,
	DefinitionsService,
	PropertiesNetworks,
} from "./types";
import { encodeBase64 } from "./utils";

export const cloneCompose = async (compose: Compose) => {
	let command = "set -e;";
	const entity = {
		...compose,
		type: "compose" as const,
	};
	if (compose.sourceType === "github") {
		command += await cloneGithubRepository(entity);
	} else if (compose.sourceType === "gitlab") {
		command += await cloneGitlabRepository(entity);
	} else if (compose.sourceType === "bitbucket") {
		command += await cloneBitbucketRepository(entity);
	} else if (compose.sourceType === "git") {
		command += await cloneGitRepository(entity);
	} else if (compose.sourceType === "gitea") {
		command += await cloneGiteaRepository(entity);
	} else if (compose.sourceType === "raw") {
		command += getCreateComposeFileCommand(compose);
	}
	return command;
};

export const getComposePath = (compose: Compose) => {
	const { COMPOSE_PATH } = paths(!!compose.serverId);
	const { appName, sourceType, composePath } = compose;
	let path = "";

	if (sourceType === "raw") {
		path = "docker-compose.yml";
	} else {
		path = composePath;
	}

	return join(COMPOSE_PATH, appName, "code", path);
};

export const loadDockerCompose = async (
	compose: Compose,
): Promise<ComposeSpecification | null> => {
	const path = getComposePath(compose);

	if (existsSync(path)) {
		const yamlStr = readFileSync(path, "utf8");
		const parsedConfig = parse(yamlStr) as ComposeSpecification;
		return parsedConfig;
	}
	return null;
};

export const loadDockerComposeRemote = async (
	compose: Compose,
): Promise<ComposeSpecification | null> => {
	const path = getComposePath(compose);
	try {
		if (!compose.serverId) {
			return null;
		}
		const { stdout, stderr } = await execAsyncRemote(
			compose.serverId,
			`cat ${path}`,
		);

		if (stderr) {
			return null;
		}
		if (!stdout) return null;
		const parsedConfig = parse(stdout) as ComposeSpecification;
		return parsedConfig;
	} catch {
		return null;
	}
};

export const readComposeFile = async (compose: Compose) => {
	const path = getComposePath(compose);
	if (existsSync(path)) {
		const yamlStr = readFileSync(path, "utf8");
		return yamlStr;
	}
	return null;
};

export const writeDomainsToCompose = async (
	compose: Compose,
	domains: Domain[],
) => {
	if (!domains.length) {
		return "";
	}

	try {
		const composeConverted = await addDomainToCompose(compose, domains);
		const path = getComposePath(compose);

		if (!composeConverted) {
			return `
echo "❌ Error: Compose file not found";
exit 1;
			`;
		}

		const composeString = stringify(composeConverted, { lineWidth: 1000 });
		const encodedContent = encodeBase64(composeString);
		return `echo "${encodedContent}" | base64 -d > "${path}";`;
	} catch (error) {
		// @ts-ignore
		return `echo "❌ Has occurred an error: ${error?.message || error}";
exit 1;
		`;
	}
};
export const addDomainToCompose = async (
	compose: Compose,
	domains: Domain[],
) => {
	const { appName } = compose;

	let result: ComposeSpecification | null;

	if (compose.serverId) {
		result = await loadDockerComposeRemote(compose);
	} else {
		result = await loadDockerCompose(compose);
	}

	if (!result || domains.length === 0) {
		return null;
	}

	const deploymentSuffix = compose.suffix || compose.appName;

	if (compose.isolatedDeployment) {
		const randomized = randomizeDeployableSpecificationFile(
			result,
			compose.isolatedDeploymentsVolume,
			deploymentSuffix,
		);
		result = randomized;
	} else if (compose.randomize) {
		const randomized = randomizeSpecificationFile(result, compose.suffix);
		result = randomized;
	}

	const services = result.services;
	if (!services) {
		throw new Error("No services found in the compose");
	}

	for (const domain of domains) {
		const { serviceName, https } = domain;
		if (!serviceName) {
			throw new Error("Service name not found");
		}
		const resolvedServiceName = resolveComposeServiceName(
			result,
			serviceName,
			deploymentSuffix,
		);
		if (!resolvedServiceName) {
			const availableServices = Object.keys(result.services || {});
			throw new Error(
				`The service ${serviceName} not found in the compose. Available services: ${availableServices.join(", ")}`,
			);
		}
		const service = services[resolvedServiceName];
		if (!service) {
			throw new Error(`The service ${resolvedServiceName} not found in the compose`);
		}

		const httpLabels = createDomainLabels(appName, domain, "web");
		if (https) {
			const httpsLabels = createDomainLabels(appName, domain, "websecure");
			httpLabels.push(...httpsLabels);
		}

		let labels: DefinitionsService["labels"] = [];
		if (compose.composeType === "docker-compose") {
			if (!service.labels) {
				service.labels = [];
			}

			labels = service.labels;
		} else {
			// Stack Case
			if (!service.deploy) {
				service.deploy = {};
			}
			if (!service.deploy.labels) {
				service.deploy.labels = [];
			}

			labels = service.deploy.labels;
		}

		if (Array.isArray(labels)) {
			if (!labels.includes("traefik.enable=true")) {
				labels.unshift("traefik.enable=true");
			}
			labels.unshift(...httpLabels);
			const targetNetwork = compose.isolatedDeployment
				? compose.appName
				: PRIMARY_SHARED_NETWORK_NAME;
			if (compose.composeType === "docker-compose") {
				const networkLabel = `traefik.docker.network=${targetNetwork}`;
				if (!labels.includes(networkLabel)) {
					labels.unshift(networkLabel);
				}
			} else {
				// Stack Case
				const networkLabel = `traefik.swarm.network=${targetNetwork}`;
				if (!labels.includes(networkLabel)) {
					labels.unshift(networkLabel);
				}
			}
		}

		if (!compose.isolatedDeployment) {
			// Add the shared network to the service
			service.networks = addDokployNetworkToService(service.networks);
		}
	}

	// Add the shared network to the root of the compose file
	if (!compose.isolatedDeployment) {
		result.networks = addDokployNetworkToRoot(result.networks);
	}

	return result;
};

const resolveComposeServiceName = (
	composeSpec: ComposeSpecification,
	requestedServiceName: string,
	deploymentSuffix?: string,
) => {
	const services = composeSpec.services || {};
	const serviceNames = Object.keys(services);

	if (serviceNames.length === 0) {
		return null;
	}

	if (services[requestedServiceName]) {
		return requestedServiceName;
	}

	if (deploymentSuffix) {
		const suffixedServiceName = `${requestedServiceName}-${deploymentSuffix}`;
		if (services[suffixedServiceName]) {
			return suffixedServiceName;
		}
	}

	const requestedImageName = requestedServiceName
		.split("/")
		.at(-1)
		?.split(":")[0];

	const matchingServiceNames = serviceNames.filter((serviceKey) => {
		if (deploymentSuffix && serviceKey === `${requestedServiceName}-${deploymentSuffix}`) {
			return true;
		}

		if (deploymentSuffix && serviceKey.endsWith(`-${deploymentSuffix}`)) {
			const originalServiceName = serviceKey.slice(
				0,
				-(deploymentSuffix.length + 1),
			);
			if (originalServiceName === requestedServiceName) {
				return true;
			}
		}

		const service = services[serviceKey];
		if (!service) {
			return false;
		}

		if (service.container_name === requestedServiceName) {
			return true;
		}

		if (
			deploymentSuffix &&
			service.container_name === `${requestedServiceName}-${deploymentSuffix}`
		) {
			return true;
		}

		const serviceImageName = service.image?.split("/").at(-1)?.split(":")[0];
		return !!requestedImageName && serviceImageName === requestedImageName;
	});

	if (matchingServiceNames.length === 1) {
		return matchingServiceNames[0];
	}

	if (serviceNames.length === 1) {
		return serviceNames[0];
	}

	return null;
};

export const writeComposeFile = async (
	compose: Compose,
	composeSpec: ComposeSpecification,
) => {
	const path = getComposePath(compose);

	try {
		const composeFile = stringify(composeSpec, {
			lineWidth: 1000,
		});
		fs.writeFileSync(path, composeFile, "utf8");
	} catch (e) {
		console.error("Error saving the YAML config file:", e);
	}
};

export const createDomainLabels = (
	appName: string,
	domain: Domain,
	entrypoint: "web" | "websecure",
) => {
	const {
		host,
		port,
		https,
		uniqueConfigKey,
		certificateType,
		path,
		customCertResolver,
		stripPath,
		internalPath,
	} = domain;
	const routerName = `${appName}-${uniqueConfigKey}-${entrypoint}`;
	const labels = [
		`traefik.http.routers.${routerName}.rule=Host(\`${host}\`)${path && path !== "/" ? ` && PathPrefix(\`${path}\`)` : ""}`,
		`traefik.http.routers.${routerName}.entrypoints=${entrypoint}`,
		`traefik.http.services.${routerName}.loadbalancer.server.port=${port}`,
		`traefik.http.routers.${routerName}.service=${routerName}`,
	];

	// Collect middlewares for this router
	const middlewares: string[] = [];

	// Add HTTPS redirect for web entrypoint (must be first)
	if (entrypoint === "web" && https) {
		middlewares.push("redirect-to-https@file");
	}

	// Add stripPath middleware if needed
	if (stripPath && path && path !== "/") {
		const middlewareName = `stripprefix-${appName}-${uniqueConfigKey}`;
		// Only define middleware once (on web entrypoint)
		if (entrypoint === "web") {
			labels.push(
				`traefik.http.middlewares.${middlewareName}.stripprefix.prefixes=${path}`,
			);
		}
		middlewares.push(middlewareName);
	}

	// Add internalPath middleware if needed
	if (internalPath && internalPath !== "/" && internalPath.startsWith("/")) {
		const middlewareName = `addprefix-${appName}-${uniqueConfigKey}`;
		// Only define middleware once (on web entrypoint)
		if (entrypoint === "web") {
			labels.push(
				`traefik.http.middlewares.${middlewareName}.addprefix.prefix=${internalPath}`,
			);
		}
		middlewares.push(middlewareName);
	}

	// Apply middlewares to router if any exist
	if (middlewares.length > 0) {
		labels.push(
			`traefik.http.routers.${routerName}.middlewares=${middlewares.join(",")}`,
		);
	}

	// Add TLS configuration for websecure
	if (entrypoint === "websecure") {
		if (certificateType === "letsencrypt") {
			labels.push(
				`traefik.http.routers.${routerName}.tls.certresolver=letsencrypt`,
			);
		} else if (certificateType === "custom" && customCertResolver) {
			labels.push(
				`traefik.http.routers.${routerName}.tls.certresolver=${customCertResolver}`,
			);
		}
	}

	return labels;
};

export const addDokployNetworkToService = (
	networkService: DefinitionsService["networks"],
) => {
	let networks = networkService;
	const network = PRIMARY_SHARED_NETWORK_NAME;
	if (!networks) {
		networks = [];
	}

	if (Array.isArray(networks)) {
		if (!networks.includes(network)) {
			networks.push(network);
		}
	} else if (networks && typeof networks === "object") {
		if (!(network in networks)) {
			networks[network] = {};
		}
	}

	return networks;
};

export const addDokployNetworkToRoot = (
	networkRoot: PropertiesNetworks | undefined,
) => {
	let networks = networkRoot;
	const network = PRIMARY_SHARED_NETWORK_NAME;

	if (!networks) {
		networks = {};
	}

	if (networks[network] || !networks[network]) {
		networks[network] = {
			external: true,
		};
	}

	return networks;
};

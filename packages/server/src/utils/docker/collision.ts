import { findComposeById } from "@dokploy/server/services/compose";
import { stringify } from "yaml";
import { addSuffixToAllConfigs } from "./compose/configs";
import { addSuffixToAllNetworks } from "./compose/network";
import { addSuffixToAllSecrets } from "./compose/secrets";
import { addSuffixToAllServiceNames } from "./compose/service";
import { execAsync, execAsyncRemote } from "../process/execAsync";
import {
	addAppNameToRootNetwork,
	addAppNameToServiceNetworks,
} from "./collision/root-network";
import { generateRandomHash } from "./compose";
import { addSuffixToAllVolumes } from "./compose/volume";
import {
	cloneCompose,
	loadDockerCompose,
	loadDockerComposeRemote,
} from "./domain";
import type { ComposeSpecification } from "./types";

export const addAppNameToPreventCollision = (
	composeData: ComposeSpecification,
	appName: string,
	isolatedDeploymentsVolume: boolean,
): ComposeSpecification => {
	let updatedComposeData = { ...composeData };

	updatedComposeData = addSuffixToAllServiceNames(updatedComposeData, appName);
	updatedComposeData = addSuffixToAllNetworks(updatedComposeData, appName);
	updatedComposeData = addSuffixToAllConfigs(updatedComposeData, appName);
	updatedComposeData = addSuffixToAllSecrets(updatedComposeData, appName);

	if (isolatedDeploymentsVolume) {
		updatedComposeData = addSuffixToAllVolumes(updatedComposeData, appName);
	}

	updatedComposeData = addAppNameToRootNetwork(updatedComposeData, appName);

	if (updatedComposeData.services) {
		updatedComposeData.services = addAppNameToServiceNetworks(
			updatedComposeData.services,
			appName,
		);
	}

	return updatedComposeData;
};

export const randomizeIsolatedDeploymentComposeFile = async (
	composeId: string,
	suffix?: string,
) => {
	const compose = await findComposeById(composeId);

	const command = await cloneCompose(compose);
	if (compose.serverId) {
		await execAsyncRemote(compose.serverId, command);
	} else {
		await execAsync(command);
	}

	let composeData: ComposeSpecification | null;

	if (compose.serverId) {
		composeData = await loadDockerComposeRemote(compose);
	} else {
		composeData = await loadDockerCompose(compose);
	}

	if (!composeData) {
		throw new Error("Compose data not found");
	}

	const randomSuffix = suffix || compose.appName || generateRandomHash();

	const newComposeFile = compose.isolatedDeployment
		? addAppNameToPreventCollision(
				composeData,
				randomSuffix,
				compose.isolatedDeploymentsVolume,
			)
		: composeData;

	return stringify(newComposeFile);
};

export const randomizeDeployableSpecificationFile = (
	composeSpec: ComposeSpecification,
	isolatedDeploymentsVolume: boolean,
	suffix?: string,
) => {
	if (!suffix) {
		return composeSpec;
	}
	const newComposeFile = addAppNameToPreventCollision(
		composeSpec,
		suffix,
		isolatedDeploymentsVolume,
	);
	return newComposeFile;
};

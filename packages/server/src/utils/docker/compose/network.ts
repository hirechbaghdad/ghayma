import _ from "lodash";
import { SHARED_NETWORK_NAMES } from "../../../constants/runtime";
import type {
	ComposeSpecification,
	DefinitionsNetwork,
	DefinitionsService,
} from "../types";

const sharedNetworkNames = new Set(SHARED_NETWORK_NAMES);

const shouldKeepSharedNetworkName = (networkName: string) =>
	sharedNetworkNames.has(networkName);

export const addSuffixToNetworksRoot = (
	networks: { [key: string]: DefinitionsNetwork },
	suffix: string,
): { [key: string]: DefinitionsNetwork } => {
	return Object.fromEntries(
		Object.entries(networks).map(([key, value]) => {
			const nextKey = shouldKeepSharedNetworkName(key)
				? key
				: `${key}-${suffix}`;
			const nextValue = _.cloneDeep(value);

			if (
				nextValue &&
				typeof nextValue === "object" &&
				"name" in nextValue &&
				typeof nextValue.name === "string" &&
				!shouldKeepSharedNetworkName(nextValue.name)
			) {
				nextValue.name = `${nextValue.name}-${suffix}`;
			}

			if (
				nextValue &&
				typeof nextValue === "object" &&
				nextValue.external &&
				typeof nextValue.external === "object" &&
				"name" in nextValue.external &&
				typeof nextValue.external.name === "string" &&
				!shouldKeepSharedNetworkName(nextValue.external.name)
			) {
				nextValue.external = {
					...nextValue.external,
					name: `${nextValue.external.name}-${suffix}`,
				};
			}

			return [nextKey, nextValue];
		}),
	);
};

export const addSuffixToServiceNetworks = (
	services: { [key: string]: DefinitionsService },
	suffix: string,
): { [key: string]: DefinitionsService } => {
	return _.mapValues(services, (service) => {
		const updatedService = _.cloneDeep(service);

		if (updatedService.networks) {
			if (Array.isArray(updatedService.networks)) {
				updatedService.networks = updatedService.networks.map(
					(network: string) => {
						if (shouldKeepSharedNetworkName(network)) {
							return network;
						}
						return `${network}-${suffix}`;
					},
				);
			} else {
				updatedService.networks = Object.fromEntries(
					Object.entries(updatedService.networks).map(([key, value]) => [
						shouldKeepSharedNetworkName(key) ? key : `${key}-${suffix}`,
						_.cloneDeep(value),
					]),
				);
			}
		}
		return updatedService;
	});
};

export const addSuffixToAllNetworks = (
	composeData: ComposeSpecification,
	suffix: string,
): ComposeSpecification => {
	const updatedComposeData = { ...composeData };

	if (updatedComposeData.networks) {
		updatedComposeData.networks = addSuffixToNetworksRoot(
			updatedComposeData.networks,
			suffix,
		);
	}

	if (updatedComposeData.services) {
		updatedComposeData.services = addSuffixToServiceNetworks(
			updatedComposeData.services,
			suffix,
		);
	}

	return updatedComposeData;
};

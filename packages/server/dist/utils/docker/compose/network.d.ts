import type { ComposeSpecification, DefinitionsNetwork, DefinitionsService } from "../types.js";
export declare const addSuffixToNetworksRoot: (networks: {
    [key: string]: DefinitionsNetwork;
}, suffix: string) => {
    [key: string]: DefinitionsNetwork;
};
export declare const addSuffixToServiceNetworks: (services: {
    [key: string]: DefinitionsService;
}, suffix: string) => {
    [key: string]: DefinitionsService;
};
export declare const addSuffixToAllNetworks: (composeData: ComposeSpecification, suffix: string) => ComposeSpecification;

import type { ComposeSpecification, DefinitionsService } from "../types.js";
export declare const addAppNameToRootNetwork: (composeData: ComposeSpecification, appName: string) => ComposeSpecification;
export declare const addAppNameToServiceNetworks: (services: {
    [key: string]: DefinitionsService;
}, appName: string) => {
    [key: string]: DefinitionsService;
};
export declare const addAppNameToAllServiceNames: (composeData: ComposeSpecification, appName: string) => ComposeSpecification;

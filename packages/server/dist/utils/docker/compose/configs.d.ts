import type { ComposeSpecification, DefinitionsConfig, DefinitionsService } from "../types.js";
export declare const addSuffixToConfigsRoot: (configs: {
    [key: string]: DefinitionsConfig;
}, suffix: string) => {
    [key: string]: DefinitionsConfig;
};
export declare const addSuffixToConfigsInServices: (services: {
    [key: string]: DefinitionsService;
}, suffix: string) => {
    [key: string]: DefinitionsService;
};
export declare const addSuffixToAllConfigs: (composeData: ComposeSpecification, suffix: string) => ComposeSpecification;

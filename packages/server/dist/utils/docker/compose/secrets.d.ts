import type { ComposeSpecification, DefinitionsService } from "../types.js";
export declare const addSuffixToSecretsRoot: (secrets: ComposeSpecification["secrets"], suffix: string) => ComposeSpecification["secrets"];
export declare const addSuffixToSecretsInServices: (services: {
    [key: string]: DefinitionsService;
}, suffix: string) => {
    [key: string]: DefinitionsService;
};
export declare const addSuffixToAllSecrets: (composeData: ComposeSpecification, suffix: string) => ComposeSpecification;

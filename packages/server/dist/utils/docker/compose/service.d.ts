import type { ComposeSpecification, DefinitionsService } from "../types.js";
export declare const addSuffixToServiceNames: (services: {
    [key: string]: DefinitionsService;
}, suffix: string) => {
    [key: string]: DefinitionsService;
};
export declare const addSuffixToAllServiceNames: (composeData: ComposeSpecification, suffix: string) => ComposeSpecification;

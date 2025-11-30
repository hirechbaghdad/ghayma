import type { ComposeSpecification, DefinitionsService, DefinitionsVolume } from "../types.js";
export declare const addSuffixToVolumesRoot: (volumes: {
    [key: string]: DefinitionsVolume;
}, suffix: string) => {
    [key: string]: DefinitionsVolume;
};
export declare const addSuffixToVolumesInServices: (services: {
    [key: string]: DefinitionsService;
}, suffix: string) => {
    [key: string]: DefinitionsService;
};
export declare const addSuffixToAllVolumes: (composeData: ComposeSpecification, suffix: string) => ComposeSpecification;

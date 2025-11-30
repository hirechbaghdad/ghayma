import type { ComposeSpecification } from "./types.js";
export declare const generateRandomHash: () => string;
export declare const randomizeComposeFile: (composeId: string, suffix?: string) => Promise<string>;
export declare const randomizeSpecificationFile: (composeSpec: ComposeSpecification, suffix?: string) => ComposeSpecification;
export declare const addSuffixToAllProperties: (composeData: ComposeSpecification, suffix: string) => ComposeSpecification;

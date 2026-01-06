import type { InferResultType } from "../../types/with.js";
export type ComposeNested = InferResultType<"compose", {
    environment: {
        with: {
            project: true;
        };
    };
    mounts: true;
    domains: true;
}>;
export declare const getBuildComposeCommand: (compose: ComposeNested) => Promise<string>;
export declare const createCommand: (compose: ComposeNested) => string;
export declare const getCreateEnvFileCommand: (compose: ComposeNested) => string;

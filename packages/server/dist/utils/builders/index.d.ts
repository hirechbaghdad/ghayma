import type { InferResultType } from "../../types/with.js";
export type ApplicationNested = InferResultType<"applications", {
    mounts: true;
    security: true;
    redirects: true;
    ports: true;
    registry: true;
    environment: {
        with: {
            project: true;
        };
    };
}>;
export declare const getBuildCommand: (application: ApplicationNested) => string;
export declare const mechanizeDockerContainer: (application: ApplicationNested) => Promise<void>;
export declare const getAuthConfig: (application: ApplicationNested) => {
    password: string;
    username: string;
    serveraddress: string;
} | undefined;

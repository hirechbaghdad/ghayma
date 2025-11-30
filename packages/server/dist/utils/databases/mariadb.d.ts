import type { InferResultType } from "../../types/with.js";
export type MariadbNested = InferResultType<"mariadb", {
    mounts: true;
    environment: {
        with: {
            project: true;
        };
    };
}>;
export declare const buildMariadb: (mariadb: MariadbNested) => Promise<void>;

import type { InferResultType } from "../../types/with.js";
export type PostgresNested = InferResultType<"postgres", {
    mounts: true;
    environment: {
        with: {
            project: true;
        };
    };
}>;
export declare const buildPostgres: (postgres: PostgresNested) => Promise<void>;

import type { InferResultType } from "../../types/with.js";
export type RedisNested = InferResultType<"redis", {
    mounts: true;
    environment: {
        with: {
            project: true;
        };
    };
}>;
export declare const buildRedis: (redis: RedisNested) => Promise<void>;

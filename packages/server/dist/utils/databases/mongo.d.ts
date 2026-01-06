import type { InferResultType } from "../../types/with.js";
export type MongoNested = InferResultType<"mongo", {
    mounts: true;
    environment: {
        with: {
            project: true;
        };
    };
}>;
export declare const buildMongo: (mongo: MongoNested) => Promise<void>;

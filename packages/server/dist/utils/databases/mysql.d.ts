import type { InferResultType } from "../../types/with.js";
export type MysqlNested = InferResultType<"mysql", {
    mounts: true;
    environment: {
        with: {
            project: true;
        };
    };
}>;
export declare const buildMysql: (mysql: MysqlNested) => Promise<void>;

import { type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema/index.js";
declare global {
    var db: PostgresJsDatabase<typeof schema> | undefined;
}
export declare let db: PostgresJsDatabase<typeof schema>;

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index.js";
export let db;
if (process.env.NODE_ENV === "production") {
    db = drizzle(postgres(process.env.DATABASE_URL), {
        schema,
    });
}
else {
    if (!global.db)
        global.db = drizzle(postgres(process.env.DATABASE_URL), {
            schema,
        });
    db = global.db;
}

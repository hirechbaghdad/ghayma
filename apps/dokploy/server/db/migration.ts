import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { getDatabaseUrl } from "./connection-string";

const connectionString = getDatabaseUrl();

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);

export const migration = async () =>
	await migrate(db, { migrationsFolder: "drizzle" })
		.then(() => {
			console.log("Migration complete");
			sql.end();
		})
		.catch((error) => {
			console.log("Migration failed", error);
		})
		.finally(() => {
			sql.end();
		});

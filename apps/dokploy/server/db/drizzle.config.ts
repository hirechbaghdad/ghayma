import { defineConfig } from "drizzle-kit";
import { getDatabaseUrl } from "./connection-string";

export default defineConfig({
	schema: "./server/db/schema/index.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: getDatabaseUrl(),
	},
	out: "drizzle",
	migrations: {
		table: "migrations",
		schema: "public",
	},
});

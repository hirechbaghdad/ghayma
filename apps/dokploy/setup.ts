import { exit } from "node:process";
import { execAsync } from "@dokploy/server";
import { setupDirectories } from "@dokploy/server/setup/config-paths";
import { initializePostgres } from "@dokploy/server/setup/postgres-setup";
import { initializeRedis } from "@dokploy/server/setup/redis-setup";
import {
	initializeNetwork,
	initializeSwarm,
} from "@dokploy/server/setup/setup";
import {
	createDefaultMiddlewares,
	createDefaultServerTraefikConfig,
	createDefaultTraefikConfig,
	initializeStandaloneTraefik,
} from "@dokploy/server/setup/traefik-setup";
import { getDatabaseUrl } from "./server/db/connection-string";
import postgres from "postgres";

const MAX_POSTGRES_READY_ATTEMPTS = 30;

const waitForPostgres = async () => {
	const connectionString = getDatabaseUrl();

	for (let attempt = 1; attempt <= MAX_POSTGRES_READY_ATTEMPTS; attempt++) {
		const sql = postgres(connectionString, {
			max: 1,
			connect_timeout: 1,
		});

		try {
			await sql`select 1`;
			await sql.end();
			return;
		} catch {
			await sql.end({ timeout: 1 });
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}

	throw new Error(
		`Postgres did not become ready after ${MAX_POSTGRES_READY_ATTEMPTS} attempts`,
	);
};

(async () => {
	try {
		setupDirectories();
		createDefaultMiddlewares();
		await initializeSwarm();
		await initializeNetwork();
		createDefaultTraefikConfig();
		createDefaultServerTraefikConfig();
		await execAsync("docker pull traefik:v3.6.1");
		await initializeStandaloneTraefik();
		await initializeRedis({ publishPorts: true });
		await initializePostgres({ publishPorts: true });
		await waitForPostgres();
		console.log("Dokploy setup completed");
		exit(0);
	} catch (e) {
		console.error("Error in dokploy setup", e);
	}
})();

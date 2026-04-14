import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Compose, ComposeSpecification, Domain } from "@dokploy/server";
import { addDomainToCompose, paths } from "@dokploy/server";
import { afterEach, describe, expect, it } from "vitest";

const composeFile = `
services:
  nginx:
    image: nginx:latest
`;

describe("addDomainToCompose", () => {
	const appName = "hello-nginx-mlhvc7";
	const composeDirectory = join(paths().COMPOSE_PATH, appName, "code");
	const composePath = join(composeDirectory, "docker-compose.yml");

	afterEach(() => {
		rmSync(join(paths().COMPOSE_PATH, appName), {
			force: true,
			recursive: true,
		});
	});

	it("resolves isolated deployment service names after they are suffixed", async () => {
		mkdirSync(composeDirectory, { recursive: true });
		writeFileSync(composePath, composeFile, "utf8");

		const compose = {
			appName,
			composeType: "docker-compose",
			composePath: "docker-compose.yml",
			isolatedDeployment: true,
			isolatedDeploymentsVolume: false,
			randomize: false,
			serverId: null,
			sourceType: "raw",
			suffix: null,
		} as Compose;

		const domain = {
			host: "example.com",
			port: 80,
			https: false,
			uniqueConfigKey: 1,
			customCertResolver: null,
			certificateType: "none",
			applicationId: null,
			composeId: "compose-id",
			domainType: "compose",
			serviceName: "nginx",
			domainId: "domain-id",
			path: "/",
			createdAt: new Date(),
			previewDeploymentId: null,
			internalPath: "/",
			stripPath: false,
		} as Domain;

		const updatedCompose = await addDomainToCompose(compose, [domain]);
		const resolvedService = updatedCompose?.services?.[
			`nginx-${appName}`
		] as ComposeSpecification["services"][string];

		expect(resolvedService).toBeDefined();
		expect(resolvedService.labels).toContain("traefik.enable=true");
		expect(resolvedService.labels).toContain(
			"traefik.http.routers.hello-nginx-mlhvc7-1-web.rule=Host(`example.com`)",
		);
	});
});

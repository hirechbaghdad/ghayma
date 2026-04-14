import type { ComposeSpecification } from "@dokploy/server";
import { addAppNameToPreventCollision } from "@dokploy/server";
import { expect, test } from "vitest";
import { parse } from "yaml";

const composeFile = `
version: "3.8"

services:
  web:
    image: nginx:latest
    configs:
      - source: web-config
        target: /etc/nginx/nginx.conf
    secrets:
      - web-secret
    networks:
      - frontend
      - atlanexis-network

configs:
  web-config:
    file: ./nginx.conf

secrets:
  web-secret:
    file: ./web.secret

networks:
  frontend:
    driver: bridge
  atlanexis-network:
    external: true
`;

test("Isolated deployment namespaces compose resources and keeps shared platform network", () => {
	const composeData = parse(composeFile) as ComposeSpecification;
	const updatedComposeData = addAppNameToPreventCollision(
		composeData,
		"tenant-a",
		false,
	);

	expect(updatedComposeData.services).toHaveProperty("web-tenant-a");
	expect(updatedComposeData.networks).toHaveProperty("frontend-tenant-a");
	expect(updatedComposeData.networks).toHaveProperty("atlanexis-network");
	expect(updatedComposeData.networks).toHaveProperty("tenant-a");
	expect(updatedComposeData.configs).toHaveProperty("web-config-tenant-a");
	expect(updatedComposeData.secrets).toHaveProperty("web-secret-tenant-a");

	const webService = updatedComposeData.services?.["web-tenant-a"];

	expect(webService?.networks).toContain("frontend-tenant-a");
	expect(webService?.networks).toContain("atlanexis-network");
	expect(webService?.networks).toContain("tenant-a");
	expect(webService?.configs).toContainEqual({
		source: "web-config-tenant-a",
		target: "/etc/nginx/nginx.conf",
	});
	expect(webService?.secrets).toContain("web-secret-tenant-a");
});

import { fs, vol } from "memfs";

vi.mock("node:fs", () => ({
	...fs,
	default: fs,
}));

import type { FileConfig, User } from "@dokploy/server";
import {
	createDefaultServerTraefikConfig,
	loadOrCreateConfig,
	updateServerTraefik,
} from "@dokploy/server";
import { WEB_SERVER_RESOURCE_NAME } from "@dokploy/server/constants/runtime";
import { beforeEach, expect, test, vi } from "vitest";

const baseAdmin: User = {
	https: false,
	enablePaidFeatures: false,
	allowImpersonation: false,
	role: "user",
	metricsConfig: {
		containers: {
			refreshRate: 20,
			services: {
				include: [],
				exclude: [],
			},
		},
		server: {
			type: "Dokploy",
			cronJob: "",
			port: 4500,
			refreshRate: 20,
			retentionDays: 2,
			token: "",
			thresholds: {
				cpu: 0,
				memory: 0,
			},
			urlCallback: "",
		},
	},
	cleanupCacheApplications: false,
	cleanupCacheOnCompose: false,
	cleanupCacheOnPreviews: false,
	createdAt: new Date(),
	serverIp: null,
	certificateType: "none",
	host: null,
	letsEncryptEmail: null,
	sshPrivateKey: null,
	enableDockerCleanup: false,
	logCleanupCron: null,
	serversQuantity: 0,
	stripeCustomerId: "",
	stripeSubscriptionId: "",
	banExpires: new Date(),
	banned: true,
	banReason: "",
	email: "",
	expirationDate: "",
	id: "",
	isRegistered: false,
	name: "",
	createdAt2: new Date().toISOString(),
	emailVerified: false,
	image: "",
	updatedAt: new Date(),
	twoFactorEnabled: false,
};

beforeEach(() => {
	vol.reset();
	createDefaultServerTraefikConfig();
});

test("Should read the configuration file", () => {
	const config: FileConfig = loadOrCreateConfig(WEB_SERVER_RESOURCE_NAME);
	expect(
		config.http?.routers?.[`${WEB_SERVER_RESOURCE_NAME}-router-app`]?.service,
	).toBe(
		`${WEB_SERVER_RESOURCE_NAME}-service-app`,
	);
});

test("Should apply redirect-to-https", () => {
	updateServerTraefik(
		{
			...baseAdmin,
			https: true,
			certificateType: "letsencrypt",
		},
		"example.com",
	);

	const config: FileConfig = loadOrCreateConfig(WEB_SERVER_RESOURCE_NAME);

	expect(
		config.http?.routers?.[`${WEB_SERVER_RESOURCE_NAME}-router-app`]
			?.middlewares,
	).toContain("redirect-to-https");
});

test("Should change only host when no certificate", () => {
	updateServerTraefik(baseAdmin, "example.com");

	const config: FileConfig = loadOrCreateConfig(WEB_SERVER_RESOURCE_NAME);

	expect(
		config.http?.routers?.[`${WEB_SERVER_RESOURCE_NAME}-router-app-secure`],
	).toBeUndefined();
});

test("Should not touch config without host", () => {
	const originalConfig: FileConfig = loadOrCreateConfig(WEB_SERVER_RESOURCE_NAME);

	updateServerTraefik(baseAdmin, null);

	const config: FileConfig = loadOrCreateConfig(WEB_SERVER_RESOURCE_NAME);

	expect(originalConfig).toEqual(config);
});

test("Should remove websecure if https rollback to http", () => {
	updateServerTraefik(
		{ ...baseAdmin, certificateType: "letsencrypt" },
		"example.com",
	);

	updateServerTraefik({ ...baseAdmin, certificateType: "none" }, "example.com");

	const config: FileConfig = loadOrCreateConfig(WEB_SERVER_RESOURCE_NAME);

	expect(
		config.http?.routers?.[`${WEB_SERVER_RESOURCE_NAME}-router-app-secure`],
	).toBeUndefined();
	expect(
		config.http?.routers?.[`${WEB_SERVER_RESOURCE_NAME}-router-app`]
			?.middlewares,
	).not.toContain("redirect-to-https");
});

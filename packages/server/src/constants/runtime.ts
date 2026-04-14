export const WEB_SERVER_RESOURCE_NAME = "atlanexis-cloudos";
export const LEGACY_WEB_SERVER_RESOURCE_NAME = "dokploy";
export const TRAEFIK_RESOURCE_NAME = "atlanexis-traefik";
export const POSTGRES_RESOURCE_NAME = "atlanexis-postgres";
export const REDIS_RESOURCE_NAME = "atlanexis-redis";
export const PRIMARY_SHARED_NETWORK_NAME = "atlanexis-network";
export const LEGACY_SHARED_NETWORK_NAME = "dokploy-network";
export const WEB_SERVER_IMAGE_REPOSITORY = "atlanexis/cloudos";
export const WEB_SERVER_DATABASE_USER = "atlanexis";
export const WEB_SERVER_DATABASE_NAME = "atlanexis";
export const MONITORING_RESOURCE_NAME = "dokploy-monitoring";

export const INTERNAL_RUNTIME_RESOURCE_NAMES = [
	WEB_SERVER_RESOURCE_NAME,
	TRAEFIK_RESOURCE_NAME,
	POSTGRES_RESOURCE_NAME,
	REDIS_RESOURCE_NAME,
	MONITORING_RESOURCE_NAME,
] as const;

export const SHARED_NETWORK_NAMES = [
	PRIMARY_SHARED_NETWORK_NAME,
	LEGACY_SHARED_NETWORK_NAME,
] as const;

export const isWebServerResourceName = (name: string) =>
	name === WEB_SERVER_RESOURCE_NAME || name === LEGACY_WEB_SERVER_RESOURCE_NAME;

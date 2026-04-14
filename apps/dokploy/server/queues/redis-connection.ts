import type { ConnectionOptions } from "bullmq";
import { REDIS_RESOURCE_NAME } from "@dokploy/server/constants/runtime";

export const redisConfig: ConnectionOptions = {
	host:
		process.env.NODE_ENV === "production"
			? process.env.REDIS_HOST || REDIS_RESOURCE_NAME
			: "127.0.0.1",
};

import {
	createRegistry,
	execAsyncRemote,
	execFileAsync,
	findRegistryById,
	findServerById,
	IS_CLOUD,
	removeRegistry,
	updateRegistry,
} from "@dokploy/server";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import {
	apiCreateRegistry,
	apiFindOneRegistry,
	apiRemoveRegistry,
	apiTestRegistry,
	apiUpdateRegistry,
	registry,
} from "@/server/db/schema";
import { adminProcedure, createTRPCRouter } from "../trpc";

const redactRegistry = <T extends { password?: string }>(registry: T) => ({
	...registry,
	password: "",
});

const shellArg = (value: string) => `'${value.replace(/'/g, "'\\''")}'`;

export const registryRouter = createTRPCRouter({
	create: adminProcedure
		.input(apiCreateRegistry)
		.mutation(async ({ ctx, input }) => {
			return await createRegistry(input, ctx.session.activeOrganizationId);
		}),
	remove: adminProcedure
		.input(apiRemoveRegistry)
		.mutation(async ({ ctx, input }) => {
			const registry = await findRegistryById(input.registryId);
			if (registry.organizationId !== ctx.session.activeOrganizationId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not allowed to delete this registry",
				});
			}
			return await removeRegistry(input.registryId);
		}),
	update: adminProcedure
		.input(apiUpdateRegistry)
		.mutation(async ({ input, ctx }) => {
			const { registryId, ...rest } = input;
			const registry = await findRegistryById(registryId);
			if (registry.organizationId !== ctx.session.activeOrganizationId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not allowed to update this registry",
				});
			}
			const application = await updateRegistry(registryId, {
				...rest,
			});

			if (!application) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Error updating registry",
				});
			}

			return true;
		}),
	all: adminProcedure.query(async ({ ctx }) => {
		const registryResponse = await db.query.registry.findMany({
			where: eq(registry.organizationId, ctx.session.activeOrganizationId),
		});
		return registryResponse.map(redactRegistry);
	}),
	one: adminProcedure
		.input(apiFindOneRegistry)
		.query(async ({ input, ctx }) => {
			const registry = await findRegistryById(input.registryId);
			if (registry.organizationId !== ctx.session.activeOrganizationId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not allowed to access this registry",
				});
			}
			return redactRegistry(registry);
		}),
	testRegistry: adminProcedure
		.input(apiTestRegistry)
		.mutation(async ({ input, ctx }) => {
			try {
				const args = [
					"login",
					input.registryUrl,
					"--username",
					input.username,
					"--password-stdin",
				];

				if (IS_CLOUD && !input.serverId) {
					throw new TRPCError({
						code: "NOT_FOUND",
						message: "Select a server to test the registry",
					});
				}

				if (input.serverId && input.serverId !== "none") {
					const server = await findServerById(input.serverId);
					if (server.organizationId !== ctx.session.activeOrganizationId) {
						throw new TRPCError({
							code: "UNAUTHORIZED",
							message: "You are not allowed to use this server",
						});
					}
					await execAsyncRemote(
						input.serverId,
						`printf %s ${shellArg(input.password)} | docker ${args
							.map(shellArg)
							.join(" ")}`,
					);
				} else {
					await execFileAsync("docker", args, {
						input: Buffer.from(input.password).toString(),
					});
				}

				return true;
			} catch (error) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message:
						error instanceof Error
							? error.message
							: "Error testing the registry",
					cause: error,
				});
			}
		}),
});

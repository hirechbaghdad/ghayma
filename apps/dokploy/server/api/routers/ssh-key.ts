import {
	createSshKey,
	findSSHKeyById,
	generateSSHKey,
	removeSSHKeyById,
	updateSSHKeyById,
} from "@dokploy/server";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { adminProcedure, createTRPCRouter } from "@/server/api/trpc";
import { db } from "@/server/db";
import {
	apiCreateSshKey,
	apiFindOneSshKey,
	apiGenerateSSHKey,
	apiRemoveSshKey,
	apiUpdateSshKey,
	sshKeys,
} from "@/server/db/schema";

const redactSshKey = <T extends { privateKey?: string }>(sshKey: T) => ({
	...sshKey,
	privateKey: "",
});

export const sshRouter = createTRPCRouter({
	create: adminProcedure
		.input(apiCreateSshKey)
		.mutation(async ({ input, ctx }) => {
			try {
				await createSshKey({
					...input,
					organizationId: ctx.session.activeOrganizationId,
				});
			} catch (error) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Error creating the SSH key",
					cause: error,
				});
			}
		}),
	remove: adminProcedure
		.input(apiRemoveSshKey)
		.mutation(async ({ input, ctx }) => {
			try {
				const sshKey = await findSSHKeyById(input.sshKeyId);
				if (sshKey.organizationId !== ctx.session.activeOrganizationId) {
					throw new TRPCError({
						code: "UNAUTHORIZED",
						message: "You are not allowed to delete this SSH key",
					});
				}

				return await removeSSHKeyById(input.sshKeyId);
			} catch (error) {
				throw error;
			}
		}),
	one: adminProcedure
		.input(apiFindOneSshKey)
		.query(async ({ input, ctx }) => {
			const sshKey = await findSSHKeyById(input.sshKeyId);

			if (sshKey.organizationId !== ctx.session.activeOrganizationId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not allowed to access this SSH key",
				});
			}
			return redactSshKey(sshKey);
		}),
	all: adminProcedure.query(async ({ ctx }) => {
		const keys = await db.query.sshKeys.findMany({
			where: eq(sshKeys.organizationId, ctx.session.activeOrganizationId),
			orderBy: desc(sshKeys.createdAt),
		});
		return keys.map(redactSshKey);
	}),
	generate: adminProcedure
		.input(apiGenerateSSHKey)
		.mutation(async ({ input }) => {
			return await generateSSHKey(input.type);
		}),
	update: adminProcedure
		.input(apiUpdateSshKey)
		.mutation(async ({ input, ctx }) => {
			try {
				const sshKey = await findSSHKeyById(input.sshKeyId);
				if (sshKey.organizationId !== ctx.session.activeOrganizationId) {
					throw new TRPCError({
						code: "UNAUTHORIZED",
						message: "You are not allowed to update this SSH key",
					});
				}
				return await updateSSHKeyById(input);
			} catch (error) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "Error updating this SSH key",
					cause: error,
				});
			}
		}),
});

import {
	findServerById,
	getRecoveryCandidate,
	recoverRecoveryTarget,
	scanRecoveryTargets,
} from "@dokploy/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const recoveryDatabaseTypeSchema = z.enum([
	"postgres",
	"mysql",
	"mariadb",
	"mongo",
	"redis",
]);

const recoveryTargetSchema = z.discriminatedUnion("kind", [
	z.object({
		kind: z.literal("managed-database"),
		id: z.string().min(1),
		type: recoveryDatabaseTypeSchema,
	}),
	z.object({
		kind: z.literal("compose-database"),
		composeId: z.string().min(1),
		serviceName: z.string().min(1),
	}),
]);

const assertOwner = (role: string) => {
	if (role !== "owner") {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You are not authorized to access the recovery service.",
		});
	}
};

export const recoveryRouter = createTRPCRouter({
	scan: protectedProcedure
		.input(
			z.object({
				target: z.string().optional(),
			}),
		)
		.query(async ({ input, ctx }) => {
			assertOwner(ctx.user.role);

			if (input.target && input.target !== "local") {
				const server = await findServerById(input.target);
				if (server.organizationId !== ctx.session.activeOrganizationId) {
					throw new TRPCError({
						code: "UNAUTHORIZED",
						message: "You are not authorized to scan this server.",
					});
				}
			}

			return scanRecoveryTargets(ctx.session.activeOrganizationId, input.target);
		}),
	recover: protectedProcedure
		.input(recoveryTargetSchema)
		.mutation(async ({ input, ctx }) => {
			assertOwner(ctx.user.role);

			const candidate = await getRecoveryCandidate(input);

			if (candidate.organizationId !== ctx.session.activeOrganizationId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to recover this database.",
				});
			}

			if (candidate.servicePresent) {
				throw new TRPCError({
					code: "CONFLICT",
					message: "This database already has an active runtime service.",
				});
			}

			if (!candidate.recoverable) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: candidate.reason,
				});
			}

			await recoverRecoveryTarget(input);

			return getRecoveryCandidate(input);
		}),
});

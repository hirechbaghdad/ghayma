import {
	findApplicationById,
	findComposeById,
	findScheduleOrganizationId,
	findServerById,
	IS_CLOUD,
	removeScheduleJob,
	scheduleJob,
} from "@dokploy/server";
import { db } from "@dokploy/server/db";
import { deployments } from "@dokploy/server/db/schema/deployment";
import {
	createScheduleSchema,
	schedules,
	updateScheduleSchema,
} from "@dokploy/server/db/schema/schedule";
import { runCommand } from "@dokploy/server/index";
import {
	createSchedule,
	deleteSchedule,
	findScheduleById,
	updateSchedule,
} from "@dokploy/server/services/schedule";
import { TRPCError } from "@trpc/server";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { removeJob, schedule } from "@/server/utils/backup";
import { adminProcedure, createTRPCRouter } from "../trpc";

const assertSameOrganization = (
	resourceOrganizationId: string | null | undefined,
	activeOrganizationId: string,
) => {
	if (!resourceOrganizationId || resourceOrganizationId !== activeOrganizationId) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You are not authorized to access this schedule",
		});
	}
};

const assertScheduleInputAccess = async (
	input: z.infer<typeof createScheduleSchema>,
	ctx: {
		session: { activeOrganizationId: string };
		user: { id: string };
	},
) => {
	const scheduleType = input.scheduleType ?? "application";

	if (scheduleType === "application") {
		if (!input.applicationId) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "applicationId is required for application schedules",
			});
		}
		const application = await findApplicationById(input.applicationId);
		assertSameOrganization(
			application.environment.project.organizationId,
			ctx.session.activeOrganizationId,
		);
		return;
	}

	if (scheduleType === "compose") {
		if (!input.composeId) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "composeId is required for compose schedules",
			});
		}
		const compose = await findComposeById(input.composeId);
		assertSameOrganization(
			compose.environment.project.organizationId,
			ctx.session.activeOrganizationId,
		);
		return;
	}

	if (scheduleType === "server") {
		if (!input.serverId) {
			throw new TRPCError({
				code: "BAD_REQUEST",
				message: "serverId is required for server schedules",
			});
		}
		const server = await findServerById(input.serverId);
		assertSameOrganization(server.organizationId, ctx.session.activeOrganizationId);
		return;
	}

	if (input.userId && input.userId !== ctx.user.id) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You are not authorized to create schedules for another user",
		});
	}
};

const assertScheduleAccess = async (
	scheduleId: string,
	ctx: {
		session: { activeOrganizationId: string };
		user: { id: string };
	},
) => {
	const schedule = await findScheduleById(scheduleId);
	const organizationId = await findScheduleOrganizationId(scheduleId);

	if (organizationId) {
		assertSameOrganization(organizationId, ctx.session.activeOrganizationId);
		return schedule;
	}

	if (schedule.scheduleType !== "dokploy-server" || schedule.userId !== ctx.user.id) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You are not authorized to access this schedule",
		});
	}

	return schedule;
};

export const scheduleRouter = createTRPCRouter({
	create: adminProcedure
		.input(createScheduleSchema)
		.mutation(async ({ input, ctx }) => {
			await assertScheduleInputAccess(input, ctx);
			const newSchedule = await createSchedule({
				...input,
				userId:
					(input.scheduleType ?? "application") === "dokploy-server"
						? ctx.user.id
						: input.userId,
			});

			if (newSchedule?.enabled) {
				if (IS_CLOUD) {
					schedule({
						scheduleId: newSchedule.scheduleId,
						type: "schedule",
						cronSchedule: newSchedule.cronExpression,
					});
				} else {
					scheduleJob(newSchedule);
				}
			}
			return newSchedule;
		}),

	update: adminProcedure
		.input(updateScheduleSchema)
		.mutation(async ({ input, ctx }) => {
			await assertScheduleAccess(input.scheduleId, ctx);
			await assertScheduleInputAccess(input, ctx);
			const updatedSchedule = await updateSchedule(input);

			if (IS_CLOUD) {
				if (updatedSchedule?.enabled) {
					schedule({
						scheduleId: updatedSchedule.scheduleId,
						type: "schedule",
						cronSchedule: updatedSchedule.cronExpression,
					});
				} else {
					await removeJob({
						cronSchedule: updatedSchedule.cronExpression,
						scheduleId: updatedSchedule.scheduleId,
						type: "schedule",
					});
				}
			} else {
				if (updatedSchedule?.enabled) {
					removeScheduleJob(updatedSchedule.scheduleId);
					scheduleJob(updatedSchedule);
				} else {
					removeScheduleJob(updatedSchedule.scheduleId);
				}
			}
			return updatedSchedule;
		}),

	delete: adminProcedure
		.input(z.object({ scheduleId: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const schedule = await assertScheduleAccess(input.scheduleId, ctx);
			await deleteSchedule(input.scheduleId);

			if (IS_CLOUD) {
				await removeJob({
					cronSchedule: schedule.cronExpression,
					scheduleId: schedule.scheduleId,
					type: "schedule",
				});
			} else {
				removeScheduleJob(schedule.scheduleId);
			}
			return true;
		}),

	list: adminProcedure
		.input(
			z.object({
				id: z.string(),
				scheduleType: z.enum([
					"application",
					"compose",
					"server",
					"dokploy-server",
				]),
			}),
		)
		.query(async ({ input, ctx }) => {
			if (input.scheduleType === "application") {
				const application = await findApplicationById(input.id);
				assertSameOrganization(
					application.environment.project.organizationId,
					ctx.session.activeOrganizationId,
				);
			} else if (input.scheduleType === "compose") {
				const compose = await findComposeById(input.id);
				assertSameOrganization(
					compose.environment.project.organizationId,
					ctx.session.activeOrganizationId,
				);
			} else if (input.scheduleType === "server") {
				const server = await findServerById(input.id);
				assertSameOrganization(
					server.organizationId,
					ctx.session.activeOrganizationId,
				);
			} else if (input.id !== ctx.user.id) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You are not authorized to list these schedules",
				});
			}

			const where = {
				application: eq(schedules.applicationId, input.id),
				compose: eq(schedules.composeId, input.id),
				server: eq(schedules.serverId, input.id),
				"dokploy-server": eq(schedules.userId, input.id),
			};
			return db.query.schedules.findMany({
				where: where[input.scheduleType],
				with: {
					application: true,
					server: true,
					compose: true,
					deployments: {
						orderBy: [desc(deployments.createdAt)],
					},
				},
			});
		}),

	one: adminProcedure
		.input(z.object({ scheduleId: z.string() }))
		.query(async ({ input, ctx }) => {
			return await assertScheduleAccess(input.scheduleId, ctx);
		}),

	runManually: adminProcedure
		.input(z.object({ scheduleId: z.string().min(1) }))
		.mutation(async ({ input, ctx }) => {
			try {
				await assertScheduleAccess(input.scheduleId, ctx);
				await runCommand(input.scheduleId);
				return true;
			} catch (error) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message:
						error instanceof Error ? error.message : "Error running schedule",
				});
			}
		}),
});

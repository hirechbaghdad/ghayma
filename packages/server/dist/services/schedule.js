import path from "node:path";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { paths } from "../constants/index.js";
import { db } from "../db/index.js";
import { schedules } from "../db/schema/schedule.js";
import { encodeBase64 } from "../utils/docker/utils.js";
import { execAsync, execAsyncRemote } from "../utils/process/execAsync.js";
export const createSchedule = async (input) => {
    const { scheduleId, ...rest } = input;
    const [newSchedule] = await db.insert(schedules).values(rest).returning();
    if (newSchedule &&
        (newSchedule.scheduleType === "dokploy-server" ||
            newSchedule.scheduleType === "server")) {
        await handleScript(newSchedule);
    }
    return newSchedule;
};
export const findScheduleById = async (scheduleId) => {
    const schedule = await db.query.schedules.findFirst({
        where: eq(schedules.scheduleId, scheduleId),
        with: {
            application: {
                with: {
                    environment: {
                        with: {
                            project: true,
                        },
                    },
                },
            },
            compose: {
                with: {
                    environment: {
                        with: {
                            project: true,
                        },
                    },
                },
            },
            server: {
                with: {
                    organization: true,
                },
            },
        },
    });
    if (!schedule) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Schedule not found",
        });
    }
    return schedule;
};
export const findScheduleOrganizationId = async (scheduleId) => {
    const schedule = await findScheduleById(scheduleId);
    if (schedule?.application) {
        return schedule?.application?.environment?.project?.organizationId;
    }
    if (schedule?.compose) {
        return schedule?.compose?.environment?.project?.organizationId;
    }
    if (schedule?.server) {
        return schedule?.server?.organization?.id;
    }
    return null;
};
export const deleteSchedule = async (scheduleId) => {
    const schedule = await findScheduleById(scheduleId);
    const serverId = schedule?.serverId ||
        schedule?.application?.serverId ||
        schedule?.compose?.serverId;
    const { SCHEDULES_PATH } = paths(!!serverId);
    const fullPath = path.join(SCHEDULES_PATH, schedule?.appName || "");
    const command = `rm -rf ${fullPath}`;
    if (serverId) {
        await execAsyncRemote(serverId, command);
    }
    else {
        await execAsync(command);
    }
    const scheduleResult = await db
        .delete(schedules)
        .where(eq(schedules.scheduleId, scheduleId));
    if (!scheduleResult) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Schedule not found",
        });
    }
    return true;
};
export const updateSchedule = async (input) => {
    const { scheduleId, ...rest } = input;
    const [updatedSchedule] = await db
        .update(schedules)
        .set(rest)
        .where(eq(schedules.scheduleId, scheduleId))
        .returning();
    if (!updatedSchedule) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Schedule not found",
        });
    }
    if (updatedSchedule?.scheduleType === "dokploy-server" ||
        updatedSchedule?.scheduleType === "server") {
        await handleScript(updatedSchedule);
    }
    return updatedSchedule;
};
const handleScript = async (schedule) => {
    const { SCHEDULES_PATH } = paths(!!schedule?.serverId);
    const fullPath = path.join(SCHEDULES_PATH, schedule?.appName || "");
    // Add PID and Schedule ID echo by default to all scripts
    const scriptWithPid = `echo "PID: $$ | Schedule ID: ${schedule.scheduleId}"
${schedule?.script || ""}`;
    const encodedContent = encodeBase64(scriptWithPid);
    const script = `
	 	 mkdir -p ${fullPath}
	 	 rm -f ${fullPath}/script.sh
		 touch ${fullPath}/script.sh
		 chmod +x ${fullPath}/script.sh
		 echo "${encodedContent}" | base64 -d > ${fullPath}/script.sh
	`;
    if (schedule?.scheduleType === "dokploy-server") {
        await execAsync(script);
    }
    else if (schedule?.scheduleType === "server") {
        await execAsyncRemote(schedule?.serverId || "", script);
    }
};

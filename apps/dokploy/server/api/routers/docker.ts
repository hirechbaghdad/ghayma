import {
    containerRestart,
    findServerById,
    getConfig,
    getContainers,
    getContainersByAppLabel,
    getContainersByAppNameMatch,
    getServiceContainersByAppName,
    getStackContainersByAppName,
} from "@dokploy/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import http from "http";
import { adminProcedure, createTRPCRouter } from "../trpc";

const queryDocker = (path: string, method: "GET" | "POST" | "DELETE" = "GET"): Promise<any> => {
    return new Promise((resolve, reject) => {
        const options = {
            socketPath: "/var/run/docker.sock",
            path: path,
            method: method,
        };
        const req = http.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                if (!data) return resolve({ success: true });
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve({ success: true });
                }
            });
        });
        req.on("error", (e) => reject(e));
        req.end();
    });
};

export const containerIdRegex = /^[a-zA-Z0-9.\-_]+$/;
const dockerObjectId = z.string().min(1).regex(containerIdRegex);
const optionalServerInput = z.object({ serverId: z.string().optional() }).optional();

const assertServerAccess = async (serverId: string | undefined, organizationId: string) => {
    if (!serverId) return;
    const server = await findServerById(serverId);
    if (server.organizationId !== organizationId) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }
};

export const dockerRouter = createTRPCRouter({
    getContainers: adminProcedure
        .input(z.object({ serverId: z.string().optional() }))
        .query(async ({ input, ctx }) => {
            await assertServerAccess(input.serverId, ctx.session.activeOrganizationId);
            return await getContainers(input.serverId);
        }),

    getVolumes: adminProcedure.input(optionalServerInput).query(async ({ input, ctx }) => {
        await assertServerAccess(input?.serverId, ctx.session.activeOrganizationId);
        const result = await queryDocker("/volumes");
        return result.Volumes || [];
    }),

    getNetworks: adminProcedure.input(optionalServerInput).query(async ({ input, ctx }) => {
        await assertServerAccess(input?.serverId, ctx.session.activeOrganizationId);
        return await queryDocker("/networks");
    }),

    getImages: adminProcedure.input(optionalServerInput).query(async ({ input, ctx }) => {
        await assertServerAccess(input?.serverId, ctx.session.activeOrganizationId);
        return await queryDocker("/images/json");
    }),

    startContainer: adminProcedure
        .input(z.object({ id: dockerObjectId }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/containers/${input.id}/start`, "POST");
        }),

    stopContainer: adminProcedure
        .input(z.object({ id: dockerObjectId }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/containers/${input.id}/stop`, "POST");
        }),

    removeContainer: adminProcedure
        .input(z.object({ id: dockerObjectId }))
        .mutation(async ({ input }) => {
            // v=true removes associated volumes if they are anonymous
            return await queryDocker(`/containers/${input.id}?force=true&v=true`, "DELETE");
        }),

    restartContainer: adminProcedure
        .input(z.object({ containerId: z.string().min(1).regex(containerIdRegex) }))
        .mutation(async ({ input }) => {
            return await containerRestart(input.containerId);
        }),

    deleteImage: adminProcedure
        .input(z.object({ id: z.string().min(1).max(512) }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/images/${encodeURIComponent(input.id)}?force=true`, "DELETE");
        }),

    deleteVolume: adminProcedure
        .input(z.object({ name: dockerObjectId }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/volumes/${input.name}`, "DELETE");
        }),

    pruneSystem: adminProcedure
        .mutation(async () => {
            return await queryDocker("/images/prune", "POST");
        }),

    getConfig: adminProcedure
        .input(z.object({
            containerId: z.string().min(1).regex(containerIdRegex),
            serverId: z.string().optional(),
        }))
        .query(async ({ input, ctx }) => {
            await assertServerAccess(input.serverId, ctx.session.activeOrganizationId);
            return await getConfig(input.containerId, input.serverId);
        }),

    getContainersByAppNameMatch: adminProcedure
        .input(z.object({
            appType: z.union([z.literal("stack"), z.literal("docker-compose")]).optional(),
            appName: z.string().min(1).regex(containerIdRegex),
            serverId: z.string().optional(),
        }))
        .query(async ({ input, ctx }) => {
            await assertServerAccess(input.serverId, ctx.session.activeOrganizationId);
            return await getContainersByAppNameMatch(input.appName, input.appType, input.serverId);
        }),

    getContainersByAppLabel: adminProcedure
        .input(z.object({
            appName: z.string().min(1).regex(containerIdRegex),
            serverId: z.string().optional(),
            type: z.enum(["standalone", "swarm"]),
        }))
        .query(async ({ input, ctx }) => {
            await assertServerAccess(input.serverId, ctx.session.activeOrganizationId);
            return await getContainersByAppLabel(input.appName, input.type, input.serverId);
        }),

    getStackContainersByAppName: adminProcedure
        .input(z.object({ appName: z.string().min(1), serverId: z.string().optional() }))
        .query(async ({ input, ctx }) => {
            await assertServerAccess(input.serverId, ctx.session.activeOrganizationId);
            return await getStackContainersByAppName(input.appName, input.serverId);
        }),

    getServiceContainersByAppName: adminProcedure
        .input(z.object({ appName: z.string().min(1), serverId: z.string().optional() }))
        .query(async ({ input, ctx }) => {
            await assertServerAccess(input.serverId, ctx.session.activeOrganizationId);
            return await getServiceContainersByAppName(input.appName, input.serverId);
        }),
});

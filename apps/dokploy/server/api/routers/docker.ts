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
import { createTRPCRouter, protectedProcedure } from "../trpc";
import http from "http";

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

export const dockerRouter = createTRPCRouter({
    getContainers: protectedProcedure
        .input(z.object({ serverId: z.string().optional() }))
        .query(async ({ input, ctx }) => {
            if (input.serverId) {
                const server = await findServerById(input.serverId);
                if (server.organizationId !== ctx.session?.activeOrganizationId) {
                    throw new TRPCError({ code: "UNAUTHORIZED" });
                }
            }
            return await getContainers(input.serverId);
        }),

    getVolumes: protectedProcedure.query(async () => {
        const result = await queryDocker("/volumes");
        return result.Volumes || [];
    }),

    getNetworks: protectedProcedure.query(async () => {
        return await queryDocker("/networks");
    }),

    getImages: protectedProcedure.query(async () => {
        return await queryDocker("/images/json");
    }),

    startContainer: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/containers/${input.id}/start`, "POST");
        }),

    stopContainer: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/containers/${input.id}/stop`, "POST");
        }),

    removeContainer: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            // v=true removes associated volumes if they are anonymous
            return await queryDocker(`/containers/${input.id}?force=true&v=true`, "DELETE");
        }),

    restartContainer: protectedProcedure
        .input(z.object({ containerId: z.string().min(1).regex(containerIdRegex) }))
        .mutation(async ({ input }) => {
            return await containerRestart(input.containerId);
        }),

    deleteImage: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/images/${input.id}?force=true`, "DELETE");
        }),

    deleteVolume: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input }) => {
            return await queryDocker(`/volumes/${input.name}`, "DELETE");
        }),

    pruneSystem: protectedProcedure
        .mutation(async () => {
            return await queryDocker("/images/prune", "POST");
        }),

    getConfig: protectedProcedure
        .input(z.object({
            containerId: z.string().min(1).regex(containerIdRegex),
            serverId: z.string().optional(),
        }))
        .query(async ({ input, ctx }) => {
            if (input.serverId) {
                const server = await findServerById(input.serverId);
                if (server.organizationId !== ctx.session?.activeOrganizationId) {
                    throw new TRPCError({ code: "UNAUTHORIZED" });
                }
            }
            return await getConfig(input.containerId, input.serverId);
        }),

    getContainersByAppNameMatch: protectedProcedure
        .input(z.object({
            appType: z.union([z.literal("stack"), z.literal("docker-compose")]).optional(),
            appName: z.string().min(1).regex(containerIdRegex),
            serverId: z.string().optional(),
        }))
        .query(async ({ input }) => {
            return await getContainersByAppNameMatch(input.appName, input.appType, input.serverId);
        }),

    getContainersByAppLabel: protectedProcedure
        .input(z.object({
            appName: z.string().min(1).regex(containerIdRegex),
            serverId: z.string().optional(),
            type: z.enum(["standalone", "swarm"]),
        }))
        .query(async ({ input }) => {
            return await getContainersByAppLabel(input.appName, input.type, input.serverId);
        }),

    getStackContainersByAppName: protectedProcedure
        .input(z.object({ appName: z.string().min(1), serverId: z.string().optional() }))
        .query(async ({ input }) => {
            return await getStackContainersByAppName(input.appName, input.serverId);
        }),

    getServiceContainersByAppName: protectedProcedure
        .input(z.object({ appName: z.string().min(1), serverId: z.string().optional() }))
        .query(async ({ input }) => {
            return await getServiceContainersByAppName(input.appName, input.serverId);
        }),
});
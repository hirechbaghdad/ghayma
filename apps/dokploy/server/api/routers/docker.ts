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

// Helper to query Docker Socket without external libraries
const queryDocker = (path: string): Promise<any> => {
    return new Promise((resolve, reject) => {
        const options = {
            socketPath: "/var/run/docker.sock",
            path: path,
            method: "GET",
        };
        const req = http.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    resolve([]);
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

    getVolumes: protectedProcedure
        .input(z.object({ serverId: z.string().optional() }))
        .query(async () => {
            const result = await queryDocker("/volumes");
            return result.Volumes || [];
        }),

    getNetworks: protectedProcedure
        .input(z.object({ serverId: z.string().optional() }))
        .query(async () => {
            return await queryDocker("/networks");
        }),

    getImages: protectedProcedure
        .input(z.object({ serverId: z.string().optional() }))
        .query(async () => {
            return await queryDocker("/images/json");
        }),

    restartContainer: protectedProcedure
        .input(z.object({
            containerId: z.string().min(1).regex(containerIdRegex),
        }))
        .mutation(async ({ input }) => {
            return await containerRestart(input.containerId);
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
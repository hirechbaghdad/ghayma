import {
    findUserById,
    IS_CLOUD,
    setupWebMonitoring,
    updateUser,
} from "@dokploy/server";
import { TRPCError } from "@trpc/server";
import { apiUpdateWebServerMonitoring } from "@/server/db/schema";
import { adminProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import { OpenAI } from "openai";
import * as schema from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const adminRouter = createTRPCRouter({
    // Existing Dokploy Monitoring Logic
    setupMonitoring: adminProcedure
        .input(apiUpdateWebServerMonitoring)
        .mutation(async ({ input, ctx }) => {
            try {
                if (IS_CLOUD) {
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        message: "Feature disabled on cloud",
                    });
                }
                const user = await findUserById(ctx.user.ownerId);
                if (user.id !== ctx.user.ownerId) {
                    throw new TRPCError({
                        code: "UNAUTHORIZED",
                        message: "You are not authorized to setup the monitoring",
                    });
                }

                await updateUser(user.id, {
                    metricsConfig: {
                        server: {
                            type: "Dokploy",
                            refreshRate: input.metricsConfig.server.refreshRate,
                            port: input.metricsConfig.server.port,
                            token: input.metricsConfig.server.token,
                            cronJob: input.metricsConfig.server.cronJob,
                            urlCallback: input.metricsConfig.server.urlCallback,
                            retentionDays: input.metricsConfig.server.retentionDays,
                            thresholds: {
                                cpu: input.metricsConfig.server.thresholds.cpu,
                                memory: input.metricsConfig.server.thresholds.memory,
                            },
                        },
                        containers: {
                            refreshRate: input.metricsConfig.containers.refreshRate,
                            services: {
                                include: input.metricsConfig.containers.services.include || [],
                                exclude: input.metricsConfig.containers.services.exclude || [],
                            },
                        },
                    },
                });

                const currentServer = await setupWebMonitoring(user.id);
                return currentServer;
            } catch (error) {
                throw error;
            }
        }),

    // New AI Agent Logic
    executeAiAgent: adminProcedure
        .input(z.object({ prompt: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const db = (ctx as any).db;
            const user = (ctx as any).user;

            try {
                // 1. Get OpenAI Config from DB
                const aiSettings = await db
                    .select()
                    .from(schema.ai)
                    .where(eq(schema.ai.provider, "openai"))
                    .limit(1);

                const config = aiSettings[0];

                if (!config?.apiKey) {
                    return { 
                        message: "\x1b[31mError:\x1b[0m OpenAI API Key is missing. Please save it in the AI Settings tab." 
                    };
                }

                const openai = new OpenAI({ apiKey: config.apiKey });

                // 2. Parse User Intent
                const response = await openai.chat.completions.create({
                    model: "gpt-4-turbo-preview",
                    messages: [
                        {
                            role: "system",
                            content: `You are a Atlanexis Assistant. 
                            Parse the user's request into a JSON action.
                            Supported actions: 
                            1. { "action": "CREATE_PROJECT", "name": "string" }
                            Return ONLY JSON.`
                        },
                        { role: "user", content: input.prompt }
                    ],
                    response_format: { type: "json_object" }
                });

                const intent = JSON.parse(response.choices[0].message.content || "{}");

                // 3. Execute Action: CREATE_PROJECT
                if (intent.action === "CREATE_PROJECT") {
                    // Check if project exists
                    const existing = await db
                        .select()
                        .from(schema.project)
                        .where(eq(schema.project.name, intent.name))
                        .limit(1);

                    if (existing.length > 0) {
                        return { message: `\x1b[33m!\x1b[0m Project "${intent.name}" already exists.` };
                    }

                    // Insert new project
                    await db.insert(schema.project).values({
                        name: intent.name,
                        description: "Created via AI Agent",
                        ownerId: user?.ownerId || user?.id || "",
                    });

                    return { 
                        message: `\x1b[32m✔\x1b[0m Project \x1b[1m${intent.name}\x1b[0m created successfully.` 
                    };
                }

                return { message: "I understood your request but I don't have an action for it yet." };

            } catch (err: any) {
                console.error("AI Agent Error:", err);
                return { 
                    message: `\x1b[31mError:\x1b[0m ${err.message || "Unknown error occurred"}` 
                };
            }
        }),
});
import { adminProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import { projects, organization } from "../../db/schema"; 
import { TRPCError } from "@trpc/server";

export const marketplaceRouter = createTRPCRouter({
    getTemplates: adminProcedure.query(async () => {
        const sources = [
            "https://raw.githubusercontent.com/dokploy/templates/main/templates.json",
            "https://templates.dokploy.com/templates.json"
        ];

        for (const url of sources) {
            try {
                console.log(`[Marketplace] Fetching: ${url}`);
                const response = await fetch(url, { 
                    method: 'GET',
                    headers: { 
                        'Accept': 'application/json, text/plain, */*',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        'Cache-Control': 'no-cache'
                    },
                    signal: AbortSignal.timeout(10000), 
                });

                if (!response.ok) continue;

                const contentType = response.headers.get("content-type");
                const text = await response.text();

                if (contentType?.includes("application/json")) {
                    const data = JSON.parse(text);
                    if (Array.isArray(data)) {
                        console.log(`[Marketplace] Successfully loaded ${data.length} templates.`);
                        return data;
                    }
                }
            } catch (e: any) {
                console.error(`[Marketplace] Failed to fetch ${url}:`, e?.message);
            }
        }

        throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Atlanexis Ghayma backend services are offline for the moment, please check later.",
        });
    }),

    deploy: adminProcedure
        .input(z.object({
            templateId: z.string(),
            projectName: z.string().optional(),
            existingProjectId: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
            const { db, services, user } = ctx as any;

            try {
                let targetProjectId = input.existingProjectId;

                // Handle New Project Creation
                if (input.projectName) {
                    // Critical Fix: Ensure we use a valid organization ID from the DB
                    const orgs = await db.select().from(organization).limit(1);
                    if (orgs.length === 0) {
                        throw new Error("No organization found. Please check your Dokploy setup.");
                    }

                    const [newProject] = await db.insert(projects).values({
                        name: input.projectName,
                        description: `Marketplace: ${input.templateId}`,
                        ownerId: user.id,
                        organizationId: orgs[0].id,
                    }).returning();
                    
                    if (!newProject) throw new Error("Failed to create project record.");
                    targetProjectId = newProject.id;
                }

                if (!targetProjectId) {
                    throw new TRPCError({ 
                        code: "BAD_REQUEST", 
                        message: "Target project ID is missing." 
                    });
                }

                // Deploy using the Dokploy template service
                await services.template.deployTemplate({
                    projectId: targetProjectId,
                    templateId: input.templateId.toLowerCase(),
                });

                return { success: true, projectId: targetProjectId };
            } catch (error: any) {
                console.error("Marketplace Deploy Error:", error);
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: error?.message || "Internal deployment failure",
                });
            }
        }),
});
import { db } from "../db/index.js";
import { environments, } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { asc, eq } from "drizzle-orm";
export const createEnvironment = async (input) => {
    const newEnvironment = await db
        .insert(environments)
        .values({
        ...input,
    })
        .returning()
        .then((value) => value[0]);
    if (!newEnvironment) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error creating the environment",
        });
    }
    return newEnvironment;
};
export const findEnvironmentById = async (environmentId) => {
    const environment = await db.query.environments.findFirst({
        where: eq(environments.environmentId, environmentId),
        with: {
            applications: {
                with: {
                    deployments: true,
                    server: true,
                },
            },
            mariadb: {
                with: {
                    server: true,
                },
            },
            mongo: {
                with: {
                    server: true,
                },
            },
            mysql: {
                with: {
                    server: true,
                },
            },
            postgres: {
                with: {
                    server: true,
                },
            },
            redis: {
                with: {
                    server: true,
                },
            },
            compose: {
                with: {
                    deployments: true,
                    server: true,
                },
            },
            project: true,
        },
    });
    if (!environment) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Environment not found",
        });
    }
    return environment;
};
export const findEnvironmentsByProjectId = async (projectId) => {
    const projectEnvironments = await db.query.environments.findMany({
        where: eq(environments.projectId, projectId),
        orderBy: asc(environments.createdAt),
        with: {
            applications: true,
            mariadb: true,
            mongo: true,
            mysql: true,
            postgres: true,
            redis: true,
            compose: true,
            project: true,
        },
    });
    return projectEnvironments;
};
export const deleteEnvironment = async (environmentId) => {
    const currentEnvironment = await findEnvironmentById(environmentId);
    if (currentEnvironment.name === "production") {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "You cannot delete the production environment",
        });
    }
    const deletedEnvironment = await db
        .delete(environments)
        .where(eq(environments.environmentId, environmentId))
        .returning()
        .then((value) => value[0]);
    return deletedEnvironment;
};
export const updateEnvironmentById = async (environmentId, environmentData) => {
    const result = await db
        .update(environments)
        .set({
        ...environmentData,
    })
        .where(eq(environments.environmentId, environmentId))
        .returning()
        .then((res) => res[0]);
    return result;
};
export const duplicateEnvironment = async (input) => {
    // Find the original environment
    const originalEnvironment = await findEnvironmentById(input.environmentId);
    // Create a new environment with the provided name and description
    const newEnvironment = await db
        .insert(environments)
        .values({
        name: input.name,
        description: input.description || originalEnvironment.description,
        projectId: originalEnvironment.projectId,
    })
        .returning()
        .then((value) => value[0]);
    if (!newEnvironment) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error duplicating the environment",
        });
    }
    return newEnvironment;
};
export const createProductionEnvironment = async (projectId) => {
    return createEnvironment({
        name: "production",
        description: "Production environment",
        projectId,
    });
};

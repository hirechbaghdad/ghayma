import { db } from "../db/index.js";
import { registry } from "../db/schema/index.js";
import { execAsync, execAsyncRemote, } from "../utils/process/execAsync.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { IS_CLOUD } from "../constants/index.js";
function shEscape(s) {
    if (!s)
        return "''";
    return `'${s.replace(/'/g, `'\\''`)}'`;
}
function safeDockerLoginCommand(registry, user, pass) {
    const escapedRegistry = shEscape(registry);
    const escapedUser = shEscape(user);
    const escapedPassword = shEscape(pass);
    return `printf %s ${escapedPassword} | docker login ${escapedRegistry} -u ${escapedUser} --password-stdin`;
}
export const createRegistry = async (input, organizationId) => {
    return await db.transaction(async (tx) => {
        const newRegistry = await tx
            .insert(registry)
            .values({
            ...input,
            organizationId: organizationId,
        })
            .returning()
            .then((value) => value[0]);
        if (!newRegistry) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error input:  Inserting registry",
            });
        }
        if (IS_CLOUD && !input.serverId && input.serverId !== "none") {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Select a server to add the registry",
            });
        }
        const loginCommand = safeDockerLoginCommand(input.registryUrl, input.username, input.password);
        if (input.serverId && input.serverId !== "none") {
            await execAsyncRemote(input.serverId, loginCommand);
        }
        else if (newRegistry.registryType === "cloud") {
            await execAsync(loginCommand);
        }
        return newRegistry;
    });
};
export const removeRegistry = async (registryId) => {
    try {
        const response = await db
            .delete(registry)
            .where(eq(registry.registryId, registryId))
            .returning()
            .then((res) => res[0]);
        if (!response) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Registry not found",
            });
        }
        if (!IS_CLOUD) {
            await execAsync(`docker logout ${response.registryUrl}`);
        }
        return response;
    }
    catch (error) {
        throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Error removing this registry",
            cause: error,
        });
    }
};
export const updateRegistry = async (registryId, registryData) => {
    try {
        const response = await db
            .update(registry)
            .set({
            ...registryData,
        })
            .where(eq(registry.registryId, registryId))
            .returning()
            .then((res) => res[0]);
        const loginCommand = safeDockerLoginCommand(response?.registryUrl, response?.username, response?.password);
        if (IS_CLOUD &&
            !registryData?.serverId &&
            registryData?.serverId !== "none") {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "Select a server to add the registry",
            });
        }
        if (registryData?.serverId && registryData?.serverId !== "none") {
            await execAsyncRemote(registryData.serverId, loginCommand);
        }
        else if (response?.registryType === "cloud") {
            await execAsync(loginCommand);
        }
        return response;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Error updating this registry";
        throw new TRPCError({
            code: "BAD_REQUEST",
            message,
        });
    }
};
export const findRegistryById = async (registryId) => {
    const registryResponse = await db.query.registry.findFirst({
        where: eq(registry.registryId, registryId),
        columns: {
            password: false,
        },
    });
    if (!registryResponse) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Registry not found",
        });
    }
    return registryResponse;
};
export const findAllRegistryByOrganizationId = async (organizationId) => {
    const registryResponse = await db.query.registry.findMany({
        where: eq(registry.organizationId, organizationId),
    });
    return registryResponse;
};

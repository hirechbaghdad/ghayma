import dns from "node:dns";
import { promisify } from "node:util";
import { db } from "../db/index.js";
import { generateRandomDomain } from "../templates/index.js";
import { manageDomain } from "../utils/traefik/domain.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { domains } from "../db/schema/index.js";
import { findUserById } from "./admin.js";
import { findApplicationById } from "./application.js";
import { detectCDNProvider } from "./cdn.js";
import { findServerById } from "./server.js";
export const createDomain = async (input) => {
    const result = await db.transaction(async (tx) => {
        const domain = await tx
            .insert(domains)
            .values({
            ...input,
        })
            .returning()
            .then((response) => response[0]);
        if (!domain) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating domain",
            });
        }
        if (domain.applicationId) {
            const application = await findApplicationById(domain.applicationId);
            await manageDomain(application, domain);
        }
        return domain;
    });
    return result;
};
export const generateTraefikMeDomain = async (appName, userId, serverId) => {
    if (serverId) {
        const server = await findServerById(serverId);
        return generateRandomDomain({
            serverIp: server.ipAddress,
            projectName: appName,
        });
    }
    if (process.env.NODE_ENV === "development") {
        return generateRandomDomain({
            serverIp: "",
            projectName: appName,
        });
    }
    const admin = await findUserById(userId);
    return generateRandomDomain({
        serverIp: admin?.serverIp || "",
        projectName: appName,
    });
};
export const generateWildcardDomain = (appName, serverDomain) => {
    return `${appName}-${serverDomain}`;
};
export const findDomainById = async (domainId) => {
    const domain = await db.query.domains.findFirst({
        where: eq(domains.domainId, domainId),
        with: {
            application: true,
        },
    });
    if (!domain) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Domain not found",
        });
    }
    return domain;
};
export const findDomainsByApplicationId = async (applicationId) => {
    const domainsArray = await db.query.domains.findMany({
        where: eq(domains.applicationId, applicationId),
        with: {
            application: true,
        },
    });
    return domainsArray;
};
export const findDomainsByComposeId = async (composeId) => {
    const domainsArray = await db.query.domains.findMany({
        where: eq(domains.composeId, composeId),
        with: {
            compose: true,
        },
    });
    return domainsArray;
};
export const updateDomainById = async (domainId, domainData) => {
    const domain = await db
        .update(domains)
        .set({
        ...domainData,
    })
        .where(eq(domains.domainId, domainId))
        .returning();
    return domain[0];
};
export const removeDomainById = async (domainId) => {
    await findDomainById(domainId);
    const result = await db
        .delete(domains)
        .where(eq(domains.domainId, domainId))
        .returning();
    return result[0];
};
export const getDomainHost = (domain) => {
    return `${domain.https ? "https" : "http"}://${domain.host}`;
};
const resolveDns = promisify(dns.resolve4);
export const validateDomain = async (domain, expectedIp) => {
    try {
        // Remove protocol and path if present
        const cleanDomain = domain.replace(/^https?:\/\//, "").split("/")[0];
        // Resolve the domain to get its IP
        const ips = await resolveDns(cleanDomain || "");
        const resolvedIps = ips.map((ip) => ip.toString());
        // Check if any IP belongs to a CDN provider
        const cdnProvider = ips
            .map((ip) => detectCDNProvider(ip))
            .find((provider) => provider !== null);
        // If behind a CDN, we consider it valid but inform the user
        if (cdnProvider) {
            return {
                isValid: true,
                resolvedIp: resolvedIps.join(", "),
                cdnProvider: cdnProvider.displayName,
                error: cdnProvider.warningMessage,
            };
        }
        // If we have an expected IP, validate against it
        if (expectedIp) {
            return {
                isValid: resolvedIps.includes(expectedIp),
                resolvedIp: resolvedIps.join(", "),
                error: !resolvedIps.includes(expectedIp)
                    ? `Domain resolves to ${resolvedIps.join(", ")} but should point to ${expectedIp}`
                    : undefined,
            };
        }
        // If no expected IP, just return the resolved IP
        return {
            isValid: true,
            resolvedIp: resolvedIps.join(", "),
        };
    }
    catch (error) {
        return {
            isValid: false,
            error: error instanceof Error ? error.message : "Failed to resolve domain",
        };
    }
};

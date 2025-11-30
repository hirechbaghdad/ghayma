import { type apiCreateRegistry, registry } from "../db/schema/index.js";
export type Registry = typeof registry.$inferSelect;
export declare const createRegistry: (input: typeof apiCreateRegistry._type, organizationId: string) => Promise<{
    createdAt: string;
    organizationId: string;
    username: string;
    password: string;
    registryUrl: string;
    registryId: string;
    registryName: string;
    imagePrefix: string | null;
    registryType: "selfHosted" | "cloud";
}>;
export declare const removeRegistry: (registryId: string) => Promise<{
    createdAt: string;
    organizationId: string;
    username: string;
    password: string;
    registryUrl: string;
    registryId: string;
    registryName: string;
    imagePrefix: string | null;
    registryType: "selfHosted" | "cloud";
}>;
export declare const updateRegistry: (registryId: string, registryData: Partial<Registry> & {
    serverId?: string | null;
}) => Promise<{
    registryId: string;
    registryName: string;
    imagePrefix: string | null;
    username: string;
    password: string;
    registryUrl: string;
    createdAt: string;
    registryType: "selfHosted" | "cloud";
    organizationId: string;
} | undefined>;
export declare const findRegistryById: (registryId: string) => Promise<{
    createdAt: string;
    organizationId: string;
    username: string;
    registryUrl: string;
    registryId: string;
    registryName: string;
    imagePrefix: string | null;
    registryType: "selfHosted" | "cloud";
}>;
export declare const findAllRegistryByOrganizationId: (organizationId: string) => Promise<{
    createdAt: string;
    organizationId: string;
    username: string;
    password: string;
    registryUrl: string;
    registryId: string;
    registryName: string;
    imagePrefix: string | null;
    registryType: "selfHosted" | "cloud";
}[]>;

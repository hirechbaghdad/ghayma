import { gitProvider } from "../db/schema/index.js";
export type GitProvider = typeof gitProvider.$inferSelect;
export declare const removeGitProvider: (gitProviderId: string) => Promise<{
    name: string;
    gitProviderId: string;
    providerType: "gitea" | "github" | "gitlab" | "bitbucket";
    createdAt: string;
    organizationId: string;
    userId: string;
} | undefined>;
export declare const findGitProviderById: (gitProviderId: string) => Promise<{
    name: string;
    gitProviderId: string;
    providerType: "gitea" | "github" | "gitlab" | "bitbucket";
    createdAt: string;
    organizationId: string;
    userId: string;
}>;
export declare const updateGitProvider: (gitProviderId: string, input: Partial<GitProvider>) => Promise<{
    gitProviderId: string;
    name: string;
    providerType: "gitea" | "github" | "gitlab" | "bitbucket";
    createdAt: string;
    organizationId: string;
    userId: string;
} | undefined>;

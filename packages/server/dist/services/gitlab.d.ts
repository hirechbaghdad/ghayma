import { type apiCreateGitlab, gitlab } from "../db/schema/index.js";
export type Gitlab = typeof gitlab.$inferSelect;
export declare const createGitlab: (input: typeof apiCreateGitlab._type, organizationId: string, userId: string) => Promise<void>;
export declare const findGitlabById: (gitlabId: string) => Promise<{
    redirectUri: string | null;
    gitProviderId: string;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
    gitlabId: string;
    gitlabUrl: string;
    applicationId: string | null;
    secret: string | null;
    groupName: string | null;
    gitProvider: {
        name: string;
        gitProviderId: string;
        providerType: "gitea" | "github" | "gitlab" | "bitbucket";
        createdAt: string;
        organizationId: string;
        userId: string;
    };
}>;
export declare const updateGitlab: (gitlabId: string, input: Partial<Gitlab>) => Promise<{
    gitlabId: string;
    gitlabUrl: string;
    applicationId: string | null;
    redirectUri: string | null;
    secret: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    groupName: string | null;
    expiresAt: number | null;
    gitProviderId: string;
} | undefined>;

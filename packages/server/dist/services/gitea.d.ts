import { type apiCreateGitea, gitea } from "../db/schema/index.js";
export type Gitea = typeof gitea.$inferSelect;
export declare const createGitea: (input: typeof apiCreateGitea._type, organizationId: string, userId: string) => Promise<{
    giteaId: string;
    clientId: string | null;
    giteaUrl: string;
}>;
export declare const findGiteaById: (giteaId: string) => Promise<{
    giteaId: string;
    giteaUrl: string;
    redirectUri: string | null;
    clientId: string | null;
    clientSecret: string | null;
    gitProviderId: string;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
    scopes: string | null;
    lastAuthenticatedAt: number | null;
    gitProvider: {
        name: string;
        gitProviderId: string;
        providerType: "gitea" | "github" | "gitlab" | "bitbucket";
        createdAt: string;
        organizationId: string;
        userId: string;
    };
}>;
export declare const updateGitea: (giteaId: string, input: Partial<Gitea>) => Promise<{
    giteaId: string;
    giteaUrl: string;
    redirectUri: string | null;
    clientId: string | null;
    clientSecret: string | null;
    gitProviderId: string;
    accessToken: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
    scopes: string | null;
    lastAuthenticatedAt: number | null;
}>;

import { type apiCreateBitbucket, type apiUpdateBitbucket, bitbucket } from "../db/schema/index.js";
export type Bitbucket = typeof bitbucket.$inferSelect;
export declare const createBitbucket: (input: typeof apiCreateBitbucket._type, organizationId: string, userId: string) => Promise<void>;
export declare const findBitbucketById: (bitbucketId: string) => Promise<{
    gitProviderId: string;
    bitbucketId: string;
    bitbucketUsername: string | null;
    bitbucketEmail: string | null;
    appPassword: string | null;
    apiToken: string | null;
    bitbucketWorkspaceName: string | null;
    gitProvider: {
        name: string;
        gitProviderId: string;
        providerType: "gitea" | "github" | "gitlab" | "bitbucket";
        createdAt: string;
        organizationId: string;
        userId: string;
    };
}>;
export declare const updateBitbucket: (bitbucketId: string, input: typeof apiUpdateBitbucket._type) => Promise<{
    bitbucketId: string;
    bitbucketUsername: string | null;
    bitbucketEmail: string | null;
    appPassword: string | null;
    apiToken: string | null;
    bitbucketWorkspaceName: string | null;
    gitProviderId: string;
} | undefined>;

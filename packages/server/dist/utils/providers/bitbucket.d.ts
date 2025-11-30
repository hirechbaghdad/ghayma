import type { apiBitbucketTestConnection, apiFindBitbucketBranches } from "../../db/schema/index.js";
import { type Bitbucket } from "../../services/bitbucket.js";
import type { InferResultType } from "../../types/with.js";
export type ApplicationWithBitbucket = InferResultType<"applications", {
    bitbucket: true;
}>;
export type ComposeWithBitbucket = InferResultType<"compose", {
    bitbucket: true;
}>;
export declare const getBitbucketCloneUrl: (bitbucketProvider: {
    apiToken?: string | null;
    bitbucketUsername?: string | null;
    appPassword?: string | null;
    bitbucketEmail?: string | null;
    bitbucketWorkspaceName?: string | null;
} | null, repoClone: string) => string;
export declare const getBitbucketHeaders: (bitbucketProvider: Bitbucket) => {
    Authorization: string;
};
interface CloneBitbucketRepository {
    appName: string;
    bitbucketRepository: string | null;
    bitbucketOwner: string | null;
    bitbucketBranch: string | null;
    bitbucketId: string | null;
    enableSubmodules: boolean;
    serverId: string | null;
    type?: "application" | "compose";
}
export declare const cloneBitbucketRepository: ({ type, ...entity }: CloneBitbucketRepository) => Promise<string>;
export declare const getBitbucketRepositories: (bitbucketId?: string) => Promise<{
    name: string;
    url: string;
    owner: {
        username: string;
    };
}[]>;
export declare const getBitbucketBranches: (input: typeof apiFindBitbucketBranches._type) => Promise<{
    name: string;
    commit: {
        sha: string;
    };
}[]>;
export declare const testBitbucketConnection: (input: typeof apiBitbucketTestConnection._type) => Promise<0>;
export {};

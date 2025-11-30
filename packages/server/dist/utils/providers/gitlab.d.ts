import type { apiGitlabTestConnection } from "../../db/schema/index.js";
import { type Gitlab } from "../../services/gitlab.js";
import type { InferResultType } from "../../types/with.js";
export declare const refreshGitlabToken: (gitlabProviderId: string) => Promise<any>;
export declare const haveGitlabRequirements: (gitlabProvider: Gitlab) => boolean;
export type ApplicationWithGitlab = InferResultType<"applications", {
    gitlab: true;
}>;
export type ComposeWithGitlab = InferResultType<"compose", {
    gitlab: true;
}>;
export type GitlabInfo = ApplicationWithGitlab["gitlab"] | ComposeWithGitlab["gitlab"];
interface CloneGitlabRepository {
    appName: string;
    gitlabBranch: string | null;
    gitlabId: string | null;
    gitlabPathNamespace: string | null;
    enableSubmodules: boolean;
    serverId: string | null;
    type?: "application" | "compose";
}
export declare const cloneGitlabRepository: ({ type, ...entity }: CloneGitlabRepository) => Promise<string>;
export declare const getGitlabRepositories: (gitlabId?: string) => Promise<{
    id: number;
    name: string;
    url: string;
    owner: {
        username: string;
    };
}[]>;
export declare const getGitlabBranches: (input: {
    id?: number;
    gitlabId?: string;
    owner: string;
    repo: string;
}) => Promise<{
    id: string;
    name: string;
    commit: {
        id: string;
    };
}[]>;
export declare const testGitlabConnection: (input: typeof apiGitlabTestConnection._type) => Promise<number>;
export declare const validateGitlabProvider: (gitlabProvider: Gitlab) => Promise<any[]>;
export {};

import { type Gitea } from "../../services/gitea.js";
import type { InferResultType } from "../../types/with.js";
export declare const getErrorCloneRequirements: (entity: {
    giteaRepository?: string | null;
    giteaOwner?: string | null;
    giteaBranch?: string | null;
}) => string[];
export declare const refreshGiteaToken: (giteaProviderId: string) => Promise<any>;
export type ApplicationWithGitea = InferResultType<"applications", {
    gitea: true;
}>;
export type ComposeWithGitea = InferResultType<"compose", {
    gitea: true;
}>;
interface CloneGiteaRepository {
    appName: string;
    giteaBranch: string | null;
    giteaId: string | null;
    giteaOwner: string | null;
    giteaRepository: string | null;
    enableSubmodules: boolean;
    serverId: string | null;
    type?: "application" | "compose";
}
export declare const cloneGiteaRepository: ({ type, ...entity }: CloneGiteaRepository) => Promise<string>;
export declare const haveGiteaRequirements: (giteaProvider: Gitea) => boolean;
export declare const testGiteaConnection: (input: {
    giteaId: string;
}) => Promise<number>;
export declare const getGiteaRepositories: (giteaId?: string) => Promise<{
    id: any;
    name: any;
    url: any;
    owner: {
        username: any;
    };
}[]>;
export declare const getGiteaBranches: (input: {
    giteaId?: string;
    owner: string;
    repo: string;
}) => Promise<{
    id: string;
    name: string;
    commit: {
        id: string;
    };
}[]>;
export {};

interface CloneGitRepository {
    appName: string;
    customGitUrl?: string | null;
    customGitBranch?: string | null;
    customGitSSHKeyId?: string | null;
    enableSubmodules?: boolean;
    serverId: string | null;
    type?: "application" | "compose";
}
export declare const cloneGitRepository: ({ type, ...entity }: CloneGitRepository) => Promise<string>;
interface Props {
    appName: string;
    type?: "application" | "compose";
    serverId: string | null;
}
export declare const getGitCommitInfo: ({ appName, type, serverId, }: Props) => Promise<{
    message: string;
    hash: string;
} | null>;
export {};

import { type apiCreateSshKey, type apiFindOneSshKey, type apiRemoveSshKey, type apiUpdateSshKey } from "../db/schema/index.js";
export declare const createSshKey: (input: typeof apiCreateSshKey._type) => Promise<void>;
export declare const removeSSHKeyById: (sshKeyId: (typeof apiRemoveSshKey._type)["sshKeyId"]) => Promise<{
    name: string;
    description: string | null;
    publicKey: string;
    privateKey: string;
    createdAt: string;
    organizationId: string;
    sshKeyId: string;
    lastUsedAt: string | null;
} | undefined>;
export declare const updateSSHKeyById: ({ sshKeyId, ...input }: typeof apiUpdateSshKey._type) => Promise<{
    sshKeyId: string;
    privateKey: string;
    publicKey: string;
    name: string;
    description: string | null;
    createdAt: string;
    lastUsedAt: string | null;
    organizationId: string;
} | undefined>;
export declare const findSSHKeyById: (sshKeyId: (typeof apiFindOneSshKey._type)["sshKeyId"]) => Promise<{
    name: string;
    description: string | null;
    publicKey: string;
    privateKey: string;
    createdAt: string;
    organizationId: string;
    sshKeyId: string;
    lastUsedAt: string | null;
}>;

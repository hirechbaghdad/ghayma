export declare const generateSSHKey: (type?: "rsa" | "ed25519") => Promise<{
    privateKey: string;
    publicKey: string;
}>;

import { z } from "zod";
export declare const sshKeyCreate: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    publicKey: z.ZodEffects<z.ZodString, string, string>;
    privateKey: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    publicKey: string;
    privateKey: string;
    description?: string | undefined;
}, {
    name: string;
    publicKey: string;
    privateKey: string;
    description?: string | undefined;
}>;
export declare const sshKeyUpdate: z.ZodObject<Pick<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    publicKey: z.ZodEffects<z.ZodString, string, string>;
    privateKey: z.ZodEffects<z.ZodString, string, string>;
}, "name" | "description">, "strip", z.ZodTypeAny, {
    name: string;
    description?: string | undefined;
}, {
    name: string;
    description?: string | undefined;
}>;
export declare const sshKeyType: z.ZodObject<{
    type: z.ZodOptional<z.ZodEnum<["rsa", "ed25519"]>>;
}, "strip", z.ZodTypeAny, {
    type?: "rsa" | "ed25519" | undefined;
}, {
    type?: "rsa" | "ed25519" | undefined;
}>;

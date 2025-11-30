import { z } from "zod";
export declare const domain: z.ZodEffects<z.ZodObject<{
    host: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
    internalPath: z.ZodOptional<z.ZodString>;
    stripPath: z.ZodOptional<z.ZodBoolean>;
    port: z.ZodOptional<z.ZodNumber>;
    https: z.ZodOptional<z.ZodBoolean>;
    certificateType: z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>;
    customCertResolver: z.ZodString;
}, "strip", z.ZodTypeAny, {
    host: string;
    customCertResolver: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}, {
    host: string;
    customCertResolver: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}>, {
    host: string;
    customCertResolver: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}, {
    host: string;
    customCertResolver: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}>;
export declare const domainCompose: z.ZodEffects<z.ZodObject<{
    host: z.ZodString;
    path: z.ZodOptional<z.ZodString>;
    internalPath: z.ZodOptional<z.ZodString>;
    stripPath: z.ZodOptional<z.ZodBoolean>;
    port: z.ZodOptional<z.ZodNumber>;
    https: z.ZodOptional<z.ZodBoolean>;
    certificateType: z.ZodOptional<z.ZodEnum<["letsencrypt", "none", "custom"]>>;
    customCertResolver: z.ZodString;
    serviceName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    host: string;
    customCertResolver: string;
    serviceName: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}, {
    host: string;
    customCertResolver: string;
    serviceName: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}>, {
    host: string;
    customCertResolver: string;
    serviceName: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}, {
    host: string;
    customCertResolver: string;
    serviceName: string;
    path?: string | undefined;
    internalPath?: string | undefined;
    stripPath?: boolean | undefined;
    port?: number | undefined;
    https?: boolean | undefined;
    certificateType?: "letsencrypt" | "none" | "custom" | undefined;
}>;

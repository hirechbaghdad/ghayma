import { type apiCreateSecurity, security } from "../db/schema/index.js";
import type { z } from "zod";
export type Security = typeof security.$inferSelect;
export declare const findSecurityById: (securityId: string) => Promise<{
    createdAt: string;
    applicationId: string;
    username: string;
    password: string;
    securityId: string;
}>;
export declare const createSecurity: (data: z.infer<typeof apiCreateSecurity>) => Promise<void>;
export declare const deleteSecurityById: (securityId: string) => Promise<{
    createdAt: string;
    applicationId: string;
    username: string;
    password: string;
    securityId: string;
}>;
export declare const updateSecurityById: (securityId: string, data: Partial<Security>) => Promise<{
    securityId: string;
    username: string;
    password: string;
    createdAt: string;
    applicationId: string;
} | undefined>;

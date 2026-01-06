import { type apiCreateRedirect, redirects } from "../db/schema/index.js";
import type { z } from "zod";
export type Redirect = typeof redirects.$inferSelect;
export declare const findRedirectById: (redirectId: string) => Promise<{
    createdAt: string;
    applicationId: string;
    uniqueConfigKey: number;
    redirectId: string;
    regex: string;
    replacement: string;
    permanent: boolean;
}>;
export declare const createRedirect: (redirectData: z.infer<typeof apiCreateRedirect>) => Promise<boolean>;
export declare const removeRedirectById: (redirectId: string) => Promise<{
    createdAt: string;
    applicationId: string;
    uniqueConfigKey: number;
    redirectId: string;
    regex: string;
    replacement: string;
    permanent: boolean;
}>;
export declare const updateRedirectById: (redirectId: string, redirectData: Partial<Redirect>) => Promise<{
    redirectId: string;
    regex: string;
    replacement: string;
    permanent: boolean;
    uniqueConfigKey: number;
    createdAt: string;
    applicationId: string;
}>;

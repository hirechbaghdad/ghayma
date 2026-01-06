import { type apiCreateCertificate, certificates } from "../db/schema/index.js";
import type { z } from "zod";
export type Certificate = typeof certificates.$inferSelect;
export declare const findCertificateById: (certificateId: string) => Promise<{
    name: string;
    privateKey: string;
    organizationId: string;
    serverId: string | null;
    certificateId: string;
    certificateData: string;
    certificatePath: string;
    autoRenew: boolean | null;
}>;
export declare const createCertificate: (certificateData: z.infer<typeof apiCreateCertificate>, organizationId: string) => Promise<{
    name: string;
    privateKey: string;
    organizationId: string;
    serverId: string | null;
    certificateId: string;
    certificateData: string;
    certificatePath: string;
    autoRenew: boolean | null;
}>;
export declare const removeCertificateById: (certificateId: string) => Promise<{
    name: string;
    privateKey: string;
    organizationId: string;
    serverId: string | null;
    certificateId: string;
    certificateData: string;
    certificatePath: string;
    autoRenew: boolean | null;
}[]>;

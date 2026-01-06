import type { Domain } from "../services/domain.js";
export interface Schema {
    serverIp: string;
    projectName: string;
}
export type DomainSchema = Pick<Domain, "host" | "port" | "serviceName"> & {
    path?: string;
};
export interface Template {
    envs: string[];
    mounts: Array<{
        filePath: string;
        content: string;
    }>;
    domains: DomainSchema[];
}
export interface GenerateJWTOptions {
    length?: number;
    secret?: string;
    payload?: Record<string, unknown> | undefined;
}
export declare const generateRandomDomain: ({ serverIp, projectName, }: Schema) => string;
export declare const generateHash: (length?: number) => string;
export declare const generatePassword: (quantity?: number) => string;
/**
 * Generate a random base64 string from N random bytes
 * @param bytes Number of random bytes to generate before base64 encoding (default: 32)
 * @returns base64 encoded string of the random bytes
 */
export declare function generateBase64(bytes?: number): string;
export declare function generateJwt(options?: GenerateJWTOptions): string;
/**
 * Reads a template's docker-compose.yml file
 * First tries to fetch from GitHub, falls back to local cache if fetch fails
 */
export declare const readTemplateComposeFile: (id: string) => Promise<string>;
/**
 * Loads a template module from GitHub or local cache
 * First tries to fetch from GitHub, falls back to local cache if fetch fails
 */

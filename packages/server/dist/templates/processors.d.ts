import type { Schema } from "./index.js";
/**
 * Domain configuration
 */
interface DomainConfig {
    serviceName: string;
    port: number;
    path?: string;
    host?: string;
}
/**
 * Mount configuration
 */
interface MountConfig {
    filePath: string;
    content: string;
}
/**
 * Complete template interface that includes both metadata and configuration
 */
export interface CompleteTemplate {
    metadata: {
        id: string;
        name: string;
        description: string;
        tags: string[];
        version: string;
        logo: string;
        links: {
            github: string;
            website?: string;
            docs?: string;
        };
    };
    variables: Record<string, string>;
    config: {
        domains: DomainConfig[];
        env: Record<string, string | boolean | number> | (string | Record<string, string | boolean | number>)[];
        mounts?: MountConfig[];
    };
}
/**
 * Processed template output
 */
export interface Template {
    domains: Array<DomainConfig>;
    envs: string[];
    mounts: MountConfig[];
}
/**
 * Process a string value and replace variables
 */
export declare function processValue(value: string, variables: Record<string, string>, schema: Schema): string;
/**
 * Process variables in a template
 */
export declare function processVariables(template: CompleteTemplate, schema: Schema): Record<string, string>;
/**
 * Process domains in a template
 */
export declare function processDomains(template: CompleteTemplate, variables: Record<string, string>, schema: Schema): Template["domains"];
/**
 * Process environment variables in a template
 */
export declare function processEnvVars(template: CompleteTemplate, variables: Record<string, string>, schema: Schema): Template["envs"];
/**
 * Process mounts in a template
 */
export declare function processMounts(template: CompleteTemplate, variables: Record<string, string>, schema: Schema): Template["mounts"];
/**
 * Process a complete template
 */
export declare function processTemplate(template: CompleteTemplate, schema: Schema): Template;
export {};

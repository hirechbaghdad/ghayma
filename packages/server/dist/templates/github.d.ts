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
    variables: {
        [key: string]: string;
    };
    config: {
        domains: Array<{
            serviceName: string;
            port: number;
            path?: string;
            host?: string;
        }>;
        env: Record<string, string>;
        mounts?: Array<{
            filePath: string;
            content: string;
        }>;
    };
}
interface TemplateMetadata {
    id: string;
    name: string;
    description: string;
    version: string;
    logo: string;
    links: {
        github: string;
        website?: string;
        docs?: string;
    };
    tags: string[];
}
/**
 * Fetches the list of available templates from meta.json
 */
export declare function fetchTemplatesList(baseUrl?: string): Promise<TemplateMetadata[]>;
/**
 * Fetches a specific template's files
 */
export declare function fetchTemplateFiles(templateId: string, baseUrl?: string): Promise<{
    config: CompleteTemplate;
    dockerCompose: string;
}>;
export {};

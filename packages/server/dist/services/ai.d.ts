export declare const getAiSettingsByOrganizationId: (organizationId: string) => Promise<{
    name: string;
    createdAt: string;
    organizationId: string;
    aiId: string;
    apiUrl: string;
    apiKey: string;
    model: string;
    isEnabled: boolean;
}[]>;
export declare const getAiSettingById: (aiId: string) => Promise<{
    name: string;
    createdAt: string;
    organizationId: string;
    aiId: string;
    apiUrl: string;
    apiKey: string;
    model: string;
    isEnabled: boolean;
}>;
export declare const saveAiSettings: (organizationId: string, settings: any) => Promise<import("postgres").RowList<never[]>>;
export declare const deleteAiSettings: (aiId: string) => Promise<import("postgres").RowList<never[]>>;
interface Props {
    organizationId: string;
    aiId: string;
    input: string;
    serverId?: string | undefined;
}
export declare const suggestVariants: ({ organizationId, aiId, input, serverId, }: Props) => Promise<{
    dockerCompose: string;
    envVariables: {
        value: string;
        name: string;
    }[];
    domains: {
        host: string;
        port: number;
        serviceName: string;
    }[];
    configFiles?: {
        filePath: string;
        content: string;
    }[] | undefined;
    name: string;
    description: string;
    id: string;
    shortDescription: string;
}[]>;
export {};

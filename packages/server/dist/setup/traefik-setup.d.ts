export declare const TRAEFIK_SSL_PORT: number;
export declare const TRAEFIK_PORT: number;
export declare const TRAEFIK_HTTP3_PORT: number;
export declare const TRAEFIK_VERSION: string;
export interface TraefikOptions {
    env?: string[];
    serverId?: string;
    additionalPorts?: {
        targetPort: number;
        publishedPort: number;
        protocol?: string;
    }[];
}
export declare const initializeStandaloneTraefik: ({ env, serverId, additionalPorts, }?: TraefikOptions) => Promise<void>;
export declare const initializeTraefikService: ({ env, additionalPorts, serverId, }: TraefikOptions) => Promise<void>;
export declare const createDefaultServerTraefikConfig: () => void;
export declare const getDefaultTraefikConfig: () => string;
export declare const getDefaultServerTraefikConfig: () => string;
export declare const createDefaultTraefikConfig: () => void;
export declare const getDefaultMiddlewares: () => string;
export declare const createDefaultMiddlewares: () => void;

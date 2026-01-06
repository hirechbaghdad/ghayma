import type { Compose } from "../../services/compose.js";
import type { Domain } from "../../services/domain.js";
import type { ComposeSpecification, DefinitionsService, PropertiesNetworks } from "./types.js";
export declare const cloneCompose: (compose: Compose) => Promise<string>;
export declare const getComposePath: (compose: Compose) => string;
export declare const loadDockerCompose: (compose: Compose) => Promise<ComposeSpecification | null>;
export declare const loadDockerComposeRemote: (compose: Compose) => Promise<ComposeSpecification | null>;
export declare const readComposeFile: (compose: Compose) => Promise<string | null>;
export declare const writeDomainsToCompose: (compose: Compose, domains: Domain[]) => Promise<string>;
export declare const addDomainToCompose: (compose: Compose, domains: Domain[]) => Promise<ComposeSpecification | null>;
export declare const writeComposeFile: (compose: Compose, composeSpec: ComposeSpecification) => Promise<void>;
export declare const createDomainLabels: (appName: string, domain: Domain, entrypoint: "web" | "websecure") => string[];
export declare const addDokployNetworkToService: (networkService: DefinitionsService["networks"]) => import("./types.js").ListOfStrings | {
    [k: string]: {
        [k: string]: unknown;
        aliases?: import("./types.js").ListOfStrings;
        ipv4_address?: string;
        ipv6_address?: string;
        link_local_ips?: import("./types.js").ListOfStrings;
        mac_address?: string;
        driver_opts?: {
            [k: string]: string | number;
        };
        priority?: number;
    } | null;
};
export declare const addDokployNetworkToRoot: (networkRoot: PropertiesNetworks | undefined) => PropertiesNetworks;

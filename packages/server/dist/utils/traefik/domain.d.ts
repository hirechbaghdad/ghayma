import type { Domain } from "../../services/domain.js";
import type { ApplicationNested } from "../builders/index.js";
import type { HttpRouter } from "./file-types.js";
export declare const manageDomain: (app: ApplicationNested, domain: Domain) => Promise<void>;
export declare const removeDomain: (application: ApplicationNested, uniqueKey: number) => Promise<void>;
export declare const createRouterConfig: (app: ApplicationNested, domain: Domain, entryPoint: "web" | "websecure") => Promise<HttpRouter>;

import type { Redirect } from "../../services/redirect.js";
import type { ApplicationNested } from "../builders/index.js";
export declare const updateRedirectMiddleware: (application: ApplicationNested, data: Redirect) => Promise<void>;
export declare const createRedirectMiddleware: (application: ApplicationNested, data: Redirect) => Promise<void>;
export declare const removeRedirectMiddleware: (application: ApplicationNested, data: Redirect) => Promise<void>;

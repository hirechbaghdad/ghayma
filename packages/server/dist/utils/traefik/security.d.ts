import type { Security } from "../../services/security.js";
import type { ApplicationNested } from "../builders/index.js";
export declare const createSecurityMiddleware: (application: ApplicationNested, data: Security) => Promise<void>;
export declare const removeSecurityMiddleware: (application: ApplicationNested, data: Security) => Promise<void>;

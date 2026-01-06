import type { User } from "../../services/user.js";
export declare const updateServerTraefik: (user: User | null, newHost: string | null) => void;
export declare const updateLetsEncryptEmail: (newEmail: string | null) => void;
export declare const readMainConfig: () => string | null;
export declare const writeMainConfig: (traefikConfig: string) => void;

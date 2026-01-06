export interface CDNProvider {
    name: string;
    displayName: string;
    checkIp: (ip: string) => boolean;
    warningMessage: string;
}
export declare const detectCDNProvider: (ip: string) => CDNProvider | null;

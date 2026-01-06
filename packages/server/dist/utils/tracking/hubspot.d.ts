interface HubSpotFormField {
    objectTypeId: string;
    name: string;
    value: string;
}
interface HubSpotFormData {
    fields: HubSpotFormField[];
    context: {
        pageUri: string;
        pageName: string;
        hutk?: string;
    };
}
interface SignUpFormData {
    firstName?: string;
    lastName?: string;
    email?: string;
}
/**
 * Extract HubSpot UTK (User Token) from cookies
 * This is used for tracking and attribution in HubSpot
 */
export declare function getHubSpotUTK(cookieHeader?: string): string | null;
/**
 * Convert contact form data to HubSpot form format
 */
export declare function formatContactDataForHubSpot(contactData: SignUpFormData, hutk?: string | null): HubSpotFormData;
/**
 * Submit form data to HubSpot Forms API
 */
export declare function submitToHubSpot(contactData: SignUpFormData, hutk?: string | null): Promise<boolean>;
export {};

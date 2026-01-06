/**
 * Extract HubSpot UTK (User Token) from cookies
 * This is used for tracking and attribution in HubSpot
 */
export function getHubSpotUTK(cookieHeader) {
    if (!cookieHeader)
        return null;
    const name = "hubspotutk=";
    const decodedCookie = decodeURIComponent(cookieHeader);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
        const cookie = cookieArray[i]?.trim();
        if (!cookie)
            continue;
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return null;
}
/**
 * Convert contact form data to HubSpot form format
 */
export function formatContactDataForHubSpot(contactData, hutk) {
    const formData = {
        fields: [
            {
                objectTypeId: "0-1", // Contact object type
                name: "firstname",
                value: contactData.firstName || "",
            },
            {
                objectTypeId: "0-1",
                name: "lastname",
                value: contactData.lastName || "",
            },
            {
                objectTypeId: "0-1",
                name: "email",
                value: contactData.email || "",
            },
        ],
        context: {
            pageUri: "https://app.dokploy.com/register",
            pageName: "Sign Up",
        },
    };
    // Add HubSpot UTK if available
    if (hutk) {
        formData.context.hutk = hutk;
    }
    return formData;
}
/**
 * Submit form data to HubSpot Forms API
 */
export async function submitToHubSpot(contactData, hutk) {
    try {
        const portalId = process.env.HUBSPOT_PORTAL_ID;
        const formGuid = process.env.HUBSPOT_FORM_GUID;
        if (!portalId || !formGuid) {
            console.error("HubSpot configuration missing: HUBSPOT_PORTAL_ID or HUBSPOT_FORM_GUID not set");
            return false;
        }
        const formData = formatContactDataForHubSpot(contactData, hutk);
        const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error("HubSpot API error:", response.status, errorText);
            return false;
        }
        const result = await response.json();
        console.log("HubSpot submission successful:", result);
        return true;
    }
    catch (error) {
        console.error("Error submitting to HubSpot:", error);
        return false;
    }
}

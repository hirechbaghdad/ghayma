import { parse } from "toml";
/**
 * Fetches the list of available templates from meta.json
 */
export async function fetchTemplatesList(baseUrl = "https://templates.dokploy.com") {
    try {
        const response = await fetch(`${baseUrl}/meta.json`);
        if (!response.ok) {
            throw new Error(`Failed to fetch templates: ${response.statusText}`);
        }
        const templates = (await response.json());
        return templates.map((template) => ({
            id: template.id,
            name: template.name,
            description: template.description,
            version: template.version,
            logo: template.logo,
            links: template.links,
            tags: template.tags,
        }));
    }
    catch (error) {
        console.error("Error fetching templates list:", error);
        throw error;
    }
}
/**
 * Fetches a specific template's files
 */
export async function fetchTemplateFiles(templateId, baseUrl = "https://templates.dokploy.com") {
    try {
        // Fetch both files in parallel
        const [templateYmlResponse, dockerComposeResponse] = await Promise.all([
            fetch(`${baseUrl}/blueprints/${templateId}/template.toml`),
            fetch(`${baseUrl}/blueprints/${templateId}/docker-compose.yml`),
        ]);
        if (!templateYmlResponse.ok || !dockerComposeResponse.ok) {
            throw new Error("Template files not found");
        }
        const [templateYml, dockerCompose] = await Promise.all([
            templateYmlResponse.text(),
            dockerComposeResponse.text(),
        ]);
        const config = parse(templateYml);
        return { config, dockerCompose };
    }
    catch (error) {
        console.error(`Error fetching template ${templateId}:`, error);
        throw error;
    }
}

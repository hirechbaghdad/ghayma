// En la sección depends_on de otros servicios: Para definir dependencias entre servicios.
// En la sección networks de otros servicios: Aunque esto no es común, es posible referenciar servicios en redes personalizadas.
// En la sección volumes_from de otros servicios: Para reutilizar volúmenes definidos por otro servicio.
// En la sección links de otros servicios: Para crear enlaces entre servicios.
// En la sección extends de otros servicios: Para extender la configuración de otro servicio.
import _ from "lodash";
export const addSuffixToServiceNames = (services, suffix) => {
    const newServices = {};
    for (const [serviceName, serviceConfig] of Object.entries(services)) {
        const newServiceName = `${serviceName}-${suffix}`;
        const newServiceConfig = _.cloneDeep(serviceConfig);
        // Reemplazar nombres de servicios en depends_on
        if (newServiceConfig.depends_on) {
            if (Array.isArray(newServiceConfig.depends_on)) {
                newServiceConfig.depends_on = newServiceConfig.depends_on.map((dep) => `${dep}-${suffix}`);
            }
            else {
                const newDependsOn = {};
                for (const [depName, depConfig] of Object.entries(newServiceConfig.depends_on)) {
                    newDependsOn[`${depName}-${suffix}`] = depConfig;
                }
                newServiceConfig.depends_on = newDependsOn;
            }
        }
        // Reemplazar nombre en container_name
        if (newServiceConfig.container_name) {
            newServiceConfig.container_name = `${newServiceConfig.container_name}-${suffix}`;
        }
        // Reemplazar nombres de servicios en links
        if (newServiceConfig.links) {
            newServiceConfig.links = newServiceConfig.links.map((link) => `${link}-${suffix}`);
        }
        // Reemplazar nombres de servicios en extends
        if (newServiceConfig.extends) {
            if (typeof newServiceConfig.extends === "string") {
                newServiceConfig.extends = `${newServiceConfig.extends}-${suffix}`;
            }
            else {
                newServiceConfig.extends.service = `${newServiceConfig.extends.service}-${suffix}`;
            }
        }
        // Reemplazar nombres de servicios en volumes_from
        if (newServiceConfig.volumes_from) {
            newServiceConfig.volumes_from = newServiceConfig.volumes_from.map((vol) => `${vol}-${suffix}`);
        }
        newServices[newServiceName] = newServiceConfig;
    }
    return newServices;
};
export const addSuffixToAllServiceNames = (composeData, suffix) => {
    const updatedComposeData = { ...composeData };
    if (updatedComposeData.services) {
        updatedComposeData.services = addSuffixToServiceNames(updatedComposeData.services, suffix);
    }
    return updatedComposeData;
};

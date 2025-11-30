import _ from "lodash";
export const addAppNameToRootNetwork = (composeData, appName) => {
    const updatedComposeData = { ...composeData };
    // Initialize networks if it doesn't exist
    if (!updatedComposeData.networks) {
        updatedComposeData.networks = {};
    }
    // Add the new network with the app name
    updatedComposeData.networks[appName] = {
        name: appName,
        external: true,
    };
    return updatedComposeData;
};
export const addAppNameToServiceNetworks = (services, appName) => {
    return _.mapValues(services, (service) => {
        if (!service.networks) {
            service.networks = [appName];
            return service;
        }
        if (Array.isArray(service.networks)) {
            if (!service.networks.includes(appName)) {
                service.networks.push(appName);
            }
        }
        else {
            service.networks[appName] = {};
        }
        return service;
    });
};
export const addAppNameToAllServiceNames = (composeData, appName) => {
    let updatedComposeData = { ...composeData };
    updatedComposeData = addAppNameToRootNetwork(updatedComposeData, appName);
    if (updatedComposeData.services) {
        updatedComposeData.services = addAppNameToServiceNetworks(updatedComposeData.services, appName);
    }
    return updatedComposeData;
};

import _ from "lodash";
export const addSuffixToConfigsRoot = (configs, suffix) => {
    const newConfigs = {};
    _.forEach(configs, (config, configName) => {
        const newConfigName = `${configName}-${suffix}`;
        newConfigs[newConfigName] = _.cloneDeep(config);
    });
    return newConfigs;
};
export const addSuffixToConfigsInServices = (services, suffix) => {
    const newServices = {};
    _.forEach(services, (serviceConfig, serviceName) => {
        const newServiceConfig = _.cloneDeep(serviceConfig);
        // Reemplazar nombres de configs en configs
        if (_.has(newServiceConfig, "configs")) {
            newServiceConfig.configs = _.map(newServiceConfig.configs, (config) => {
                if (_.isString(config)) {
                    return `${config}-${suffix}`;
                }
                if (_.isObject(config) && config.source) {
                    return {
                        ...config,
                        source: `${config.source}-${suffix}`,
                    };
                }
                return config;
            });
        }
        newServices[serviceName] = newServiceConfig;
    });
    return newServices;
};
export const addSuffixToAllConfigs = (composeData, suffix) => {
    const updatedComposeData = { ...composeData };
    if (composeData?.configs) {
        updatedComposeData.configs = addSuffixToConfigsRoot(composeData.configs, suffix);
    }
    if (composeData?.services) {
        updatedComposeData.services = addSuffixToConfigsInServices(composeData.services, suffix);
    }
    return updatedComposeData;
};

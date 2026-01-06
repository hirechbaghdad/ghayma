import _ from "lodash";
export const addSuffixToSecretsRoot = (secrets, suffix) => {
    const newSecrets = {};
    _.forEach(secrets, (secretConfig, secretName) => {
        const newSecretName = `${secretName}-${suffix}`;
        newSecrets[newSecretName] = _.cloneDeep(secretConfig);
    });
    return newSecrets;
};
export const addSuffixToSecretsInServices = (services, suffix) => {
    const newServices = {};
    _.forEach(services, (serviceConfig, serviceName) => {
        const newServiceConfig = _.cloneDeep(serviceConfig);
        // Replace secret names in secrets
        if (_.has(newServiceConfig, "secrets")) {
            newServiceConfig.secrets = _.map(newServiceConfig.secrets, (secret) => {
                if (_.isString(secret)) {
                    return `${secret}-${suffix}`;
                }
                if (_.isObject(secret) && secret.source) {
                    return {
                        ...secret,
                        source: `${secret.source}-${suffix}`,
                    };
                }
                return secret;
            });
        }
        newServices[serviceName] = newServiceConfig;
    });
    return newServices;
};
export const addSuffixToAllSecrets = (composeData, suffix) => {
    const updatedComposeData = { ...composeData };
    if (composeData?.secrets) {
        updatedComposeData.secrets = addSuffixToSecretsRoot(composeData.secrets, suffix);
    }
    if (composeData?.services) {
        updatedComposeData.services = addSuffixToSecretsInServices(composeData.services, suffix);
    }
    return updatedComposeData;
};

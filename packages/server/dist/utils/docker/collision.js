import { findComposeById } from "../../services/compose.js";
import { stringify } from "yaml";
import { execAsync, execAsyncRemote } from "../process/execAsync.js";
import { addAppNameToAllServiceNames } from "./collision/root-network.js";
import { generateRandomHash } from "./compose.js";
import { addSuffixToAllVolumes } from "./compose/volume.js";
import { cloneCompose, loadDockerCompose, loadDockerComposeRemote, } from "./domain.js";
export const addAppNameToPreventCollision = (composeData, appName, isolatedDeploymentsVolume) => {
    let updatedComposeData = { ...composeData };
    updatedComposeData = addAppNameToAllServiceNames(updatedComposeData, appName);
    if (isolatedDeploymentsVolume) {
        updatedComposeData = addSuffixToAllVolumes(updatedComposeData, appName);
    }
    return updatedComposeData;
};
export const randomizeIsolatedDeploymentComposeFile = async (composeId, suffix) => {
    const compose = await findComposeById(composeId);
    const command = await cloneCompose(compose);
    if (compose.serverId) {
        await execAsyncRemote(compose.serverId, command);
    }
    else {
        await execAsync(command);
    }
    let composeData;
    if (compose.serverId) {
        composeData = await loadDockerComposeRemote(compose);
    }
    else {
        composeData = await loadDockerCompose(compose);
    }
    if (!composeData) {
        throw new Error("Compose data not found");
    }
    const randomSuffix = suffix || compose.appName || generateRandomHash();
    const newComposeFile = compose.isolatedDeployment
        ? addAppNameToPreventCollision(composeData, randomSuffix, compose.isolatedDeploymentsVolume)
        : composeData;
    return stringify(newComposeFile);
};
export const randomizeDeployableSpecificationFile = (composeSpec, isolatedDeploymentsVolume, suffix) => {
    if (!suffix) {
        return composeSpec;
    }
    const newComposeFile = addAppNameToPreventCollision(composeSpec, suffix, isolatedDeploymentsVolume);
    return newComposeFile;
};

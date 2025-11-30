import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { encodeBase64, prepareEnvironmentVariables } from "../docker/utils.js";
export const createEnvFile = (directory, env, projectEnv, environmentEnv) => {
    const envFilePath = join(dirname(directory), ".env");
    if (!existsSync(dirname(envFilePath))) {
        mkdirSync(dirname(envFilePath), { recursive: true });
    }
    const envFileContent = prepareEnvironmentVariables(env, projectEnv, environmentEnv).join("\n");
    writeFileSync(envFilePath, envFileContent);
};
export const createEnvFileCommand = (directory, env, projectEnv, environmentEnv) => {
    const envFileContent = prepareEnvironmentVariables(env, projectEnv, environmentEnv).join("\n");
    const encodedContent = encodeBase64(envFileContent || "");
    const envFilePath = join(dirname(directory), ".env");
    return `echo "${encodedContent}" | base64 -d > "${envFilePath}";`;
};

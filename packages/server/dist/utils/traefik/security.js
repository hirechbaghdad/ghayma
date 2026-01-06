import * as bcrypt from "bcrypt";
import { loadOrCreateConfig, loadOrCreateConfigRemote, writeTraefikConfig, writeTraefikConfigRemote, } from "./application.js";
import { addMiddleware, deleteMiddleware, loadMiddlewares, loadRemoteMiddlewares, writeMiddleware, } from "./middleware.js";
export const createSecurityMiddleware = async (application, data) => {
    const { appName, serverId } = application;
    let config;
    if (serverId) {
        config = await loadRemoteMiddlewares(serverId);
    }
    else {
        config = loadMiddlewares();
    }
    const middlewareName = `auth-${appName}`;
    const user = `${data.username}:${await bcrypt.hash(data.password, 10)}`;
    if (config.http?.middlewares) {
        const currentMiddleware = config.http.middlewares[middlewareName];
        if (isBasicAuthMiddleware(currentMiddleware)) {
            currentMiddleware.basicAuth.users = [
                ...(currentMiddleware.basicAuth.users || []),
                user,
            ];
        }
        else {
            config.http.middlewares[middlewareName] = {
                basicAuth: {
                    removeHeader: true,
                    users: [user],
                },
            };
        }
    }
    let appConfig;
    if (serverId) {
        appConfig = await loadOrCreateConfigRemote(serverId, appName);
    }
    else {
        appConfig = loadOrCreateConfig(appName);
    }
    addMiddleware(appConfig, middlewareName);
    if (serverId) {
        await writeTraefikConfigRemote(config, "middlewares", serverId);
        await writeTraefikConfigRemote(appConfig, appName, serverId);
    }
    else {
        writeTraefikConfig(appConfig, appName);
        writeMiddleware(config);
    }
};
export const removeSecurityMiddleware = async (application, data) => {
    const { appName, serverId } = application;
    let config;
    if (serverId) {
        config = await loadRemoteMiddlewares(serverId);
    }
    else {
        config = loadMiddlewares();
    }
    let appConfig;
    if (serverId) {
        appConfig = await loadOrCreateConfigRemote(serverId, appName);
    }
    else {
        appConfig = loadOrCreateConfig(appName);
    }
    const middlewareName = `auth-${appName}`;
    if (config.http?.middlewares) {
        const currentMiddleware = config.http.middlewares[middlewareName];
        if (isBasicAuthMiddleware(currentMiddleware)) {
            const users = currentMiddleware.basicAuth.users;
            const filteredUsers = users?.filter((user) => {
                const [username] = user.split(":");
                return username !== data.username;
            }) || [];
            currentMiddleware.basicAuth.users = filteredUsers;
            if (filteredUsers.length === 0) {
                if (config?.http?.middlewares?.[middlewareName]) {
                    delete config.http.middlewares[middlewareName];
                }
                deleteMiddleware(appConfig, middlewareName);
                if (serverId) {
                    await writeTraefikConfigRemote(appConfig, appName, serverId);
                }
                else {
                    writeTraefikConfig(appConfig, appName);
                }
            }
        }
    }
    if (serverId) {
        await writeTraefikConfigRemote(config, "middlewares", serverId);
    }
    else {
        writeMiddleware(config);
    }
};
const isBasicAuthMiddleware = (middleware) => {
    return !!middleware && "basicAuth" in middleware;
};

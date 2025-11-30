import { docker } from "../../constants/index.js";
import { findServerById } from "../../services/server.js";
import Dockerode from "dockerode";
export const getRemoteDocker = async (serverId) => {
    if (!serverId)
        return docker;
    const server = await findServerById(serverId);
    if (!server.sshKeyId)
        return docker;
    const dockerode = new Dockerode({
        host: server.ipAddress,
        port: server.port,
        username: server.username,
        protocol: "ssh",
        // @ts-ignore
        sshOptions: {
            privateKey: server.sshKey?.privateKey,
        },
    });
    return dockerode;
};

import Dockerode from "dockerode";
export declare const getRemoteDocker: (serverId?: string | null) => Promise<Dockerode>;

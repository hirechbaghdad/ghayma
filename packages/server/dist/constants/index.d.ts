import Docker from "dockerode";
export declare const IS_CLOUD: boolean;
export declare const docker: Docker;
export declare const paths: (isServer?: boolean) => {
    BASE_PATH: string;
    MAIN_TRAEFIK_PATH: string;
    DYNAMIC_TRAEFIK_PATH: string;
    LOGS_PATH: string;
    APPLICATIONS_PATH: string;
    COMPOSE_PATH: string;
    SSH_PATH: string;
    CERTIFICATES_PATH: string;
    MONITORING_PATH: string;
    REGISTRY_PATH: string;
    SCHEDULES_PATH: string;
    VOLUME_BACKUPS_PATH: string;
};

export declare const getPostgresRestoreCommand: (database: string, databaseUser: string) => string;
export declare const getMariadbRestoreCommand: (database: string, databaseUser: string, databasePassword: string) => string;
export declare const getMysqlRestoreCommand: (database: string, databasePassword: string) => string;
export declare const getMongoRestoreCommand: (database: string, databaseUser: string, databasePassword: string) => string;
export declare const getComposeSearchCommand: (appName: string, type: "stack" | "docker-compose" | "database", serviceName?: string) => string;
interface DatabaseCredentials {
    database: string;
    databaseUser?: string;
    databasePassword?: string;
}
interface RestoreOptions {
    appName: string;
    type: "postgres" | "mariadb" | "mysql" | "mongo";
    restoreType: "stack" | "docker-compose" | "database";
    credentials: DatabaseCredentials;
    serviceName?: string;
    rcloneCommand: string;
    backupFile?: string;
}
export declare const getRestoreCommand: ({ appName, type, restoreType, credentials, serviceName, rcloneCommand, backupFile, }: RestoreOptions) => string;
export {};

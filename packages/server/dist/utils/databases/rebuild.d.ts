type DatabaseType = "postgres" | "mysql" | "mariadb" | "mongo" | "redis";
export declare const rebuildDatabase: (databaseId: string, type: DatabaseType) => Promise<void>;
export {};

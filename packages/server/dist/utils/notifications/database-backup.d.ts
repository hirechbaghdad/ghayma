export declare const sendDatabaseBackupNotifications: ({ projectName, applicationName, databaseType, type, errorMessage, organizationId, databaseName, }: {
    projectName: string;
    applicationName: string;
    databaseType: "postgres" | "mysql" | "mongodb" | "mariadb";
    type: "error" | "success";
    organizationId: string;
    errorMessage?: string;
    databaseName: string;
}) => Promise<void>;

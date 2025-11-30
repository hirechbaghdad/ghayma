export type TemplateProps = {
    projectName: string;
    applicationName: string;
    databaseType: "postgres" | "mysql" | "mongodb" | "mariadb";
    type: "error" | "success";
    errorMessage?: string;
    date: string;
};
export declare const DatabaseBackupEmail: ({ projectName, applicationName, databaseType, type, errorMessage, date, }: TemplateProps) => import("react/jsx-runtime").JSX.Element;
export default DatabaseBackupEmail;

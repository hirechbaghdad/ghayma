interface Props {
    projectName: string;
    applicationName: string;
    applicationType: string;
    errorMessage: string;
    buildLink: string;
    organizationId: string;
}
export declare const sendBuildErrorNotifications: ({ projectName, applicationName, applicationType, errorMessage, buildLink, organizationId, }: Props) => Promise<void>;
export {};

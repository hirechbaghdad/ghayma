export type TemplateProps = {
    projectName: string;
    applicationName: string;
    applicationType: string;
    errorMessage: string;
    buildLink: string;
    date: string;
};
export declare const BuildFailedEmail: ({ projectName, applicationName, applicationType, errorMessage, buildLink, date, }: TemplateProps) => import("react/jsx-runtime").JSX.Element;
export default BuildFailedEmail;

export type TemplateProps = {
    projectName: string;
    applicationName: string;
    applicationType: string;
    buildLink: string;
    date: string;
    environmentName: string;
};
export declare const BuildSuccessEmail: ({ projectName, applicationName, applicationType, buildLink, date, environmentName, }: TemplateProps) => import("react/jsx-runtime").JSX.Element;
export default BuildSuccessEmail;

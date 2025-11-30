export type TemplateProps = {
    email: string;
    name: string;
};
interface VercelInviteUserEmailProps {
    inviteLink: string;
    toEmail: string;
}
export declare const InvitationEmail: ({ inviteLink, toEmail, }: VercelInviteUserEmailProps) => import("react/jsx-runtime").JSX.Element;
export default InvitationEmail;

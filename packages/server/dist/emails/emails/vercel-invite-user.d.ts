interface VercelInviteUserEmailProps {
    username?: string;
    userImage?: string;
    invitedByUsername?: string;
    invitedByEmail?: string;
    teamName?: string;
    teamImage?: string;
    inviteLink?: string;
    inviteFromIp?: string;
    inviteFromLocation?: string;
}
export declare const VercelInviteUserEmail: {
    ({ username, userImage, invitedByUsername, invitedByEmail, teamName, teamImage, inviteLink, inviteFromIp, inviteFromLocation, }: VercelInviteUserEmailProps): import("react/jsx-runtime").JSX.Element;
    PreviewProps: VercelInviteUserEmailProps;
};
export default VercelInviteUserEmail;

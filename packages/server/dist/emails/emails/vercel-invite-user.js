import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Button, Column, Container, Head, Heading, Hr, Html, Img, Link, Preview, Row, Section, Tailwind, Text, } from "@react-email/components";
const baseUrl = process.env.VERCEL_URL;
export const VercelInviteUserEmail = ({ username, userImage, invitedByUsername, invitedByEmail, teamName, teamImage, inviteLink, inviteFromIp, inviteFromLocation, }) => {
    const previewText = `Join ${invitedByUsername} on Vercel`;
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: previewText }), _jsx(Tailwind, { children: _jsx(Body, { className: "bg-white my-auto mx-auto font-sans px-2", children: _jsxs(Container, { className: "border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]", children: [_jsx(Section, { className: "mt-[32px]", children: _jsx(Img, { src: `${baseUrl}/static/vercel-logo.png`, width: "40", height: "37", alt: "Vercel", className: "my-0 mx-auto" }) }), _jsxs(Heading, { className: "text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0", children: ["Join ", _jsx("strong", { children: teamName }), " on ", _jsx("strong", { children: "Vercel" })] }), _jsxs(Text, { className: "text-black text-[14px] leading-[24px]", children: ["Hello ", username, ","] }), _jsxs(Text, { className: "text-black text-[14px] leading-[24px]", children: [_jsx("strong", { children: invitedByUsername }), " (", _jsx(Link, { href: `mailto:${invitedByEmail}`, className: "text-blue-600 no-underline", children: invitedByEmail }), ") has invited you to the ", _jsx("strong", { children: teamName }), " team on", " ", _jsx("strong", { children: "Vercel" }), "."] }), _jsx(Section, { children: _jsxs(Row, { children: [_jsx(Column, { align: "right", children: _jsx(Img, { className: "rounded-full", src: userImage, width: "64", height: "64" }) }), _jsx(Column, { align: "center", children: _jsx(Img, { src: `${baseUrl}/static/vercel-arrow.png`, width: "12", height: "9", alt: "invited you to" }) }), _jsx(Column, { align: "left", children: _jsx(Img, { className: "rounded-full", src: teamImage, width: "64", height: "64" }) })] }) }), _jsx(Section, { className: "text-center mt-[32px] mb-[32px]", children: _jsx(Button, { className: "bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3", href: inviteLink, children: "Join the team" }) }), _jsxs(Text, { className: "text-black text-[14px] leading-[24px]", children: ["or copy and paste this URL into your browser:", " ", _jsx(Link, { href: inviteLink, className: "text-blue-600 no-underline", children: inviteLink })] }), _jsx(Hr, { className: "border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" }), _jsxs(Text, { className: "text-[#666666] text-[12px] leading-[24px]", children: ["This invitation was intended for", " ", _jsx("span", { className: "text-black", children: username }), ". This invite was sent from ", _jsx("span", { className: "text-black", children: inviteFromIp }), " ", "located in", " ", _jsx("span", { className: "text-black", children: inviteFromLocation }), ". If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us."] })] }) }) })] }));
};
VercelInviteUserEmail.PreviewProps = {
    username: "alanturing",
    userImage: `${baseUrl}/static/vercel-user.png`,
    invitedByUsername: "Alan",
    invitedByEmail: "alan.turing@example.com",
    teamName: "Enigma",
    teamImage: `${baseUrl}/static/vercel-team.png`,
    inviteLink: "https://vercel.com/teams/invite/foo",
    inviteFromIp: "204.13.186.218",
    inviteFromLocation: "São Paulo, Brazil",
};
export default VercelInviteUserEmail;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Tailwind, Text, } from "@react-email/components";
export const InvitationEmail = ({ inviteLink, toEmail, }) => {
    const previewText = "Join to Dokploy";
    return (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: previewText }), _jsx(Tailwind, { config: {
                    theme: {
                        extend: {
                            colors: {
                                brand: "#007291",
                            },
                        },
                    },
                }, children: _jsx(Body, { className: "bg-white my-auto mx-auto font-sans px-2", children: _jsxs(Container, { className: "border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] max-w-[465px]", children: [_jsx(Section, { className: "mt-[32px]", children: _jsx(Img, { src: "https://raw.githubusercontent.com/Dokploy/dokploy/refs/heads/canary/apps/dokploy/logo.png", width: "100", height: "50", alt: "Dokploy", className: "my-0 mx-auto" }) }), _jsxs(Heading, { className: "text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0", children: ["Join to ", _jsx("strong", { children: "Dokploy" })] }), _jsx(Text, { className: "text-black text-[14px] leading-[24px]", children: "Hello," }), _jsxs(Text, { className: "text-black text-[14px] leading-[24px]", children: ["You have been invited to join ", _jsx("strong", { children: "Dokploy" }), ", a platform that helps for deploying your apps to the cloud."] }), _jsx(Section, { className: "text-center mt-[32px] mb-[32px]", children: _jsx(Button, { href: inviteLink, className: "bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3", children: "Join the team \uD83D\uDE80" }) }), _jsxs(Text, { className: "text-black text-[14px] leading-[24px]", children: ["or copy and paste this URL into your browser:", " ", _jsx(Link, { href: inviteLink, className: "text-blue-600 no-underline", children: "https://dokploy.com" })] }), _jsx(Hr, { className: "border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" }), _jsxs(Text, { className: "text-[#666666] text-[12px] leading-[24px]", children: ["This invitation was intended for ", toEmail, ". This invite was sent from ", _jsx("strong", { className: "text-black", children: "dokploy.com" }), ". If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to"] })] }) }) })] }));
};
export default InvitationEmail;

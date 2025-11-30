import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text, } from "@react-email/components";
export const DokployRestartEmail = ({ date = "2023-05-01T00:00:00.000Z", }) => {
    const previewText = "Your dokploy server was restarted";
    return (_jsxs(Html, { children: [_jsx(Preview, { children: previewText }), _jsxs(Tailwind, { config: {
                    theme: {
                        extend: {
                            colors: {
                                brand: "#007291",
                            },
                        },
                    },
                }, children: [_jsx(Head, {}), _jsx(Body, { className: "bg-white my-auto mx-auto font-sans px-2", children: _jsxs(Container, { className: "border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] max-w-[465px]", children: [_jsx(Section, { className: "mt-[32px]", children: _jsx(Img, { src: "https://raw.githubusercontent.com/Dokploy/dokploy/refs/heads/canary/apps/dokploy/logo.png", width: "100", height: "50", alt: "Dokploy", className: "my-0 mx-auto" }) }), _jsx(Heading, { className: "text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0", children: "Dokploy Server Restart" }), _jsx(Text, { className: "text-black text-[14px] leading-[24px]", children: "Hello," }), _jsx(Text, { className: "text-black text-[14px] leading-[24px]", children: "Your dokploy server was restarted \u2705" }), _jsxs(Section, { className: "flex text-black text-[14px]  leading-[24px] bg-[#F4F4F5] rounded-lg p-2", children: [_jsx(Text, { className: "!leading-3 font-bold", children: "Details: " }), _jsxs(Text, { className: "!leading-3", children: ["Date: ", _jsx("strong", { children: date })] })] })] }) })] })] }));
};
export default DokployRestartEmail;

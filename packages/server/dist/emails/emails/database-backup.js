import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Heading, Html, Img, Preview, Section, Tailwind, Text, } from "@react-email/components";
export const DatabaseBackupEmail = ({ projectName = "dokploy", applicationName = "frontend", databaseType = "postgres", type = "success", errorMessage, date = "2023-05-01T00:00:00.000Z", }) => {
    const previewText = `Database backup for ${applicationName} was ${type === "success" ? "successful ✅" : "failed ❌"}`;
    return (_jsxs(Html, { children: [_jsx(Preview, { children: previewText }), _jsxs(Tailwind, { config: {
                    theme: {
                        extend: {
                            colors: {
                                brand: "#007291",
                            },
                        },
                    },
                }, children: [_jsx(Head, {}), _jsx(Body, { className: "bg-white my-auto mx-auto font-sans px-2", children: _jsxs(Container, { className: "border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] max-w-[465px]", children: [_jsx(Section, { className: "mt-[32px]", children: _jsx(Img, { src: "https://raw.githubusercontent.com/Dokploy/dokploy/refs/heads/canary/apps/dokploy/logo.png", width: "100", height: "50", alt: "Dokploy", className: "my-0 mx-auto" }) }), _jsxs(Heading, { className: "text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0", children: ["Database backup for ", _jsx("strong", { children: applicationName })] }), _jsx(Text, { className: "text-black text-[14px] leading-[24px]", children: "Hello," }), _jsxs(Text, { className: "text-black text-[14px] leading-[24px]", children: ["Your database backup for ", _jsx("strong", { children: applicationName }), " was", " ", type === "success"
                                            ? "successful ✅"
                                            : "failed  Please check the error message below. ❌", "."] }), _jsxs(Section, { className: "flex text-black text-[14px]  leading-[24px] bg-[#F4F4F5] rounded-lg p-2", children: [_jsx(Text, { className: "!leading-3 font-bold", children: "Details: " }), _jsxs(Text, { className: "!leading-3", children: ["Project Name: ", _jsx("strong", { children: projectName })] }), _jsxs(Text, { className: "!leading-3", children: ["Application Name: ", _jsx("strong", { children: applicationName })] }), _jsxs(Text, { className: "!leading-3", children: ["Database Type: ", _jsx("strong", { children: databaseType })] }), _jsxs(Text, { className: "!leading-3", children: ["Date: ", _jsx("strong", { children: date })] })] }), type === "error" && errorMessage ? (_jsxs(Section, { className: "flex text-black text-[14px]  mt-4 leading-[24px] bg-[#F4F4F5] rounded-lg p-2", children: [_jsx(Text, { className: "!leading-3 font-bold", children: "Reason: " }), _jsx(Text, { className: "text-[12px] leading-[24px]", children: errorMessage || "Error message not provided" })] })) : null] }) })] })] }));
};
export default DatabaseBackupEmail;

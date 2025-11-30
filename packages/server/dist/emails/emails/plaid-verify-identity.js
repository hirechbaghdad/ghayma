import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Container, Head, Heading, Html, Img, Link, Section, Text, } from "@react-email/components";
const baseUrl = process.env.VERCEL_URL;
export const PlaidVerifyIdentityEmail = ({ validationCode, }) => (_jsxs(Html, { children: [_jsx(Head, {}), _jsxs(Body, { style: main, children: [_jsxs(Container, { style: container, children: [_jsx(Img, { src: `${baseUrl}/static/plaid-logo.png`, width: "212", height: "88", alt: "Plaid", style: logo }), _jsx(Text, { style: tertiary, children: "Verify Your Identity" }), _jsx(Heading, { style: secondary, children: "Enter the following code to finish linking Venmo." }), _jsx(Section, { style: codeContainer, children: _jsx(Text, { style: code, children: validationCode }) }), _jsx(Text, { style: paragraph, children: "Not expecting this email?" }), _jsxs(Text, { style: paragraph, children: ["Contact", " ", _jsx(Link, { href: "mailto:login@plaid.com", style: link, children: "login@plaid.com" }), " ", "if you did not request this code."] })] }), _jsx(Text, { style: footer, children: "Securely powered by Plaid." })] })] }));
PlaidVerifyIdentityEmail.PreviewProps = {
    validationCode: "144833",
};
export default PlaidVerifyIdentityEmail;
const main = {
    backgroundColor: "#ffffff",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};
const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #eee",
    borderRadius: "5px",
    boxShadow: "0 5px 10px rgba(20,50,70,.2)",
    marginTop: "20px",
    maxWidth: "360px",
    margin: "0 auto",
    padding: "68px 0 130px",
};
const logo = {
    margin: "0 auto",
};
const tertiary = {
    color: "#0a85ea",
    fontSize: "11px",
    fontWeight: 700,
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    height: "16px",
    letterSpacing: "0",
    lineHeight: "16px",
    margin: "16px 8px 8px 8px",
    textTransform: "uppercase",
    textAlign: "center",
};
const secondary = {
    color: "#000",
    display: "inline-block",
    fontFamily: "HelveticaNeue-Medium,Helvetica,Arial,sans-serif",
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "24px",
    marginBottom: "0",
    marginTop: "0",
    textAlign: "center",
};
const codeContainer = {
    background: "rgba(0,0,0,.05)",
    borderRadius: "4px",
    margin: "16px auto 14px",
    verticalAlign: "middle",
    width: "280px",
};
const code = {
    color: "#000",
    display: "inline-block",
    fontFamily: "HelveticaNeue-Bold",
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "6px",
    lineHeight: "40px",
    paddingBottom: "8px",
    paddingTop: "8px",
    margin: "0 auto",
    width: "100%",
    textAlign: "center",
};
const paragraph = {
    color: "#444",
    fontSize: "15px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    letterSpacing: "0",
    lineHeight: "23px",
    padding: "0 40px",
    margin: "0",
    textAlign: "center",
};
const link = {
    color: "#444",
    textDecoration: "underline",
};
const footer = {
    color: "#000",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "0",
    lineHeight: "23px",
    margin: "0",
    marginTop: "20px",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
    textAlign: "center",
    textTransform: "uppercase",
};

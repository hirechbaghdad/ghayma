import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body, Button, Container, Head, Hr, Html, Img, Link, Preview, Section, Text, } from "@react-email/components";
const baseUrl = process.env.VERCEL_URL;
export const StripeWelcomeEmail = () => (_jsxs(Html, { children: [_jsx(Head, {}), _jsx(Preview, { children: "You're now ready to make live transactions with Stripe!" }), _jsx(Body, { style: main, children: _jsx(Container, { style: container, children: _jsxs(Section, { style: box, children: [_jsx(Img, { src: `${baseUrl}/static/stripe-logo.png`, width: "49", height: "21", alt: "Stripe" }), _jsx(Hr, { style: hr }), _jsx(Text, { style: paragraph, children: "Thanks for submitting your account information. You're now ready to make live transactions with Stripe!" }), _jsx(Text, { style: paragraph, children: "You can view your payments and a variety of other information about your account right from your dashboard." }), _jsx(Button, { style: button, href: "https://dashboard.stripe.com/login", children: "View your Stripe Dashboard" }), _jsx(Hr, { style: hr }), _jsxs(Text, { style: paragraph, children: ["If you haven't finished your integration, you might find our", " ", _jsx(Link, { style: anchor, href: "https://stripe.com/docs", children: "docs" }), " ", "handy."] }), _jsxs(Text, { style: paragraph, children: ["Once you're ready to start accepting payments, you'll just need to use your live", " ", _jsx(Link, { style: anchor, href: "https://dashboard.stripe.com/login?redirect=%2Fapikeys", children: "API keys" }), " ", "instead of your test API keys. Your account can simultaneously be used for both test and live requests, so you can continue testing while accepting live payments. Check out our", " ", _jsx(Link, { style: anchor, href: "https://stripe.com/docs/dashboard", children: "tutorial about account basics" }), "."] }), _jsxs(Text, { style: paragraph, children: ["Finally, we've put together a", " ", _jsx(Link, { style: anchor, href: "https://stripe.com/docs/checklist/website", children: "quick checklist" }), " ", "to ensure your website conforms to card network standards."] }), _jsxs(Text, { style: paragraph, children: ["We'll be here to help you with any step along the way. You can find answers to most questions and get in touch with us on our", " ", _jsx(Link, { style: anchor, href: "https://support.stripe.com/", children: "support site" }), "."] }), _jsx(Text, { style: paragraph, children: "\u2014 The Stripe team" }), _jsx(Hr, { style: hr }), _jsx(Text, { style: footer, children: "Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080" })] }) }) })] }));
export default StripeWelcomeEmail;
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};
const box = {
    padding: "0 48px",
};
const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};
const paragraph = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left",
};
const anchor = {
    color: "#556cd6",
};
const button = {
    backgroundColor: "#656ee8",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    width: "100%",
    padding: "10px",
};
const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
};

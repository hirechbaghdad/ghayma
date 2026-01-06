import { sendDiscordNotification, sendEmailNotification, } from "../utils/notifications/utils.js";
export const sendEmail = async ({ email, subject, text, }) => {
    await sendEmailNotification({
        fromAddress: process.env.SMTP_FROM_ADDRESS || "",
        toAddresses: [email],
        smtpServer: process.env.SMTP_SERVER || "",
        smtpPort: Number(process.env.SMTP_PORT),
        username: process.env.SMTP_USERNAME || "",
        password: process.env.SMTP_PASSWORD || "",
    }, subject, text);
    return true;
};
export const sendDiscordNotificationWelcome = async (email) => {
    await sendDiscordNotification({
        webhookUrl: process.env.DISCORD_WEBHOOK_URL || "",
    }, {
        title: "New User Registered",
        color: 0x00ff00,
        fields: [
            {
                name: "Email",
                value: email,
                inline: true,
            },
        ],
        timestamp: new Date(),
        footer: {
            text: "Atlanexis Cloud User Registration Notification",
        },
    });
};

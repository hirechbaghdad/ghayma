export declare const sendEmail: ({ email, subject, text, }: {
    email: string;
    subject: string;
    text: string;
}) => Promise<boolean>;
export declare const sendDiscordNotificationWelcome: (email: string) => Promise<void>;

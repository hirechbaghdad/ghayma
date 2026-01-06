import type { discord, email, gotify, lark, ntfy, slack, telegram } from "../../db/schema/index.js";
export declare const sendEmailNotification: (connection: typeof email.$inferInsert, subject: string, htmlContent: string) => Promise<void>;
export declare const sendDiscordNotification: (connection: typeof discord.$inferInsert, embed: any) => Promise<void>;
export declare const sendTelegramNotification: (connection: typeof telegram.$inferInsert, messageText: string, inlineButton?: {
    text: string;
    url: string;
}[][]) => Promise<void>;
export declare const sendSlackNotification: (connection: typeof slack.$inferInsert, message: any) => Promise<void>;
export declare const sendGotifyNotification: (connection: typeof gotify.$inferInsert, title: string, message: string) => Promise<void>;
export declare const sendNtfyNotification: (connection: typeof ntfy.$inferInsert, title: string, tags: string, actions: string, message: string) => Promise<void>;
export declare const sendLarkNotification: (connection: typeof lark.$inferInsert, message: any) => Promise<void>;

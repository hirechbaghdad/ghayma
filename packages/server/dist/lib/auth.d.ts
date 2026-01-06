import type { IncomingMessage } from "node:http";
export declare const auth: {
    handler: (request: Request) => Promise<Response>;
    createApiKey: {
        <AsResponse extends boolean = false, ReturnHeaders extends boolean = false>(inputCtx_0: {
            body: {
                metadata?: any;
                name?: string | undefined;
                userId?: string | undefined;
                prefix?: string | undefined;
                expiresIn?: number | null | undefined;
                permissions?: Record<string, string[]> | undefined;
                rateLimitMax?: number | undefined;
                refillInterval?: number | undefined;
                refillAmount?: number | undefined;
                rateLimitEnabled?: boolean | undefined;
                rateLimitTimeWindow?: number | undefined;
                remaining?: number | null | undefined;
            };
        } & {
            method?: "POST" | undefined;
        } & {
            query?: Record<string, any> | undefined;
        } & {
            params?: Record<string, any>;
        } & {
            request?: Request;
        } & {
            headers?: HeadersInit;
        } & {
            asResponse?: boolean;
            returnHeaders?: boolean;
            use?: import("better-auth/*").Middleware[];
            path?: string;
        } & {
            asResponse?: AsResponse | undefined;
            returnHeaders?: ReturnHeaders | undefined;
        }): Promise<[AsResponse] extends [true] ? Response : [ReturnHeaders] extends [true] ? {
            headers: Headers;
            response: {
                key: string;
                metadata: any;
                permissions: any;
                id: string;
                name: string | null;
                start: string | null;
                prefix: string | null;
                userId: string;
                refillInterval: number | null;
                refillAmount: number | null;
                lastRefillAt: Date | null;
                enabled: boolean;
                rateLimitEnabled: boolean;
                rateLimitTimeWindow: number | null;
                rateLimitMax: number | null;
                requestCount: number;
                remaining: number | null;
                lastRequest: Date | null;
                expiresAt: Date | null;
                createdAt: Date;
                updatedAt: Date;
            };
        } : {
            key: string;
            metadata: any;
            permissions: any;
            id: string;
            name: string | null;
            start: string | null;
            prefix: string | null;
            userId: string;
            refillInterval: number | null;
            refillAmount: number | null;
            lastRefillAt: Date | null;
            enabled: boolean;
            rateLimitEnabled: boolean;
            rateLimitTimeWindow: number | null;
            rateLimitMax: number | null;
            requestCount: number;
            remaining: number | null;
            lastRequest: Date | null;
            expiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        }>;
        options: {
            method: "POST";
            body: import("better-auth/*").ZodObject<{
                name: import("better-auth/*").ZodOptional<import("better-auth/*").ZodString>;
                expiresIn: import("better-auth/*").ZodDefault<import("better-auth/*").ZodNullable<import("better-auth/*").ZodOptional<import("better-auth/*").ZodNumber>>>;
                userId: import("better-auth/*").ZodOptional<import("better-auth/*").ZodString>;
                prefix: import("better-auth/*").ZodOptional<import("better-auth/*").ZodString>;
                remaining: import("better-auth/*").ZodDefault<import("better-auth/*").ZodNullable<import("better-auth/*").ZodOptional<import("better-auth/*").ZodNumber>>>;
                metadata: import("better-auth/*").ZodOptional<import("better-auth/*").ZodAny>;
                refillAmount: import("better-auth/*").ZodOptional<import("better-auth/*").ZodNumber>;
                refillInterval: import("better-auth/*").ZodOptional<import("better-auth/*").ZodNumber>;
                rateLimitTimeWindow: import("better-auth/*").ZodOptional<import("better-auth/*").ZodNumber>;
                rateLimitMax: import("better-auth/*").ZodOptional<import("better-auth/*").ZodNumber>;
                rateLimitEnabled: import("better-auth/*").ZodOptional<import("better-auth/*").ZodBoolean>;
                permissions: import("better-auth/*").ZodOptional<import("better-auth/*").ZodRecord<import("better-auth/*").ZodString, import("better-auth/*").ZodArray<import("better-auth/*").ZodString, "many">>>;
            }, "strip", import("better-auth/*").ZodTypeAny, {
                expiresIn: number | null;
                remaining: number | null;
                metadata?: any;
                name?: string | undefined;
                userId?: string | undefined;
                prefix?: string | undefined;
                permissions?: Record<string, string[]> | undefined;
                rateLimitMax?: number | undefined;
                refillInterval?: number | undefined;
                refillAmount?: number | undefined;
                rateLimitEnabled?: boolean | undefined;
                rateLimitTimeWindow?: number | undefined;
            }, {
                metadata?: any;
                name?: string | undefined;
                userId?: string | undefined;
                prefix?: string | undefined;
                expiresIn?: number | null | undefined;
                permissions?: Record<string, string[]> | undefined;
                rateLimitMax?: number | undefined;
                refillInterval?: number | undefined;
                refillAmount?: number | undefined;
                rateLimitEnabled?: boolean | undefined;
                rateLimitTimeWindow?: number | undefined;
                remaining?: number | null | undefined;
            }>;
            metadata: {
                openapi: {
                    description: string;
                    responses: {
                        "200": {
                            description: string;
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            id: {
                                                type: string;
                                                description: string;
                                            };
                                            createdAt: {
                                                type: string;
                                                format: string;
                                                description: string;
                                            };
                                            updatedAt: {
                                                type: string;
                                                format: string;
                                                description: string;
                                            };
                                            name: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            prefix: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            start: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            key: {
                                                type: string;
                                                description: string;
                                            };
                                            enabled: {
                                                type: string;
                                                description: string;
                                            };
                                            expiresAt: {
                                                type: string;
                                                format: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            userId: {
                                                type: string;
                                                description: string;
                                            };
                                            lastRefillAt: {
                                                type: string;
                                                format: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            lastRequest: {
                                                type: string;
                                                format: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            metadata: {
                                                type: string;
                                                nullable: boolean;
                                                additionalProperties: boolean;
                                                description: string;
                                            };
                                            rateLimitMax: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            rateLimitTimeWindow: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            remaining: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            refillAmount: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            refillInterval: {
                                                type: string;
                                                nullable: boolean;
                                                description: string;
                                            };
                                            rateLimitEnabled: {
                                                type: string;
                                                description: string;
                                            };
                                            requestCount: {
                                                type: string;
                                                description: string;
                                            };
                                            permissions: {
                                                type: string;
                                                nullable: boolean;
                                                additionalProperties: {
                                                    type: string;
                                                    items: {
                                                        type: string;
                                                    };
                                                };
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                    };
                };
            };
        } & {
            use: any[];
        };
        path: "/api-key/create";
    };
};
export declare const validateRequest: (request: IncomingMessage) => Promise<{
    session: {
        userId: string;
        activeOrganizationId: any;
    };
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        image: string | null;
        createdAt: Date | null;
        updatedAt: Date;
        twoFactorEnabled: boolean | null;
        role: "owner" | "member" | "admin";
        ownerId: string;
    };
} | {
    session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined | undefined;
        userAgent?: string | null | undefined | undefined;
        activeOrganizationId?: string | null | undefined;
        impersonatedBy?: string | null | undefined;
    };
    user: {
        id: string;
        name: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        image?: string | null | undefined | undefined;
        role: string;
        allowImpersonation: boolean;
        ownerId: string;
        twoFactorEnabled: boolean | null | undefined;
        banned: boolean | null | undefined;
        banReason?: string | null | undefined;
        banExpires?: Date | null | undefined;
    };
} | {
    session: null;
    user: null;
}>;

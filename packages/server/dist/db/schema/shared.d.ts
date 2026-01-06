import { z } from "zod";
export declare const applicationStatus: import("drizzle-orm/pg-core").PgEnum<["idle", "running", "done", "error"]>;
export declare const certificateType: import("drizzle-orm/pg-core").PgEnum<["letsencrypt", "none", "custom"]>;
export declare const triggerType: import("drizzle-orm/pg-core").PgEnum<["push", "tag"]>;
export interface HealthCheckSwarm {
    Test?: string[] | undefined;
    Interval?: number | undefined;
    Timeout?: number | undefined;
    StartPeriod?: number | undefined;
    Retries?: number | undefined;
}
export interface RestartPolicySwarm {
    Condition?: string | undefined;
    Delay?: number | undefined;
    MaxAttempts?: number | undefined;
    Window?: number | undefined;
}
export interface PlacementSwarm {
    Constraints?: string[] | undefined;
    Preferences?: Array<{
        Spread: {
            SpreadDescriptor: string;
        };
    }> | undefined;
    MaxReplicas?: number | undefined;
    Platforms?: Array<{
        Architecture: string;
        OS: string;
    }> | undefined;
}
export interface UpdateConfigSwarm {
    Parallelism: number;
    Delay?: number | undefined;
    FailureAction?: string | undefined;
    Monitor?: number | undefined;
    MaxFailureRatio?: number | undefined;
    Order: string;
}
export interface ServiceModeSwarm {
    Replicated?: {
        Replicas?: number | undefined;
    } | undefined;
    Global?: {} | undefined;
    ReplicatedJob?: {
        MaxConcurrent?: number | undefined;
        TotalCompletions?: number | undefined;
    } | undefined;
    GlobalJob?: {} | undefined;
}
export interface NetworkSwarm {
    Target?: string | undefined;
    Aliases?: string[] | undefined;
    DriverOpts?: {
        [key: string]: string;
    } | undefined;
}
export interface LabelsSwarm {
    [name: string]: string;
}
export interface EndpointPortConfigSwarm {
    Protocol?: string | undefined;
    TargetPort?: number | undefined;
    PublishedPort?: number | undefined;
    PublishMode?: string | undefined;
}
export interface EndpointSpecSwarm {
    Mode?: string | undefined;
    Ports?: EndpointPortConfigSwarm[] | undefined;
}
export declare const HealthCheckSwarmSchema: z.ZodObject<{
    Test: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    Interval: z.ZodOptional<z.ZodNumber>;
    Timeout: z.ZodOptional<z.ZodNumber>;
    StartPeriod: z.ZodOptional<z.ZodNumber>;
    Retries: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    Test?: string[] | undefined;
    Interval?: number | undefined;
    Timeout?: number | undefined;
    StartPeriod?: number | undefined;
    Retries?: number | undefined;
}, {
    Test?: string[] | undefined;
    Interval?: number | undefined;
    Timeout?: number | undefined;
    StartPeriod?: number | undefined;
    Retries?: number | undefined;
}>;
export declare const RestartPolicySwarmSchema: z.ZodObject<{
    Condition: z.ZodOptional<z.ZodString>;
    Delay: z.ZodOptional<z.ZodNumber>;
    MaxAttempts: z.ZodOptional<z.ZodNumber>;
    Window: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    Condition?: string | undefined;
    Delay?: number | undefined;
    MaxAttempts?: number | undefined;
    Window?: number | undefined;
}, {
    Condition?: string | undefined;
    Delay?: number | undefined;
    MaxAttempts?: number | undefined;
    Window?: number | undefined;
}>;
export declare const PreferenceSchema: z.ZodObject<{
    Spread: z.ZodObject<{
        SpreadDescriptor: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        SpreadDescriptor: string;
    }, {
        SpreadDescriptor: string;
    }>;
}, "strict", z.ZodTypeAny, {
    Spread: {
        SpreadDescriptor: string;
    };
}, {
    Spread: {
        SpreadDescriptor: string;
    };
}>;
export declare const PlatformSchema: z.ZodObject<{
    Architecture: z.ZodString;
    OS: z.ZodString;
}, "strict", z.ZodTypeAny, {
    Architecture: string;
    OS: string;
}, {
    Architecture: string;
    OS: string;
}>;
export declare const PlacementSwarmSchema: z.ZodObject<{
    Constraints: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    Preferences: z.ZodOptional<z.ZodArray<z.ZodObject<{
        Spread: z.ZodObject<{
            SpreadDescriptor: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            SpreadDescriptor: string;
        }, {
            SpreadDescriptor: string;
        }>;
    }, "strict", z.ZodTypeAny, {
        Spread: {
            SpreadDescriptor: string;
        };
    }, {
        Spread: {
            SpreadDescriptor: string;
        };
    }>, "many">>;
    MaxReplicas: z.ZodOptional<z.ZodNumber>;
    Platforms: z.ZodOptional<z.ZodArray<z.ZodObject<{
        Architecture: z.ZodString;
        OS: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        Architecture: string;
        OS: string;
    }, {
        Architecture: string;
        OS: string;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    Constraints?: string[] | undefined;
    Preferences?: {
        Spread: {
            SpreadDescriptor: string;
        };
    }[] | undefined;
    MaxReplicas?: number | undefined;
    Platforms?: {
        Architecture: string;
        OS: string;
    }[] | undefined;
}, {
    Constraints?: string[] | undefined;
    Preferences?: {
        Spread: {
            SpreadDescriptor: string;
        };
    }[] | undefined;
    MaxReplicas?: number | undefined;
    Platforms?: {
        Architecture: string;
        OS: string;
    }[] | undefined;
}>;
export declare const UpdateConfigSwarmSchema: z.ZodObject<{
    Parallelism: z.ZodNumber;
    Delay: z.ZodOptional<z.ZodNumber>;
    FailureAction: z.ZodOptional<z.ZodString>;
    Monitor: z.ZodOptional<z.ZodNumber>;
    MaxFailureRatio: z.ZodOptional<z.ZodNumber>;
    Order: z.ZodString;
}, "strict", z.ZodTypeAny, {
    Parallelism: number;
    Order: string;
    Delay?: number | undefined;
    FailureAction?: string | undefined;
    Monitor?: number | undefined;
    MaxFailureRatio?: number | undefined;
}, {
    Parallelism: number;
    Order: string;
    Delay?: number | undefined;
    FailureAction?: string | undefined;
    Monitor?: number | undefined;
    MaxFailureRatio?: number | undefined;
}>;
export declare const ReplicatedSchema: z.ZodObject<{
    Replicas: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    Replicas?: number | undefined;
}, {
    Replicas?: number | undefined;
}>;
export declare const ReplicatedJobSchema: z.ZodObject<{
    MaxConcurrent: z.ZodOptional<z.ZodNumber>;
    TotalCompletions: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    MaxConcurrent?: number | undefined;
    TotalCompletions?: number | undefined;
}, {
    MaxConcurrent?: number | undefined;
    TotalCompletions?: number | undefined;
}>;
export declare const ServiceModeSwarmSchema: z.ZodObject<{
    Replicated: z.ZodOptional<z.ZodObject<{
        Replicas: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        Replicas?: number | undefined;
    }, {
        Replicas?: number | undefined;
    }>>;
    Global: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    ReplicatedJob: z.ZodOptional<z.ZodObject<{
        MaxConcurrent: z.ZodOptional<z.ZodNumber>;
        TotalCompletions: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        MaxConcurrent?: number | undefined;
        TotalCompletions?: number | undefined;
    }, {
        MaxConcurrent?: number | undefined;
        TotalCompletions?: number | undefined;
    }>>;
    GlobalJob: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strict", z.ZodTypeAny, {
    Replicated?: {
        Replicas?: number | undefined;
    } | undefined;
    Global?: {} | undefined;
    ReplicatedJob?: {
        MaxConcurrent?: number | undefined;
        TotalCompletions?: number | undefined;
    } | undefined;
    GlobalJob?: {} | undefined;
}, {
    Replicated?: {
        Replicas?: number | undefined;
    } | undefined;
    Global?: {} | undefined;
    ReplicatedJob?: {
        MaxConcurrent?: number | undefined;
        TotalCompletions?: number | undefined;
    } | undefined;
    GlobalJob?: {} | undefined;
}>;
export declare const NetworkSwarmSchema: z.ZodArray<z.ZodObject<{
    Target: z.ZodOptional<z.ZodString>;
    Aliases: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    DriverOpts: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
}, "strict", z.ZodTypeAny, {
    Target?: string | undefined;
    Aliases?: string[] | undefined;
    DriverOpts?: {} | undefined;
}, {
    Target?: string | undefined;
    Aliases?: string[] | undefined;
    DriverOpts?: {} | undefined;
}>, "many">;
export declare const LabelsSwarmSchema: z.ZodRecord<z.ZodString, z.ZodString>;
export declare const EndpointPortConfigSwarmSchema: z.ZodObject<{
    Protocol: z.ZodOptional<z.ZodString>;
    TargetPort: z.ZodOptional<z.ZodNumber>;
    PublishedPort: z.ZodOptional<z.ZodNumber>;
    PublishMode: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    Protocol?: string | undefined;
    TargetPort?: number | undefined;
    PublishedPort?: number | undefined;
    PublishMode?: string | undefined;
}, {
    Protocol?: string | undefined;
    TargetPort?: number | undefined;
    PublishedPort?: number | undefined;
    PublishMode?: string | undefined;
}>;
export declare const EndpointSpecSwarmSchema: z.ZodObject<{
    Mode: z.ZodOptional<z.ZodString>;
    Ports: z.ZodOptional<z.ZodArray<z.ZodObject<{
        Protocol: z.ZodOptional<z.ZodString>;
        TargetPort: z.ZodOptional<z.ZodNumber>;
        PublishedPort: z.ZodOptional<z.ZodNumber>;
        PublishMode: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        Protocol?: string | undefined;
        TargetPort?: number | undefined;
        PublishedPort?: number | undefined;
        PublishMode?: string | undefined;
    }, {
        Protocol?: string | undefined;
        TargetPort?: number | undefined;
        PublishedPort?: number | undefined;
        PublishMode?: string | undefined;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    Mode?: string | undefined;
    Ports?: {
        Protocol?: string | undefined;
        TargetPort?: number | undefined;
        PublishedPort?: number | undefined;
        PublishMode?: string | undefined;
    }[] | undefined;
}, {
    Mode?: string | undefined;
    Ports?: {
        Protocol?: string | undefined;
        TargetPort?: number | undefined;
        PublishedPort?: number | undefined;
        PublishMode?: string | undefined;
    }[] | undefined;
}>;

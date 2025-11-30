import { pgEnum } from "drizzle-orm/pg-core";
import { z } from "zod";
export const applicationStatus = pgEnum("applicationStatus", [
    "idle",
    "running",
    "done",
    "error",
]);
export const certificateType = pgEnum("certificateType", [
    "letsencrypt",
    "none",
    "custom",
]);
export const triggerType = pgEnum("triggerType", ["push", "tag"]);
export const HealthCheckSwarmSchema = z
    .object({
    Test: z.array(z.string()).optional(),
    Interval: z.number().optional(),
    Timeout: z.number().optional(),
    StartPeriod: z.number().optional(),
    Retries: z.number().optional(),
})
    .strict();
export const RestartPolicySwarmSchema = z
    .object({
    Condition: z.string().optional(),
    Delay: z.number().optional(),
    MaxAttempts: z.number().optional(),
    Window: z.number().optional(),
})
    .strict();
export const PreferenceSchema = z
    .object({
    Spread: z.object({
        SpreadDescriptor: z.string(),
    }),
})
    .strict();
export const PlatformSchema = z
    .object({
    Architecture: z.string(),
    OS: z.string(),
})
    .strict();
export const PlacementSwarmSchema = z
    .object({
    Constraints: z.array(z.string()).optional(),
    Preferences: z.array(PreferenceSchema).optional(),
    MaxReplicas: z.number().optional(),
    Platforms: z.array(PlatformSchema).optional(),
})
    .strict();
export const UpdateConfigSwarmSchema = z
    .object({
    Parallelism: z.number(),
    Delay: z.number().optional(),
    FailureAction: z.string().optional(),
    Monitor: z.number().optional(),
    MaxFailureRatio: z.number().optional(),
    Order: z.string(),
})
    .strict();
export const ReplicatedSchema = z
    .object({
    Replicas: z.number().optional(),
})
    .strict();
export const ReplicatedJobSchema = z
    .object({
    MaxConcurrent: z.number().optional(),
    TotalCompletions: z.number().optional(),
})
    .strict();
export const ServiceModeSwarmSchema = z
    .object({
    Replicated: ReplicatedSchema.optional(),
    Global: z.object({}).optional(),
    ReplicatedJob: ReplicatedJobSchema.optional(),
    GlobalJob: z.object({}).optional(),
})
    .strict();
export const NetworkSwarmSchema = z.array(z
    .object({
    Target: z.string().optional(),
    Aliases: z.array(z.string()).optional(),
    DriverOpts: z.object({}).optional(),
})
    .strict());
export const LabelsSwarmSchema = z.record(z.string());
export const EndpointPortConfigSwarmSchema = z
    .object({
    Protocol: z.string().optional(),
    TargetPort: z.number().optional(),
    PublishedPort: z.number().optional(),
    PublishMode: z.string().optional(),
})
    .strict();
export const EndpointSpecSwarmSchema = z
    .object({
    Mode: z.string().optional(),
    Ports: z.array(EndpointPortConfigSwarmSchema).optional(),
})
    .strict();

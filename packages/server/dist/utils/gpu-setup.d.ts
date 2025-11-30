interface GPUInfo {
    driverInstalled: boolean;
    driverVersion?: string;
    gpuModel?: string;
    runtimeInstalled: boolean;
    runtimeConfigured: boolean;
    cudaSupport: boolean;
    cudaVersion?: string;
    memoryInfo?: string;
    availableGPUs: number;
    swarmEnabled: boolean;
    gpuResources: number;
}
export declare function checkGPUStatus(serverId?: string): Promise<GPUInfo>;
export declare function setupGPUSupport(serverId?: string): Promise<void>;
export {};

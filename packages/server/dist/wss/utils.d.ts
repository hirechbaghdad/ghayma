export declare const getShell: () => "bash" | "powershell.exe" | "zsh";
export declare const getPublicIpWithFallback: () => Promise<string | null>;

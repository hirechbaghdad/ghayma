export declare function getProviderName(apiUrl: string): "custom" | "azure" | "openai" | "anthropic" | "cohere" | "perplexity" | "mistral" | "ollama" | "deepinfra" | "gemini";
export declare function selectAIProvider(config: {
    apiUrl: string;
    apiKey: string;
}): import("@ai-sdk/anthropic").AnthropicProvider | import("@ai-sdk/cohere").CohereProvider | import("@ai-sdk/openai-compatible").OpenAICompatibleProvider<string, string, string, string> | import("ai-sdk-ollama").OllamaProvider;
export declare const getProviderHeaders: (apiUrl: string, apiKey: string) => Record<string, string>;
export interface Model {
    id: string;
    object: string;
    created: number;
    owned_by: string;
}

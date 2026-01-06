import { type apiCreateGithub, github } from "../db/schema/index.js";
export type Github = typeof github.$inferSelect;
export declare const createGithub: (input: typeof apiCreateGithub._type, organizationId: string, userId: string) => Promise<{
    gitProviderId: string;
    githubId: string;
    githubAppName: string | null;
    githubAppId: number | null;
    githubClientId: string | null;
    githubClientSecret: string | null;
    githubInstallationId: string | null;
    githubPrivateKey: string | null;
    githubWebhookSecret: string | null;
} | undefined>;
export declare const findGithubById: (githubId: string) => Promise<{
    gitProviderId: string;
    githubId: string;
    githubAppName: string | null;
    githubAppId: number | null;
    githubClientId: string | null;
    githubClientSecret: string | null;
    githubInstallationId: string | null;
    githubPrivateKey: string | null;
    githubWebhookSecret: string | null;
    gitProvider: {
        name: string;
        gitProviderId: string;
        providerType: "gitea" | "github" | "gitlab" | "bitbucket";
        createdAt: string;
        organizationId: string;
        userId: string;
    };
}>;
export declare const updateGithub: (githubId: string, input: Partial<Github>) => Promise<{
    githubId: string;
    githubAppName: string | null;
    githubAppId: number | null;
    githubClientId: string | null;
    githubClientSecret: string | null;
    githubInstallationId: string | null;
    githubPrivateKey: string | null;
    githubWebhookSecret: string | null;
    gitProviderId: string;
} | undefined>;
export declare const getIssueComment: (appName: string, status: "success" | "error" | "running" | "initializing", previewDomain: string) => string;
interface CommentExists {
    owner: string;
    repository: string;
    comment_id: number;
    githubId: string;
}
export declare const issueCommentExists: ({ owner, repository, comment_id, githubId, }: CommentExists) => Promise<boolean>;
interface Comment {
    owner: string;
    repository: string;
    issue_number: string;
    body: string;
    comment_id: number;
    githubId: string;
}
export declare const updateIssueComment: ({ owner, repository, issue_number, body, comment_id, githubId, }: Comment) => Promise<void>;
interface CommentCreate {
    appName: string;
    owner: string;
    repository: string;
    issue_number: string;
    previewDomain: string;
    githubId: string;
    previewDeploymentId: string;
}
export declare const createPreviewDeploymentComment: ({ owner, repository, issue_number, previewDomain, appName, githubId, previewDeploymentId, }: CommentCreate) => Promise<{
    previewDeploymentId: string;
    branch: string;
    pullRequestId: string;
    pullRequestNumber: string;
    pullRequestURL: string;
    pullRequestTitle: string;
    pullRequestCommentId: string;
    previewStatus: "idle" | "running" | "done" | "error";
    appName: string;
    applicationId: string;
    domainId: string | null;
    createdAt: string;
    expiresAt: string | null;
} | undefined>;
/**
 * Generate security notification message for blocked PR deployments
 */
export declare const getSecurityBlockedMessage: (prAuthor: string, repositoryName: string, permission: string | null) => string;
/**
 * Check if a security notification comment already exists on a GitHub PR
 * This prevents creating duplicate security comments on subsequent pushes
 */
export declare const hasExistingSecurityComment: ({ owner, repository, prNumber, githubId, }: {
    owner: string;
    repository: string;
    prNumber: number;
    githubId: string;
}) => Promise<boolean>;
/**
 * Create a security notification comment on a GitHub PR
 */
export declare const createSecurityBlockedComment: ({ owner, repository, prNumber, prAuthor, permission, githubId, }: {
    owner: string;
    repository: string;
    prNumber: number;
    prAuthor: string;
    permission: string | null;
    githubId: string;
}) => Promise<{
    id: number;
    node_id: string;
    url: string;
    body?: string;
    body_text?: string;
    body_html?: string;
    html_url: string;
    user: {
        name?: string | null;
        email?: string | null;
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string | null;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
        starred_at?: string;
    } | null;
    created_at: string;
    updated_at: string;
    issue_url: string;
    author_association: "COLLABORATOR" | "CONTRIBUTOR" | "FIRST_TIMER" | "FIRST_TIME_CONTRIBUTOR" | "MANNEQUIN" | "MEMBER" | "NONE" | "OWNER";
    performed_via_github_app?: {
        id: number;
        slug?: string;
        node_id: string;
        owner: {
            name?: string | null;
            email?: string | null;
            login: string;
            id: number;
            node_id: string;
            avatar_url: string;
            gravatar_id: string | null;
            url: string;
            html_url: string;
            followers_url: string;
            following_url: string;
            gists_url: string;
            starred_url: string;
            subscriptions_url: string;
            organizations_url: string;
            repos_url: string;
            events_url: string;
            received_events_url: string;
            type: string;
            site_admin: boolean;
            starred_at?: string;
        } | null;
        name: string;
        description: string | null;
        external_url: string;
        html_url: string;
        created_at: string;
        updated_at: string;
        permissions: {
            issues?: string;
            checks?: string;
            metadata?: string;
            contents?: string;
            deployments?: string;
            [key: string]: string | undefined;
        };
        events: string[];
        installations_count?: number;
        client_id?: string;
        client_secret?: string;
        webhook_secret?: string | null;
        pem?: string;
    } | null;
    reactions?: {
        url: string;
        total_count: number;
        "+1": number;
        "-1": number;
        laugh: number;
        confused: number;
        heart: number;
        hooray: number;
        eyes: number;
        rocket: number;
    };
} | null>;
export {};

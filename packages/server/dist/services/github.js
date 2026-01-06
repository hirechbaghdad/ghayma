import { db } from "../db/index.js";
import { github, gitProvider, } from "../db/schema/index.js";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { authGithub } from "../utils/providers/github.js";
import { updatePreviewDeployment } from "./preview-deployment.js";
export const createGithub = async (input, organizationId, userId) => {
    return await db.transaction(async (tx) => {
        const newGitProvider = await tx
            .insert(gitProvider)
            .values({
            providerType: "github",
            organizationId: organizationId,
            name: input.name,
            userId: userId,
        })
            .returning()
            .then((response) => response[0]);
        if (!newGitProvider) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Error creating the Git provider",
            });
        }
        return await tx
            .insert(github)
            .values({
            ...input,
            gitProviderId: newGitProvider?.gitProviderId,
        })
            .returning()
            .then((response) => response[0]);
    });
};
export const findGithubById = async (githubId) => {
    const githubProviderResult = await db.query.github.findFirst({
        where: eq(github.githubId, githubId),
        with: {
            gitProvider: true,
        },
    });
    if (!githubProviderResult) {
        throw new TRPCError({
            code: "NOT_FOUND",
            message: "Github Provider not found",
        });
    }
    return githubProviderResult;
};
export const updateGithub = async (githubId, input) => {
    return await db
        .update(github)
        .set({
        ...input,
    })
        .where(eq(github.githubId, githubId))
        .returning()
        .then((response) => response[0]);
};
export const getIssueComment = (appName, status, previewDomain) => {
    let statusMessage = "";
    if (status === "success") {
        statusMessage = "✅ Done";
    }
    else if (status === "error") {
        statusMessage = "❌ Failed";
    }
    else if (status === "initializing") {
        statusMessage = "🔄 Building";
    }
    else {
        statusMessage = "🔄 Building";
    }
    const finished = `
| Name       | Status       | Preview                             | Updated (UTC)         |
|------------|--------------|-------------------------------------|-----------------------|
| ${appName}  | ${statusMessage} | [Preview URL](${previewDomain}) | ${new Date().toISOString()} |
`;
    return finished;
};
export const issueCommentExists = async ({ owner, repository, comment_id, githubId, }) => {
    const github = await findGithubById(githubId);
    const octokit = authGithub(github);
    try {
        await octokit.rest.issues.getComment({
            owner: owner || "",
            repo: repository || "",
            comment_id: comment_id,
        });
        return true;
    }
    catch {
        return false;
    }
};
export const updateIssueComment = async ({ owner, repository, issue_number, body, comment_id, githubId, }) => {
    const github = await findGithubById(githubId);
    const octokit = authGithub(github);
    await octokit.rest.issues.updateComment({
        owner: owner || "",
        repo: repository || "",
        issue_number: issue_number,
        body,
        comment_id: comment_id,
    });
};
export const createPreviewDeploymentComment = async ({ owner, repository, issue_number, previewDomain, appName, githubId, previewDeploymentId, }) => {
    const github = await findGithubById(githubId);
    const octokit = authGithub(github);
    const runningComment = getIssueComment(appName, "initializing", previewDomain);
    const issue = await octokit.rest.issues.createComment({
        owner: owner || "",
        repo: repository || "",
        issue_number: Number.parseInt(issue_number),
        body: `### Dokploy Preview Deployment\n\n${runningComment}`,
    });
    return await updatePreviewDeployment(previewDeploymentId, {
        pullRequestCommentId: `${issue.data.id}`,
    }).then((response) => response[0]);
};
/**
 * Generate security notification message for blocked PR deployments
 */
export const getSecurityBlockedMessage = (prAuthor, repositoryName, permission) => {
    return `### 🚨 Preview Deployment Blocked - Security Protection

**Your pull request was blocked from triggering preview deployments**

#### Why was this blocked?
- **User**: \`${prAuthor}\`
- **Repository**: \`${repositoryName}\`
- **Permission Level**: \`${permission || "none"}\`
- **Required Level**: \`write\`, \`maintain\`, or \`admin\`

#### How to resolve this:

**Option 1: Get Collaborator Access (Recommended)**
Ask a repository maintainer to invite you as a collaborator with **write permissions** or higher.

**Option 2: Request Permission Override**
Ask a repository administrator to disable security validation for this specific application if appropriate.

#### For Repository Administrators:
To disable this security check (⚠️ **not recommended for public repositories**):
Enter to preview settings and disable the security check.

---
*This security measure protects against malicious code execution in preview deployments. Only trusted collaborators should have the ability to trigger deployments.*

<details>
<summary>🛡️ Learn more about this security feature</summary>

This protection prevents unauthorized users from:
- Executing malicious code on the deployment server
- Accessing environment variables and secrets
- Potentially compromising the infrastructure

Preview deployments are powerful but require trust. Only users with repository write access can trigger them.
</details>`;
};
/**
 * Check if a security notification comment already exists on a GitHub PR
 * This prevents creating duplicate security comments on subsequent pushes
 */
export const hasExistingSecurityComment = async ({ owner, repository, prNumber, githubId, }) => {
    try {
        const github = await findGithubById(githubId);
        const octokit = authGithub(github);
        // Get all comments for this PR
        const { data: comments } = await octokit.rest.issues.listComments({
            owner,
            repo: repository,
            issue_number: prNumber,
        });
        // Check if any comment contains our security notification marker
        const securityCommentExists = comments.some((comment) => comment.body?.includes("🚨 Preview Deployment Blocked - Security Protection"));
        return securityCommentExists;
    }
    catch (error) {
        console.error(`❌ Failed to check existing comments on PR #${prNumber}:`, error);
        // If we can't check, assume no comment exists to avoid blocking functionality
        return false;
    }
};
/**
 * Create a security notification comment on a GitHub PR
 */
export const createSecurityBlockedComment = async ({ owner, repository, prNumber, prAuthor, permission, githubId, }) => {
    try {
        // Check if a security comment already exists to prevent duplicates
        const commentExists = await hasExistingSecurityComment({
            owner,
            repository,
            prNumber,
            githubId,
        });
        if (commentExists) {
            console.log(`ℹ️  Security notification comment already exists on PR #${prNumber}, skipping duplicate`);
            return null;
        }
        const github = await findGithubById(githubId);
        const octokit = authGithub(github);
        const securityMessage = getSecurityBlockedMessage(prAuthor, repository, permission);
        const issue = await octokit.rest.issues.createComment({
            owner,
            repo: repository,
            issue_number: prNumber,
            body: securityMessage,
        });
        console.log(`✅ Security notification comment created on PR #${prNumber}: ${issue.data.html_url}`);
        return issue.data;
    }
    catch (error) {
        console.error(`❌ Failed to create security comment on PR #${prNumber}:`, error);
        // Don't throw error - security comment is nice-to-have, not critical
        return null;
    }
};

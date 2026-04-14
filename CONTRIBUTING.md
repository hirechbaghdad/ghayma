# Contributing

This repository powers **Atlanexis CloudOS**. Contributions should preserve the current CloudOS runtime model, naming, and deployment flow while staying compatible with the existing monorepo structure.

Before starting significant work, open or discuss the issue first so the implementation direction is clear and effort does not get duplicated.

## Ground Rules

- Keep changes focused. One PR should solve one clear problem.
- Prefer fixes and features over unrelated cleanup.
- Update tests and documentation when behavior changes.
- Preserve compatibility where the codebase still uses legacy `dokploy` package names or script names internally.
- Do not silently rename runtime-critical identifiers without checking cross-package usage first.

## Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Format:

```text
<type>[optional scope]: <description>
```

Valid types:

- `feat`
- `fix`
- `docs`
- `style`
- `refactor`
- `perf`
- `test`
- `build`
- `ci`
- `chore`
- `revert`

Example:

```text
fix: correct traefik network label for isolated compose deployments
```

## Local Setup

Requirements:

- Node `20.16.0`
- `pnpm` `9.12.0+`
- Docker

Recommended with `nvm`:

```bash
nvm install 20.16.0
nvm use 20.16.0
```

Project setup:

```bash
pnpm install
cp apps/dokploy/.env.example apps/dokploy/.env
pnpm run cloudos:setup
pnpm run server:script
pnpm run cloudos:dev
```

Open:

```text
http://localhost:3000
```

Notes:

- `pnpm run cloudos:setup` prepares local services and runs migrations
- `pnpm run server:script` switches `@dokploy/server` to source exports for local development
- `pnpm run cloudos:dev` starts the CloudOS dashboard and backend server

## Repository Shape

The most important areas are:

- `apps/dokploy`: main CloudOS dashboard, API surface, and runtime server
- `packages/server`: shared backend logic, Docker orchestration, setup, and runtime helpers
- `apps/api`: supporting API-related services
- `apps/schedules`: scheduling and backup-related tasks
- `install.sh`: production-style bootstrap for `atlanexis/cloudos:latest`

## Runtime Expectations

Current production naming is based on:

- `atlanexis-cloudos`
- `atlanexis-traefik`
- `atlanexis-postgres`
- `atlanexis-redis`
- `atlanexis-network`

If you touch deployment logic, installer behavior, or Traefik integration, validate that your change is consistent with:

- `install.sh`
- `packages/server/src/constants/runtime.ts`
- `packages/server/src/setup/*`
- `packages/server/src/utils/docker/*`

## Validation

Run the relevant checks before opening a PR.

Full validation:

```bash
pnpm run cloudos:validate
```

Common targeted commands:

```bash
pnpm run cloudos:test
pnpm run typecheck
pnpm run cloudos:build
```

Formatting and linting:

```bash
pnpm run check
```

This repository uses **Biome**. Do not format with Prettier unless the file or workflow explicitly requires something else.

## Docker And Image Work

To build the CloudOS image locally:

```bash
docker build -t atlanexis/cloudos:latest .
```

If you change installer, Docker, or runtime deployment logic, verify at least one realistic path:

- local source development
- local install via `install.sh`
- VPS install via `install.sh`

## Documentation

Update documentation when you change:

- install steps
- runtime service names
- environment variables
- deployment networking
- build or release flow
- UI wording that affects operators

For product-facing docs, keep the wording CloudOS-first rather than Dokploy-first.

## Pull Requests

- Create a branch for each feature or fix.
- Explain what changed, why it changed, and how it was verified.
- Include screenshots or terminal output when the change affects UI or installation flow.
- Link the issue if the PR resolves one.
- Call out any migration, installer, or runtime compatibility impact clearly.

PRs are easier to review when they include:

- the user-visible change
- the affected runtime components
- the verification steps you actually ran
- any known follow-up work

## Avoid These Patterns

- Large mixed PRs that combine branding, runtime changes, refactors, and unrelated cleanup
- Cosmetic-only formatting passes across unrelated files
- Renaming internal compatibility identifiers without checking runtime impact
- Editing generated or vendored output unless there is a specific reason

## Templates

When adding or updating templates:

- use a stable folder name that matches the template id
- keep logos and assets in the expected public/template paths
- use `_HOST` suffixes for variables that should surface as domains in the UI
- test templates on an actual server or VPS before considering them ready

## Operator Tooling

If you test builds that use external builders on the host, make sure the target machine has the required tool installed, such as:

- Nixpacks
- Railpack
- Buildpacks `pack`

## Final Check Before Opening A PR

- code builds
- relevant tests pass
- docs are updated
- naming matches CloudOS runtime conventions
- installer and deployment changes were validated against the real flow you changed

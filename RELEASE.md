Atlanexis CloudOS - Ghayma | Patch Notes 
Copyright (c) Hirech Baghdad Belkheir 2026
Copyright (c) Atlanexis Inc, 2026


Version 1.2.2

  Security Changes

  - Made dangerous Docker APIs owner-only and added org checks for remote server access in apps/dokploy/server/api/routers/docker.ts.
  - Made terminal/log websocket access owner-only, added server org checks, and removed shell interpolation for local Docker exec/logs in the websocket handlers.
  - Locked schedule create/update/list/run/delete to owner-only and validated referenced application/compose/server ownership in apps/dokploy/server/api/routers/schedule.ts.
  - Prevented API key org spoofing and reject API-key sessions when the key owner is not a member of the encoded org.
  - Redacted SSH private keys and registry passwords from API responses; made those management routes owner-only.
  - Fixed remote registry test command injection by shell-quoting args and validating server org access.
  - Capped drop uploads at 100MB and blocked ZIP path traversal before writing locally or over SFTP.
  - Removed monitoring token config logging, narrowed CORS, and capped metrics reads.

  Operational Fixes

  - Added /health support to the custom Next server for the existing Docker healthcheck.
  - Fixed .env.production absence crash in esbuild.config.ts.
  - Re-enabled Next build failure on TypeScript/ESLint errors.

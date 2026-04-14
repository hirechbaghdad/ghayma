<div align="center">
  <a href="https://atlanexis.com">
    <img src="./apps/dokploy/LOGO2.png" alt="Atlanexis CloudOS" width="22%" />
  </a>
  <h1>Atlanexis CloudOS</h1>
  <p>Deploy apps, databases, and Docker workloads on your own infrastructure with a clean control plane, built-in routing, and fast day-to-day operations.</p>
</div>

## What CloudOS Is

Atlanexis CloudOS is a self-hosted platform for running and managing modern workloads on a VPS, bare metal server, or Docker Swarm cluster. It gives you a web control plane, integrated Traefik routing, database services, Docker Compose deployment support, monitoring, backups, and remote server management without forcing you into a hosted platform.

## Core Services

- **Application Deployments**: Run Node.js, Python, PHP, Go, Ruby, static sites, and custom Docker images.
- **Docker Compose**: Deploy raw compose files and multi-service stacks from a single UI.
- **Managed Databases**: Provision PostgreSQL, MySQL, MariaDB, MongoDB, and Redis services.
- **Traefik Routing**: Automatic HTTP/HTTPS routing with certificate support and path handling.
- **Backups**: Run scheduled backups for supported services and restore them when needed.
- **Monitoring**: Track CPU, memory, storage, and network usage for your services and servers.
- **Remote Servers**: Connect external machines over SSH and manage workloads from one dashboard.
- **Templates**: Launch common open source services with prebuilt templates and generated variables.
- **Notifications**: Send deployment and system events to Slack, Discord, Telegram, email, and more.

## Architecture

CloudOS installs and manages these runtime components by default:

- `atlanexis-cloudos`: the main control plane
- `atlanexis-traefik`: edge routing and TLS
- `atlanexis-postgres`: internal PostgreSQL for CloudOS state
- `atlanexis-redis`: queues and background job support
- `atlanexis-network`: the shared platform network

For isolated deployments, CloudOS can also create per-app Docker networks so services stay separated while still routing through Traefik.

## Quick Start

### Deploy On A VPS

Use this path if you want a production-style install that pulls `atlanexis/cloudos:latest` from Docker Hub.

Requirements:

- Linux VPS with root access
- Docker-compatible x86_64 host
- Ports `80`, `443`, and `3000` available
- A private IP usable for Docker Swarm advertise address

Steps:

```bash
git clone <your-cloudos-repository>
cd <repo-directory>
sudo bash install.sh
```

After install:

- CloudOS UI: `http://YOUR_SERVER_IP:3000`
- Traefik HTTP: `http://YOUR_SERVER_IP`
- Traefik HTTPS: `https://YOUR_SERVER_IP` once DNS and certificates are configured

The installer will:

- install Docker if needed
- initialize Docker Swarm
- create `atlanexis-network` and compatibility networking
- write Traefik config under `/etc/dokploy`
- start `atlanexis-traefik`, `atlanexis-postgres`, `atlanexis-redis`, and `atlanexis-cloudos`

### Install Locally From Docker Hub

If you want to test CloudOS on your own workstation without running the dev stack:

```bash
git clone <your-cloudos-repository>
cd <repo-directory>
sudo bash install.sh
```

This uses the installer default:

```bash
DOCKER_IMAGE=atlanexis/cloudos:latest
```

### Install Locally From Your Own Built Image

Use this when you changed the code and want to run the exact image you built locally:

```bash
docker build -t atlanexis/cloudos:latest .
sudo DOCKER_IMAGE=atlanexis/cloudos:latest bash install.sh
```

If the image already exists locally, the installer will use it instead of pulling from Docker Hub.

## Local Development

Use this path if you want hot reload and source-level development.

Requirements:

- Node `20.16.0`
- `pnpm` `9.12.0+`
- Docker

Setup:

```bash
pnpm install
cp apps/dokploy/.env.example apps/dokploy/.env
pnpm run dokploy:setup
pnpm run server:script
pnpm run dokploy:dev
```

Open:

```text
http://localhost:3000
```

Notes:

- `pnpm run dokploy:setup` prepares local services and runs migrations
- `pnpm run server:script` switches `@dokploy/server` exports to source mode for local development
- `pnpm run dokploy:dev` starts the custom Node server for the dashboard and API

## Build And Ship

### Build The App

```bash
pnpm run dokploy:build
```

### Run Validation

```bash
pnpm run validate
```

### Build A Docker Image

```bash
docker build -t atlanexis/cloudos:latest .
```

### Push A Docker Image

```bash
docker push atlanexis/cloudos:latest
```

## Useful Commands

```bash
pnpm run dokploy:setup
pnpm run dokploy:dev
pnpm run dokploy:build
pnpm run validate
pnpm run test
pnpm run reset-password
```

## Operational Notes

- CloudOS stores runtime config and generated Traefik files under `/etc/dokploy`
- The internal platform database and queue services are created automatically by the installer
- The `traefik.yml` provider config uses `atlanexis-network` as the shared network
- Isolated compose deployments are labeled with their own app network so Traefik can still route correctly

## Troubleshooting

### Docker Permissions

If your local Docker client cannot access the daemon or Docker config files:

```bash
sudo chown -R "$(whoami)" ~/.docker
```

### Password Reset

If you lose access to the local account:

```bash
pnpm run reset-password
```

### Local Tunnel For Webhook Testing

```bash
pnpm dlx localtunnel --port 3000
```

### Optional Builders On Target Hosts

If you deploy workloads that rely on specific builders, install them on the target machine first.

Nixpacks:

```bash
curl -sSL https://nixpacks.com/install.sh -o install.sh && chmod +x install.sh && ./install.sh
```

Railpack:

```bash
curl -sSL https://railpack.com/install.sh | sh
```

Buildpacks `pack`:

```bash
curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.35.0/pack-v0.35.0-linux.tgz" | tar -C /usr/local/bin/ --no-same-owner -xzv pack
```

## Contributing

Source contribution rules and workflow live in [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Branding Note

Some internal package names and scripts still use legacy `dokploy` naming for compatibility. The product and runtime branding for deployment is now CloudOS / Atlanexis CloudOS.

<div align="center">
  <a href="https://atlanexis.com">
    <img src="./apps/dokploy/LOGO2.png" alt="Atlanexis CloudOS" width="22%" />
  </a>
  <h1>Atlanexis CloudOS</h1>
  <p>A new operating layer for self-hosting, private infrastructure, and modern platform operations.</p>
</div>

## CloudOS

Atlanexis CloudOS is a self-hosted platform built to make infrastructure feel fast, unified, and operationally clean.

Instead of stitching together reverse proxies, deployment scripts, database containers, backup jobs, and server dashboards by hand, CloudOS gives teams one control plane to run applications, services, and environments with far less friction.

This product is designed to disrupt the way self-hosting datacenters and DevOps teams operate: less glue code, fewer repeated setup tasks, faster deployment cycles, clearer visibility, and a better operator experience from day one.

## Why It Matters

- **For self-hosters**: CloudOS turns a raw server into a usable platform, not just a machine.
- **For datacenters**: it creates a cleaner service layer for managing deployments across infrastructure.
- **For DevOps teams**: it reduces routine platform overhead so teams can focus on delivery instead of repetitive operational work.
- **For growing companies**: it offers a path between ad hoc Docker setups and overly complex enterprise platforms.

## Features

- Application deployment from a simple control plane
- Docker and Docker Compose workload management
- Managed databases and service orchestration
- Built-in Traefik-based routing and HTTPS handling
- Monitoring for servers and workloads
- Backup-ready service workflows
- Multi-server operations from one interface
- Template-based deployments for faster launches
- A cleaner day-to-day platform experience for internal teams

## Installation

### Install On A VPS or Locally

```bash
git clone https://github.com/hirechbaghdad/ghayma
cd ghayma
sudo bash install.sh
```
### Install Using Your Own Built Image

```bash
docker build -t atlanexis/cloudos:latest .
sudo DOCKER_IMAGE=atlanexis/cloudos:latest bash install.sh
```
### Install using Docker compose
```bash
docker compose up -d
```
## Vision

CloudOS is not just another panel.

It is a serious attempt to modernize self-hosted operations and give infrastructure teams a platform that feels native to the way they already work: containers, services, routing, scale, repeatability, and control.

The long-term goal is simple: make self-hosting feel powerful without making it painful.

## Author

CloudOS is a proud work of **Hirech Baghdad Belkheir**.
We thank our contributors and people who help us a lot 

- Hakim Riad "SRE Engineer and Sysadmin"
- Mohammed Adda Benkosseir "PHP/Laravel Senior Developer"
- Azzeddine Djemai "Cybersecurity Engineer"
- Dokploy Developers 
- FF15 Community


## Feedback

Ideas, suggestions, bug reports, and improvement requests are welcome.

- Open an issue on GitHub in this repository
- Email: `hirechbaghdad@atlanexis.com`

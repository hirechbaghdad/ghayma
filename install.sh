#!/bin/bash

# Configuration and Versioning
detect_version() {
    local version="${DOKPLOY_VERSION:-latest}"
    echo "$version"
}

is_proxmox_lxc() {
    if [ -n "$container" ] && [ "$container" = "lxc" ]; then return 0; fi
    if grep -q "container=lxc" /proc/1/environ 2>/dev/null; then return 0; fi
    return 1
}

install_atlanexis() {
    VERSION_TAG=$(detect_version)
    DOCKER_IMAGE="atlanexis/atlanexis-cloudos:${VERSION_TAG}"
    
    echo "Starting Atlanexis CloudOS Installation (Version: ${VERSION_TAG})"

    # 1. System Requirements Check
    if [ "$(id -u)" != "0" ]; then echo "Error: Must run as root" >&2; exit 1; fi
    if [ "$(uname)" = "Darwin" ]; then echo "Error: Linux only" >&2; exit 1; fi
    
    # Check if ports 80, 443, and 3000 are available
    for port in 80 443 3000; do
        if ss -tulnp | grep ":$port " >/dev/null; then
            echo "Error: Port $port is already in use. Please free it and try again." >&2
            exit 1
        fi
    done

    # 2. Docker Installation
    if command -v docker >/dev/null 2>&1; then
        echo "Docker is already installed."
    else
        echo "Installing Docker..."
        curl -sSL https://get.docker.com | sh -s -- --version 28.5.0
    fi

    # 3. Network & Swarm Setup
    docker swarm leave --force 2>/dev/null

    get_private_ip() {
        ip addr show | grep -E "inet (192\.168\.|10\.|172\.1[6-9]\.|172\.2[0-9]\.|172\.3[0-1]\.)" | head -n1 | awk '{print $2}' | cut -d/ -f1
    }
    
    advertise_addr="${ADVERTISE_ADDR:-$(get_private_ip)}"
    echo "Using Advertise Address: $advertise_addr"

    docker swarm init --advertise-addr "$advertise_addr" ${DOCKER_SWARM_INIT_ARGS:-}
    docker network create --driver overlay --attachable dokploy-network

    # 4. Configuration Directory & Traefik Setup
    # This prevents Docker from creating directories where files should be
    echo "Configuring /etc/dokploy and Traefik..."
    mkdir -p /etc/dokploy/traefik/dynamic
    chmod 777 /etc/dokploy

    # Create Traefik Static Config
    cat <<EOF > /etc/dokploy/traefik/traefik.yml
api:
  dashboard: true
  insecure: true
providers:
  docker:
    exposedByDefault: false
    swarmMode: true
  file:
    directory: /etc/dokploy/traefik/dynamic
    watch: true
entryPoints:
  web:
    address: ":80"
  websecure:
    address: ":443"
EOF

    # Create Traefik Dynamic Config for the main app
    cat <<EOF > /etc/dokploy/traefik/dynamic/atlanexis.yml
http:
  routers:
    atlanexis-router:
      rule: "Host(\`$advertise_addr\`)"
      entryPoints:
        - web
      service: atlanexis-service
  services:
    atlanexis-service:
      loadBalancer:
        servers:
          - url: "http://atlanexis-cloudos:3000"
EOF

    # 5. Deploy Database Service
    echo "Deploying Postgres (db)..."
    docker service create \
      --name db \
      --constraint 'node.role==manager' \
      --network dokploy-network \
      --env POSTGRES_USER=atlanexis \
      --env POSTGRES_DB=atlanexis \
      --env POSTGRES_PASSWORD=amukds4wi9001583845717ad2 \
      --mount type=volume,source=atlanexis-postgres-database,target=/var/lib/postgresql/data \
      postgres:16

    # 6. Deploy Redis Service
    echo "Deploying Redis..."
    docker service create \
      --name redis \
      --constraint 'node.role==manager' \
      --network dokploy-network \
      --mount type=volume,source=redis-data-volume,target=/data \
      redis:7

    # 7. Deploy Atlanexis CloudOS
    echo "Deploying Atlanexis CloudOS..."
    
    endpoint_mode=""
    if is_proxmox_lxc; then
        endpoint_mode="--endpoint-mode dnsrr"
    fi

    docker service create \
      --name atlanexis-cloudos \
      --replicas 1 \
      --network dokploy-network \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/etc/dokploy,target=/etc/dokploy \
      --mount type=volume,source=atlanexis-docker-config,target=/root/.docker \
      --publish published=3000,target=3000,mode=host \
      --constraint 'node.role == manager' \
      $endpoint_mode \
      -e DATABASE_URL=postgres://atlanexis:amukds4wi9001583845717ad2@db:5432/atlanexis \
      -e PGHOST=db \
      -e PGPORT=5432 \
      -e PGUSER=atlanexis \
      -e PGPASSWORD=amukds4wi9001583845717ad2 \
      -e PGDATABASE=atlanexis \
      -e REDIS_HOST=redis \
      -e REDIS_PORT=6379 \
      -e ADVERTISE_ADDR="$advertise_addr" \
      "$DOCKER_IMAGE"

    # 8. Deploy Traefik
    echo "Deploying Traefik..."
    docker service create \
      --name atlanexis-traefik \
      --constraint 'node.role==manager' \
      --network dokploy-network \
      --mount type=bind,source=/etc/dokploy/traefik/traefik.yml,target=/etc/traefik/traefik.yml \
      --mount type=bind,source=/etc/dokploy/traefik/dynamic,target=/etc/dokploy/traefik/dynamic \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --publish mode=host,published=80,target=80 \
      --publish mode=host,published=443,target=443 \
      --publish mode=host,published=443,target=443,protocol=udp \
      traefik:v3.5.0

    # Final Output
    GREEN="\033[0;32m"
    NC="\033[0m"
    echo -e "\n${GREEN}Installation Complete!${NC}"
    echo "Access your panel at: http://$advertise_addr:3000"
}

update_atlanexis() {
    VERSION_TAG=$(detect_version)
    DOCKER_IMAGE="atlanexis/atlanexis-cloudos:${VERSION_TAG}"
    echo "Updating to $DOCKER_IMAGE..."
    docker pull "$DOCKER_IMAGE"
    docker service update --image "$DOCKER_IMAGE" atlanexis-cloudos
}

if [ "$1" = "update" ]; then
    update_atlanexis
else
    install_atlanexis
fi
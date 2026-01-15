#!/bin/bash

# Function to detect if running in Proxmox LXC container
is_proxmox_lxc() {
    if [ -n "$container" ] && [ "$container" = "lxc" ]; then
        return 0
    fi
    if grep -q "container=lxc" /proc/1/environ 2>/dev/null; then
        return 0
    fi
    return 1
}

install_dokploy() {
    # Detect version tag
    VERSION_TAG=$(detect_version)
    DOCKER_IMAGE="atlanexis/ghayma:1.2"
    
    # Database Configuration
    DB_USER="dokploy"
    DB_NAME="dokploy"
    DB_PASS="amukds4wi9001583845717ad2"
    DB_HOST="dokploy-postgres" # Fixed to match service name
    
    echo "Installing Dokploy version: ${VERSION_TAG}"
    if [ "$(id -u)" != "0" ]; then
        echo "This script must be run as root" >&2
        exit 1
    fi

    if [ "$(uname)" = "Darwin" ]; then
        echo "This script must be run on Linux" >&2
        exit 1
    fi

    if [ -f /.dockerenv ]; then
        echo "This script must be run on Linux" >&2
        exit 1
    fi

    # Port checks
    for port in 80 443 3000; do
        if ss -tulnp | grep ":$port " >/dev/null; then
            echo "Error: something is already running on port $port" >&2
            exit 1
        fi
    done

    command_exists() {
      command -v "$@" > /dev/null 2>&1
    }

    if command_exists docker; then
      echo "Docker already installed"
    else
      curl -sSL https://get.docker.com | sh -s -- --version 28.5.0
    fi

    endpoint_mode=""
    if is_proxmox_lxc; then
        echo "⚠️ WARNING: Detected Proxmox LXC container environment!"
        endpoint_mode="--endpoint-mode dnsrr"
        sleep 5
    fi

    docker swarm leave --force 2>/dev/null

    get_ip() {
        local ip=""
        ip=$(curl -4s --connect-timeout 5 https://ifconfig.io 2>/dev/null)
        [ -z "$ip" ] && ip=$(curl -4s --connect-timeout 5 https://icanhazip.com 2>/dev/null)
        echo "$ip"
    }

    get_private_ip() {
        ip addr show | grep -E "inet (192\.168\.|10\.|172\.1[6-9]\.|172\.2[0-9]\.|172\.3[0-1]\.)" | head -n1 | awk '{print $2}' | cut -d/ -f1
    }

    advertise_addr="${ADVERTISE_ADDR:-$(get_private_ip)}"

    if [ -z "$advertise_addr" ]; then
        echo "ERROR: We couldn't find a private IP address."
        exit 1
    fi
    echo "Using advertise address: $advertise_addr"

    swarm_init_args="${DOCKER_SWARM_INIT_ARGS:-}"
    
    if [ -n "$swarm_init_args" ]; then
        docker swarm init --advertise-addr $advertise_addr $swarm_init_args
    else
        docker swarm init --advertise-addr $advertise_addr
    fi
    
    if [ $? -ne 0 ]; then
        echo "Error: Failed to initialize Docker Swarm" >&2
        exit 1
    fi

    docker network rm -f dokploy-network 2>/dev/null
    docker network create --driver overlay --attachable dokploy-network

    mkdir -p /etc/dokploy
    chmod 777 /etc/dokploy

    # Create Postgres Service
    docker service create \
    --name dokploy-postgres \
    --constraint 'node.role==manager' \
    --network dokploy-network \
    --env POSTGRES_USER=$DB_USER \
    --env POSTGRES_DB=$DB_NAME \
    --env POSTGRES_PASSWORD=$DB_PASS \
    --mount type=volume,source=dokploy-postgres,target=/var/lib/postgresql/data \
    $endpoint_mode \
    postgres:16

    # Create Redis Service
    docker service create \
    --name dokploy-redis \
    --constraint 'node.role==manager' \
    --network dokploy-network \
    --mount type=volume,source=dokploy-redis,target=/data \
    $endpoint_mode \
    redis:7

    # Create Dokploy Service with FIXED DATABASE_URL
    docker service create \
      --name dokploy \
      --replicas 1 \
      --network dokploy-network \
      --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
      --mount type=bind,source=/etc/dokploy,target=/etc/dokploy \
      --mount type=volume,source=atlanexis-docker-config,target=/root/.docker \
      --publish published=3000,target=3000,mode=host \
      --constraint 'node.role == manager' \
      $endpoint_mode \
      -e ADVERTISE_ADDR="$advertise_addr" \
      -e DATABASE_URL="postgresql://$DB_USER:$DB_PASS@$DB_HOST:5432/$DB_NAME?sslmode=disable" \
      -e REDIS_URL="redis://dokploy-redis:6379" \
      "$DOCKER_IMAGE"

    sleep 4

    # Traefik Setup
    docker run -d \
        --name dokploy-traefik \
        --restart always \
        -v /etc/dokploy/traefik/traefik.yml:/etc/traefik/traefik.yml \
        -v /etc/dokploy/traefik/dynamic:/etc/dokploy/traefik/dynamic \
        -v /var/run/docker.sock:/var/run/docker.sock:ro \
        -p 80:80/tcp \
        -p 443:443/tcp \
        -p 443:443/udp \
        traefik:v3.6.1
    
    docker network connect dokploy-network dokploy-traefik

    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
    BLUE="\033[0;34m"
    NC="\033[0m"

    format_ip_for_url() {
        local ip="$1"
        if echo "$ip" | grep -q ':'; then
            echo "[${ip}]"
        else
            echo "${ip}"
        fi
    }

    public_ip="${ADVERTISE_ADDR:-$(get_ip)}"
    formatted_addr=$(format_ip_for_url "$public_ip")
    echo ""
    printf "${GREEN}Congratulations, Dokploy is installed!${NC}\n"
    printf "${BLUE}Wait 15 seconds for the server to start${NC}\n"
    printf "${YELLOW}Please go to http://${formatted_addr}:3000${NC}\n\n"
}

update_dokploy() {
    VERSION_TAG=$(detect_version)
    DOCKER_IMAGE="atlanexis/ghayma:1.2"
    echo "Updating Dokploy to version: ${VERSION_TAG}"
    docker pull $DOCKER_IMAGE
    docker service update --image $DOCKER_IMAGE dokploy
    echo "Dokploy has been updated to version: ${VERSION_TAG}"
}

if [ "$1" = "update" ]; then
    update_dokploy
else
    install_dokploy
fi
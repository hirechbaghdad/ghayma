#!/bin/bash

set -euo pipefail

APP_DISPLAY_NAME="${APP_DISPLAY_NAME:-Atlanexis CloudOS}"
DOCKER_IMAGE="${DOCKER_IMAGE:-atlanexis/cloudos:latest}"

APP_SERVICE_NAME="${APP_SERVICE_NAME:-atlanexis-cloudos}"
POSTGRES_SERVICE_NAME="${POSTGRES_SERVICE_NAME:-atlanexis-postgres}"
REDIS_SERVICE_NAME="${REDIS_SERVICE_NAME:-atlanexis-redis}"
TRAEFIK_CONTAINER_NAME="${TRAEFIK_CONTAINER_NAME:-atlanexis-traefik}"

PRIMARY_NETWORK_NAME="${PRIMARY_NETWORK_NAME:-atlanexis-network}"
LEGACY_NETWORK_NAME="${LEGACY_NETWORK_NAME:-dokploy-network}"

BASE_PATH="${BASE_PATH:-/etc/dokploy}"
TRAEFIK_PATH="${TRAEFIK_PATH:-$BASE_PATH/traefik}"
DYNAMIC_TRAEFIK_PATH="${DYNAMIC_TRAEFIK_PATH:-$TRAEFIK_PATH/dynamic}"

APP_PORT="${APP_PORT:-3000}"
TRAEFIK_PORT="${TRAEFIK_PORT:-80}"
TRAEFIK_SSL_PORT="${TRAEFIK_SSL_PORT:-443}"
TRAEFIK_HTTP3_PORT="${TRAEFIK_HTTP3_PORT:-443}"
TRAEFIK_VERSION="${TRAEFIK_VERSION:-3.6.1}"
TRAEFIK_EMAIL="${TRAEFIK_EMAIL:-test@localhost.com}"

DB_USER="${DB_USER:-atlanexis}"
DB_NAME="${DB_NAME:-atlanexis}"
DB_PASS="${DB_PASS:-amukds4wi9001583845717ad2}"
DB_HOST="${DB_HOST:-$POSTGRES_SERVICE_NAME}"

REDIS_HOST="${REDIS_HOST:-$REDIS_SERVICE_NAME}"
REDIS_PORT="${REDIS_PORT:-6379}"

GREEN="\033[0;32m"
YELLOW="\033[1;33m"
BLUE="\033[0;34m"
RED="\033[0;31m"
NC="\033[0m"

log_info() {
	printf "${BLUE}%s${NC}\n" "$1"
}

log_warn() {
	printf "${YELLOW}%s${NC}\n" "$1"
}

log_error() {
	printf "${RED}%s${NC}\n" "$1" >&2
}

command_exists() {
	command -v "$1" >/dev/null 2>&1
}

detect_version() {
	if [[ "$DOCKER_IMAGE" == *":"* ]]; then
		printf "%s\n" "${DOCKER_IMAGE##*:}"
	else
		printf "latest\n"
	fi
}

is_proxmox_lxc() {
	if [ "${container:-}" = "lxc" ]; then
		return 0
	fi

	if grep -q "container=lxc" /proc/1/environ 2>/dev/null; then
		return 0
	fi

	return 1
}

require_linux_root() {
	if [ "$(id -u)" != "0" ]; then
		log_error "This script must be run as root."
		exit 1
	fi

	if [ "$(uname)" = "Darwin" ]; then
		log_error "This script must be run on Linux."
		exit 1
	fi

	if [ -f /.dockerenv ]; then
		log_error "This script must be run on a host machine, not inside a container."
		exit 1
	fi
}

ensure_dependencies() {
	if ! command_exists curl; then
		log_error "curl is required but not installed."
		exit 1
	fi

	if command_exists docker; then
		log_info "Docker already installed."
	else
		log_info "Installing Docker."
		curl -fsSL https://get.docker.com | sh -s -- --version 28.5.0
	fi
}

get_public_ip() {
	local ip=""
	ip=$(curl -4fsS --connect-timeout 5 https://ifconfig.io 2>/dev/null || true)
	[ -z "$ip" ] && ip=$(curl -4fsS --connect-timeout 5 https://icanhazip.com 2>/dev/null || true)
	printf "%s" "$ip"
}

get_private_ip() {
	ip addr show | awk '/inet / {print $2}' | cut -d/ -f1 | grep -E '^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)' | head -n1
}

get_advertise_addr() {
	local advertise_addr="${ADVERTISE_ADDR:-}"

	if [ -z "$advertise_addr" ]; then
		advertise_addr="$(get_private_ip)"
	fi

	if [ -z "$advertise_addr" ]; then
		log_error "Could not determine a private IP address. Set ADVERTISE_ADDR explicitly."
		exit 1
	fi

	printf "%s" "$advertise_addr"
}

ensure_swarm() {
	local swarm_state
	swarm_state="$(docker info --format '{{.Swarm.LocalNodeState}}' 2>/dev/null || true)"

	if [ "$swarm_state" = "active" ]; then
		log_info "Docker Swarm already initialized."
		return
	fi

	local advertise_addr="$1"
	local swarm_init_args="${DOCKER_SWARM_INIT_ARGS:-}"

	log_info "Initializing Docker Swarm with advertise address ${advertise_addr}."
	if [ -n "$swarm_init_args" ]; then
		# shellcheck disable=SC2086
		docker swarm init --advertise-addr "$advertise_addr" $swarm_init_args
	else
		docker swarm init --advertise-addr "$advertise_addr"
	fi
}

ensure_overlay_network() {
	local network_name="$1"

	if docker network inspect "$network_name" >/dev/null 2>&1; then
		log_info "Docker network ${network_name} already exists."
	else
		log_info "Creating Docker network ${network_name}."
		docker network create --driver overlay --attachable "$network_name" >/dev/null
	fi
}

remove_service_if_exists() {
	local service_name="$1"

	if docker service inspect "$service_name" >/dev/null 2>&1; then
		log_warn "Removing existing service ${service_name}."
		docker service rm "$service_name" >/dev/null
		for _ in $(seq 1 30); do
			if ! docker service inspect "$service_name" >/dev/null 2>&1; then
				return
			fi
			sleep 1
		done
	fi
}

remove_container_if_exists() {
	local container_name="$1"

	if docker inspect "$container_name" >/dev/null 2>&1; then
		log_warn "Removing existing container ${container_name}."
		docker rm -f "$container_name" >/dev/null
	fi
}

ensure_path_layout() {
	mkdir -p \
		"$BASE_PATH" \
		"$TRAEFIK_PATH" \
		"$DYNAMIC_TRAEFIK_PATH" \
		"$DYNAMIC_TRAEFIK_PATH/certificates" \
		"$BASE_PATH/logs" \
		"$BASE_PATH/applications" \
		"$BASE_PATH/monitoring" \
		"$BASE_PATH/schedules" \
		"$BASE_PATH/volume-backups" \
		"$BASE_PATH/ssh"

	chmod 755 "$BASE_PATH"
	chmod 700 "$BASE_PATH/ssh"

	touch "$DYNAMIC_TRAEFIK_PATH/acme.json"
	chmod 600 "$DYNAMIC_TRAEFIK_PATH/acme.json"
}

write_traefik_config() {
	cat >"$TRAEFIK_PATH/traefik.yml" <<EOF
global:
  sendAnonymousUsage: false
providers:
  swarm:
    exposedByDefault: false
    watch: true
  docker:
    exposedByDefault: false
    watch: true
    network: ${PRIMARY_NETWORK_NAME}
  file:
    directory: /etc/dokploy/traefik/dynamic
    watch: true
entryPoints:
  web:
    address: ":${TRAEFIK_PORT}"
  websecure:
    address: ":${TRAEFIK_SSL_PORT}"
    http3:
      advertisedPort: ${TRAEFIK_HTTP3_PORT}
    http:
      tls:
        certResolver: letsencrypt
api:
  insecure: true
certificatesResolvers:
  letsencrypt:
    acme:
      email: ${TRAEFIK_EMAIL}
      storage: /etc/dokploy/traefik/dynamic/acme.json
      httpChallenge:
        entryPoint: web
EOF

	cat >"$DYNAMIC_TRAEFIK_PATH/middlewares.yml" <<'EOF'
http:
  middlewares:
    redirect-to-https:
      redirectScheme:
        scheme: https
        permanent: true
EOF

	rm -f "$DYNAMIC_TRAEFIK_PATH/dokploy.yml"
	cat >"$DYNAMIC_TRAEFIK_PATH/${APP_SERVICE_NAME}.yml" <<EOF
http:
  routers:
    ${APP_SERVICE_NAME}-router-app:
      rule: Host(\`${APP_SERVICE_NAME}.docker.localhost\`) && PathPrefix(\`/\`)
      service: ${APP_SERVICE_NAME}-service-app
      entryPoints:
        - web
  services:
    ${APP_SERVICE_NAME}-service-app:
      loadBalancer:
        passHostHeader: true
        servers:
          - url: http://${APP_SERVICE_NAME}:${APP_PORT}
EOF
}

port_is_in_use() {
	local port="$1"

	if command_exists ss; then
		ss -tuln | awk '{print $5}' | grep -E "(^|:)$port$" >/dev/null
		return
	fi

	if command_exists netstat; then
		netstat -tuln | awk '{print $4}' | grep -E "(^|:)$port$" >/dev/null
		return
	fi

	if command_exists lsof; then
		lsof -i :"$port" >/dev/null 2>&1
		return
	fi

	log_error "Could not check whether port ${port} is in use because ss, netstat, and lsof are unavailable."
	exit 1
}

assert_port_available() {
	local port="$1"

	if port_is_in_use "$port"; then
		log_error "Port ${port} is already in use."
		exit 1
	fi
}

ensure_image_available() {
	if docker image inspect "$DOCKER_IMAGE" >/dev/null 2>&1; then
		log_info "Using local image ${DOCKER_IMAGE}."
		return
	fi

	log_info "Local image ${DOCKER_IMAGE} not found. Pulling from registry."
	docker pull "$DOCKER_IMAGE"
}

wait_for_service_running() {
	local service_name="$1"
	local timeout="${2:-60}"

	for _ in $(seq 1 "$timeout"); do
		if docker service ps "$service_name" --format '{{.CurrentState}}' 2>/dev/null | grep -q '^Running'; then
			return 0
		fi
		sleep 1
	done

	log_error "Service ${service_name} did not reach a running state in time."
	return 1
}

wait_for_postgres() {
	for _ in $(seq 1 60); do
		if docker run --rm --network "$PRIMARY_NETWORK_NAME" postgres:16 \
			pg_isready -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; then
			return 0
		fi
		sleep 1
	done

	log_error "Postgres did not become ready in time."
	return 1
}

wait_for_redis() {
	for _ in $(seq 1 30); do
		if docker run --rm --network "$PRIMARY_NETWORK_NAME" redis:7 \
			redis-cli -h "$REDIS_HOST" ping 2>/dev/null | grep -q PONG; then
			return 0
		fi
		sleep 1
	done

	log_error "Redis did not become ready in time."
	return 1
}

wait_for_app() {
	for _ in $(seq 1 90); do
		if curl -fsS "http://127.0.0.1:${APP_PORT}/health" >/dev/null 2>&1; then
			return 0
		fi
		sleep 2
	done

	log_warn "The application did not answer /health yet. It may still be starting."
	return 0
}

cleanup_existing_runtime() {
	remove_service_if_exists "$APP_SERVICE_NAME"
	remove_service_if_exists "$POSTGRES_SERVICE_NAME"
	remove_service_if_exists "$REDIS_SERVICE_NAME"

	# Remove alternate names from previous partial installs and old dokploy-based installs.
	remove_service_if_exists "atlanexis-cloudos"
	remove_service_if_exists "atlanexis-postgres"
	remove_service_if_exists "atlanexis-redis"
	remove_service_if_exists "dokploy"
	remove_service_if_exists "dokploy-postgres"
	remove_service_if_exists "dokploy-redis"
	remove_container_if_exists "$TRAEFIK_CONTAINER_NAME"
	remove_container_if_exists "atlanexis-traefik"
	remove_container_if_exists "dokploy-traefik"
}

create_postgres_service() {
	local endpoint_args=()

	if is_proxmox_lxc; then
		log_warn "Detected Proxmox LXC. Enabling DNSRR endpoint mode for service compatibility."
		endpoint_args+=(--endpoint-mode dnsrr)
	fi

	docker service create \
		--name "$POSTGRES_SERVICE_NAME" \
		--constraint 'node.role==manager' \
		--network "$PRIMARY_NETWORK_NAME" \
		--env "POSTGRES_USER=${DB_USER}" \
		--env "POSTGRES_DB=${DB_NAME}" \
		--env "POSTGRES_PASSWORD=${DB_PASS}" \
		--mount "type=volume,source=${POSTGRES_SERVICE_NAME},target=/var/lib/postgresql/data" \
		"${endpoint_args[@]}" \
		postgres:16 >/dev/null
}

create_redis_service() {
	local endpoint_args=()

	if is_proxmox_lxc; then
		endpoint_args+=(--endpoint-mode dnsrr)
	fi

	docker service create \
		--name "$REDIS_SERVICE_NAME" \
		--constraint 'node.role==manager' \
		--network "$PRIMARY_NETWORK_NAME" \
		--mount "type=volume,source=${REDIS_SERVICE_NAME},target=/data" \
		"${endpoint_args[@]}" \
		redis:7 >/dev/null
}

create_app_service() {
	local version_tag="$1"
	local advertise_addr="$2"
	local endpoint_args=()

	if is_proxmox_lxc; then
		endpoint_args+=(--endpoint-mode dnsrr)
	fi

	docker service create \
		--name "$APP_SERVICE_NAME" \
		--replicas 1 \
		--network "$PRIMARY_NETWORK_NAME" \
		--mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
		--mount "type=bind,source=${BASE_PATH},target=/etc/dokploy" \
		--mount type=volume,source=atlanexis-docker-config,target=/root/.docker \
		--publish "published=${APP_PORT},target=${APP_PORT},mode=host" \
		--constraint 'node.role==manager' \
		--env "ADVERTISE_ADDR=${advertise_addr}" \
		--env "DATABASE_URL=postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}:5432/${DB_NAME}?sslmode=disable" \
		--env "PGHOST=${DB_HOST}" \
		--env "PGPORT=5432" \
		--env "PGUSER=${DB_USER}" \
		--env "PGPASSWORD=${DB_PASS}" \
		--env "PGDATABASE=${DB_NAME}" \
		--env "REDIS_URL=redis://${REDIS_HOST}:${REDIS_PORT}" \
		--env "REDIS_HOST=${REDIS_HOST}" \
		--env "REDIS_PORT=${REDIS_PORT}" \
		--env "NODE_ENV=production" \
		--env "PORT=${APP_PORT}" \
		--env "RELEASE_TAG=${version_tag}" \
		"${endpoint_args[@]}" \
		"$DOCKER_IMAGE" >/dev/null
}

create_traefik_container() {
	local public_bindings=(
		-p "${TRAEFIK_PORT}:80/tcp"
		-p "${TRAEFIK_SSL_PORT}:443/tcp"
		-p "${TRAEFIK_HTTP3_PORT}:443/udp"
	)

	docker run -d \
		--name "$TRAEFIK_CONTAINER_NAME" \
		--restart always \
		--network "$PRIMARY_NETWORK_NAME" \
		-v "${TRAEFIK_PATH}/traefik.yml:/etc/traefik/traefik.yml" \
		-v "${DYNAMIC_TRAEFIK_PATH}:/etc/dokploy/traefik/dynamic" \
		-v /var/run/docker.sock:/var/run/docker.sock:ro \
		"${public_bindings[@]}" \
		"traefik:v${TRAEFIK_VERSION}" >/dev/null

	if ! docker network inspect "$LEGACY_NETWORK_NAME" >/dev/null 2>&1; then
		ensure_overlay_network "$LEGACY_NETWORK_NAME"
	fi

	if ! docker inspect "$TRAEFIK_CONTAINER_NAME" --format '{{json .NetworkSettings.Networks}}' | grep -q "\"${LEGACY_NETWORK_NAME}\""; then
		docker network connect "$LEGACY_NETWORK_NAME" "$TRAEFIK_CONTAINER_NAME" >/dev/null
	fi
}

format_ip_for_url() {
	local ip="$1"
	if printf "%s" "$ip" | grep -q ':'; then
		printf "[%s]" "$ip"
	else
		printf "%s" "$ip"
	fi
}

print_success_message() {
	local public_ip="$1"
	local formatted_addr
	formatted_addr="$(format_ip_for_url "$public_ip")"

	echo ""
	printf "${GREEN}%s is installed and configured.${NC}\n" "$APP_DISPLAY_NAME"
	printf "${BLUE}Main image:${NC} %s\n" "$DOCKER_IMAGE"
	printf "${BLUE}Dashboard:${NC} http://%s:%s\n" "$formatted_addr" "$APP_PORT"
	printf "${BLUE}Traefik:${NC} ports %s/%s/%s exposed on this host\n" "$TRAEFIK_PORT" "$TRAEFIK_SSL_PORT" "$TRAEFIK_HTTP3_PORT"
	echo ""
}

install_cloudos() {
	local version_tag
	local advertise_addr
	local public_ip

	version_tag="$(detect_version)"
	advertise_addr="$(get_advertise_addr)"
	public_ip="${PUBLIC_IP:-$(get_public_ip)}"

	log_info "Installing ${APP_DISPLAY_NAME} using image ${DOCKER_IMAGE}."
	log_info "Using advertise address ${advertise_addr}."

	require_linux_root
	ensure_dependencies
	ensure_image_available
	ensure_swarm "$advertise_addr"

	cleanup_existing_runtime

	ensure_overlay_network "$PRIMARY_NETWORK_NAME"
	ensure_overlay_network "$LEGACY_NETWORK_NAME"
	ensure_path_layout
	write_traefik_config

	assert_port_available "$TRAEFIK_PORT"
	assert_port_available "$TRAEFIK_SSL_PORT"
	assert_port_available "$APP_PORT"

	log_info "Creating Postgres service."
	create_postgres_service
	wait_for_service_running "$POSTGRES_SERVICE_NAME"
	wait_for_postgres

	log_info "Creating Redis service."
	create_redis_service
	wait_for_service_running "$REDIS_SERVICE_NAME"
	wait_for_redis

	log_info "Creating application service."
	create_app_service "$version_tag" "$advertise_addr"
	wait_for_service_running "$APP_SERVICE_NAME"

	log_info "Creating Traefik container."
	create_traefik_container
	wait_for_app

	if [ -z "$public_ip" ]; then
		public_ip="$advertise_addr"
	fi

	print_success_message "$public_ip"
}

update_cloudos() {
	local version_tag

	version_tag="$(detect_version)"
	require_linux_root
	ensure_dependencies
	ensure_image_available

	if ! docker service inspect "$APP_SERVICE_NAME" >/dev/null 2>&1; then
		log_error "Service ${APP_SERVICE_NAME} does not exist. Run the install command first."
		exit 1
	fi

	log_info "Updating ${APP_DISPLAY_NAME} to image ${DOCKER_IMAGE}."
	docker service update \
		--env-rm RELEASE_TAG \
		--image "$DOCKER_IMAGE" \
		--env-add "RELEASE_TAG=${version_tag}" \
		"$APP_SERVICE_NAME" >/dev/null

	wait_for_service_running "$APP_SERVICE_NAME"
	wait_for_app
	log_info "${APP_DISPLAY_NAME} has been updated."
}

case "${1:-install}" in
	update)
		update_cloudos
		;;
	install)
		install_cloudos
		;;
	*)
		log_error "Unknown command: ${1}"
		log_error "Usage: $0 [install|update]"
		exit 1
		;;
esac

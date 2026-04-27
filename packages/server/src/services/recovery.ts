import { TRPCError } from "@trpc/server";
import { parse } from "yaml";
import { db } from "@dokploy/server/db";
import { type Compose, deployCompose, findComposeById } from "./compose";
import { deployMariadb, findMariadbById } from "./mariadb";
import { deployMongo, findMongoById } from "./mongo";
import { deployMySql, findMySqlById } from "./mysql";
import { deployPostgres, findPostgresById } from "./postgres";
import { deployRedis, findRedisById } from "./redis";
import { randomizeSpecificationFile } from "../utils/docker/compose";
import { randomizeDeployableSpecificationFile } from "../utils/docker/collision";
import { loadDockerCompose, loadDockerComposeRemote } from "../utils/docker/domain";
import type {
	ComposeSpecification,
	DefinitionsService,
	DefinitionsVolume,
} from "../utils/docker/types";
import { getRemoteDocker } from "../utils/servers/remote-docker";

export type RecoveryDatabaseType =
	| "postgres"
	| "mysql"
	| "mariadb"
	| "mongo"
	| "redis";

export type RecoveryCandidateKind = "managed-database" | "compose-database";

type RecoveryMount = {
	type: string;
	mountPath: string;
	volumeName: string | null;
};

type RecoveryRecordBase = {
	kind: RecoveryCandidateKind;
	label: string;
	name: string;
	appName: string;
	dockerImage: string;
	applicationStatus: string;
	projectName: string;
	environmentName: string;
	organizationId: string;
	serverId: string | null;
	serverName: string;
};

type ManagedDatabaseRecord = RecoveryRecordBase & {
	kind: "managed-database";
	id: string;
	type: RecoveryDatabaseType;
	mounts: RecoveryMount[];
};

type ComposeDatabaseRecord = RecoveryRecordBase & {
	kind: "compose-database";
	id: string;
	type: RecoveryDatabaseType;
	composeId: string;
	composeName: string;
	serviceName: string;
	expectedVolumeNames: string[];
};

type RecoveryRecord = ManagedDatabaseRecord | ComposeDatabaseRecord;

export type RecoveryCandidateStatus =
	| "healthy"
	| "orphaned-recoverable"
	| "orphaned-missing-volume"
	| "orphaned-no-volume";

type RecoveryCandidateBase = RecoveryRecordBase & {
	status: RecoveryCandidateStatus;
	recoverable: boolean;
	servicePresent: boolean;
	existingVolumeNames: string[];
	missingVolumeNames: string[];
	expectedVolumeNames: string[];
	reason: string;
};

export type RecoveryCandidate =
	| (RecoveryCandidateBase & {
			kind: "managed-database";
			id: string;
			type: RecoveryDatabaseType;
	  })
	| (RecoveryCandidateBase & {
			kind: "compose-database";
			id: string;
			type: RecoveryDatabaseType;
			composeId: string;
			composeName: string;
			serviceName: string;
	  });

export type RecoveryTargetInput =
	| {
			kind: "managed-database";
			id: string;
			type: RecoveryDatabaseType;
	  }
	| {
			kind: "compose-database";
			composeId: string;
			serviceName: string;
	  };

type RuntimeContainer = {
	labels: Record<string, string>;
};

type RuntimeInventory = {
	serviceNames: Set<string>;
	volumeNames: Set<string>;
	containers: RuntimeContainer[];
};

const LOCAL_TARGET = "local";

const recoveryLabels: Record<RecoveryDatabaseType, string> = {
	postgres: "Postgres",
	mysql: "MySQL",
	mariadb: "MariaDB",
	mongo: "MongoDB",
	redis: "Redis",
};

const composeImageMap: Record<string, RecoveryDatabaseType> = {
	postgres: "postgres",
	postgresql: "postgres",
	mysql: "mysql",
	mariadb: "mariadb",
	mongo: "mongo",
	redis: "redis",
};

const normalizeMysqlRecords = async (): Promise<ManagedDatabaseRecord[]> => {
	const records = await db.query.mysql.findMany({
		with: {
			mounts: true,
			server: true,
			environment: {
				with: {
					project: true,
				},
			},
		},
	});

	return records.map((record) => ({
		kind: "managed-database",
		id: record.mysqlId,
		type: "mysql",
		label: recoveryLabels.mysql,
		name: record.name,
		appName: record.appName,
		dockerImage: record.dockerImage,
		applicationStatus: record.applicationStatus,
		projectName: record.environment.project.name,
		environmentName: record.environment.name,
		organizationId: record.environment.project.organizationId,
		serverId: record.serverId ?? null,
		serverName: record.server?.name ?? "Local node",
		mounts: record.mounts.map((mount) => ({
			type: mount.type,
			mountPath: mount.mountPath,
			volumeName: mount.volumeName ?? null,
		})),
	}));
};

const normalizePostgresRecords = async (): Promise<ManagedDatabaseRecord[]> => {
	const records = await db.query.postgres.findMany({
		with: {
			mounts: true,
			server: true,
			environment: {
				with: {
					project: true,
				},
			},
		},
	});

	return records.map((record) => ({
		kind: "managed-database",
		id: record.postgresId,
		type: "postgres",
		label: recoveryLabels.postgres,
		name: record.name,
		appName: record.appName,
		dockerImage: record.dockerImage,
		applicationStatus: record.applicationStatus,
		projectName: record.environment.project.name,
		environmentName: record.environment.name,
		organizationId: record.environment.project.organizationId,
		serverId: record.serverId ?? null,
		serverName: record.server?.name ?? "Local node",
		mounts: record.mounts.map((mount) => ({
			type: mount.type,
			mountPath: mount.mountPath,
			volumeName: mount.volumeName ?? null,
		})),
	}));
};

const normalizeMariadbRecords = async (): Promise<ManagedDatabaseRecord[]> => {
	const records = await db.query.mariadb.findMany({
		with: {
			mounts: true,
			server: true,
			environment: {
				with: {
					project: true,
				},
			},
		},
	});

	return records.map((record) => ({
		kind: "managed-database",
		id: record.mariadbId,
		type: "mariadb",
		label: recoveryLabels.mariadb,
		name: record.name,
		appName: record.appName,
		dockerImage: record.dockerImage,
		applicationStatus: record.applicationStatus,
		projectName: record.environment.project.name,
		environmentName: record.environment.name,
		organizationId: record.environment.project.organizationId,
		serverId: record.serverId ?? null,
		serverName: record.server?.name ?? "Local node",
		mounts: record.mounts.map((mount) => ({
			type: mount.type,
			mountPath: mount.mountPath,
			volumeName: mount.volumeName ?? null,
		})),
	}));
};

const normalizeMongoRecords = async (): Promise<ManagedDatabaseRecord[]> => {
	const records = await db.query.mongo.findMany({
		with: {
			mounts: true,
			server: true,
			environment: {
				with: {
					project: true,
				},
			},
		},
	});

	return records.map((record) => ({
		kind: "managed-database",
		id: record.mongoId,
		type: "mongo",
		label: recoveryLabels.mongo,
		name: record.name,
		appName: record.appName,
		dockerImage: record.dockerImage,
		applicationStatus: record.applicationStatus,
		projectName: record.environment.project.name,
		environmentName: record.environment.name,
		organizationId: record.environment.project.organizationId,
		serverId: record.serverId ?? null,
		serverName: record.server?.name ?? "Local node",
		mounts: record.mounts.map((mount) => ({
			type: mount.type,
			mountPath: mount.mountPath,
			volumeName: mount.volumeName ?? null,
		})),
	}));
};

const normalizeRedisRecords = async (): Promise<ManagedDatabaseRecord[]> => {
	const records = await db.query.redis.findMany({
		with: {
			mounts: true,
			server: true,
			environment: {
				with: {
					project: true,
				},
			},
		},
	});

	return records.map((record) => ({
		kind: "managed-database",
		id: record.redisId,
		type: "redis",
		label: recoveryLabels.redis,
		name: record.name,
		appName: record.appName,
		dockerImage: record.dockerImage,
		applicationStatus: record.applicationStatus,
		projectName: record.environment.project.name,
		environmentName: record.environment.name,
		organizationId: record.environment.project.organizationId,
		serverId: record.serverId ?? null,
		serverName: record.server?.name ?? "Local node",
		mounts: record.mounts.map((mount) => ({
			type: mount.type,
			mountPath: mount.mountPath,
			volumeName: mount.volumeName ?? null,
		})),
	}));
};

const parseComposeSpecification = (
	composeFile: string | null | undefined,
): ComposeSpecification | null => {
	if (!composeFile) {
		return null;
	}

	try {
		return parse(composeFile) as ComposeSpecification;
	} catch {
		return null;
	}
};

const prepareComposeSpecification = (
	compose: Compose,
	composeSpec: ComposeSpecification,
) => {
	const deploymentSuffix = compose.suffix || compose.appName;

	if (compose.isolatedDeployment) {
		return randomizeDeployableSpecificationFile(
			composeSpec,
			compose.isolatedDeploymentsVolume,
			deploymentSuffix,
		);
	}

	if (compose.randomize) {
		return randomizeSpecificationFile(composeSpec, compose.suffix);
	}

	return composeSpec;
};

const loadRecoveryComposeSpecification = async (
	composeRecord: Compose,
): Promise<ComposeSpecification | null> => {
	const inlineCompose = parseComposeSpecification(composeRecord.composeFile);
	if (inlineCompose) {
		return prepareComposeSpecification(composeRecord, inlineCompose);
	}

	const composeSpec = composeRecord.serverId
		? await loadDockerComposeRemote(composeRecord)
		: await loadDockerCompose(composeRecord);

	if (!composeSpec) {
		return null;
	}

	return prepareComposeSpecification(composeRecord, composeSpec);
};

const normalizeComposeImageName = (image: string) => {
	const withoutDigest = image.split("@")[0] ?? image;
	const repository = withoutDigest.split("/").pop() ?? withoutDigest;
	return (repository.split(":")[0] ?? repository).toLowerCase();
};

const getComposeDatabaseType = (
	image: string | null | undefined,
): RecoveryDatabaseType | null => {
	if (!image) {
		return null;
	}

	const normalized = normalizeComposeImageName(image);
	return composeImageMap[normalized] ?? null;
};

const isNamedVolumeSource = (source: string) =>
	Boolean(source) &&
	!source.startsWith(".") &&
	!source.startsWith("/") &&
	!source.startsWith("$");

const getServiceVolumeSource = (volume: unknown): string | null => {
	if (typeof volume === "string") {
		const source = volume.split(":")[0] ?? "";
		if (!source || !isNamedVolumeSource(source)) {
			return null;
		}
		return source;
	}

	if (!volume || typeof volume !== "object") {
		return null;
	}

	const typedVolume = volume as {
		type?: string;
		source?: string;
	};
	if (!typedVolume.source || !isNamedVolumeSource(typedVolume.source)) {
		return null;
	}

	if (typedVolume.type && typedVolume.type !== "volume") {
		return null;
	}

	return typedVolume.source;
};

const resolveComposeVolumeName = (
	composeRecord: Compose,
	rootVolumes: Record<string, DefinitionsVolume> | undefined,
	source: string,
) => {
	const baseSource = source.split("/")[0] ?? source;
	const volumeDefinition = rootVolumes?.[baseSource];

	if (volumeDefinition?.name) {
		return volumeDefinition.name;
	}

	if (
		typeof volumeDefinition?.external === "object" &&
		volumeDefinition.external?.name
	) {
		return volumeDefinition.external.name;
	}

	if (volumeDefinition?.external === true) {
		return baseSource;
	}

	return `${composeRecord.appName}_${baseSource}`;
};

const getComposeServiceVolumes = (
	composeRecord: Compose,
	composeSpec: ComposeSpecification,
	service: DefinitionsService,
) => {
	const volumes = Array.isArray(service.volumes) ? service.volumes : [];
	const expectedVolumes = volumes
		.map((volume) => getServiceVolumeSource(volume))
		.filter((source): source is string => Boolean(source))
		.map((source) =>
			resolveComposeVolumeName(
				composeRecord,
				composeSpec.volumes as Record<string, DefinitionsVolume> | undefined,
				source,
			),
		);

	return [...new Set(expectedVolumes)];
};

const normalizeComposeDatabaseRecords = async (): Promise<
	ComposeDatabaseRecord[]
> => {
	const records = await db.query.compose.findMany({
		with: {
			server: true,
			environment: {
				with: {
					project: true,
				},
			},
		},
	});

	const nestedRecords = await Promise.all(
		records.map(async (record) => {
			const composeSpec = await loadRecoveryComposeSpecification(record as Compose);
			if (!composeSpec?.services) {
				return [];
			}

			return Object.entries(composeSpec.services).flatMap(
				([serviceName, service]) => {
					const image = service.image;
					if (typeof image !== "string") {
						return [];
					}

					const databaseType = getComposeDatabaseType(image);
					if (!databaseType) {
						return [];
					}

					return [
						{
							kind: "compose-database" as const,
							id: `${record.composeId}:${serviceName}`,
							type: databaseType,
							label: recoveryLabels[databaseType],
							name: serviceName,
							appName: record.appName,
							dockerImage: image,
							applicationStatus: record.composeStatus,
							projectName: record.environment.project.name,
							environmentName: record.environment.name,
							organizationId: record.environment.project.organizationId,
							serverId: record.serverId ?? null,
							serverName: record.server?.name ?? "Local node",
							composeId: record.composeId,
							composeName: record.name,
							serviceName,
							expectedVolumeNames: getComposeServiceVolumes(
								record as Compose,
								composeSpec,
								service,
							),
						},
					];
				},
			);
		}),
	);

	return nestedRecords.flat();
};

const getManagedDatabaseRecords = async (): Promise<ManagedDatabaseRecord[]> => {
	const [mysqlRecords, postgresRecords, mariadbRecords, mongoRecords, redisRecords] =
		await Promise.all([
			normalizeMysqlRecords(),
			normalizePostgresRecords(),
			normalizeMariadbRecords(),
			normalizeMongoRecords(),
			normalizeRedisRecords(),
		]);

	return [
		...mysqlRecords,
		...postgresRecords,
		...mariadbRecords,
		...mongoRecords,
		...redisRecords,
	];
};

const getInventoryTargetKey = (serverId: string | null) => serverId ?? LOCAL_TARGET;

const buildRuntimeInventory = async (
	serverId: string | null,
): Promise<RuntimeInventory> => {
	const docker = await getRemoteDocker(serverId);
	const [services, volumes, containers] = await Promise.all([
		docker.listServices(),
		docker.listVolumes(),
		docker.listContainers(),
	]);

	const serviceNames = new Set(
		services
			.map((service) => service.Spec?.Name)
			.filter((name): name is string => Boolean(name)),
	);
	const volumeNames = new Set(
		(volumes.Volumes ?? [])
			.map((volume) => volume.Name)
			.filter((name): name is string => Boolean(name)),
	);

	return {
		serviceNames,
		volumeNames,
		containers: containers.map((container) => ({
			labels: container.Labels ?? {},
		})),
	};
};

const getExpectedVolumeNames = (record: RecoveryRecord) => {
	if (record.kind === "compose-database") {
		return record.expectedVolumeNames;
	}

	return record.mounts
		.filter((mount) => mount.type === "volume" && mount.volumeName)
		.map((mount) => mount.volumeName as string);
};

const hasComposeRuntimeService = (
	record: ComposeDatabaseRecord,
	inventory: RuntimeInventory,
) => {
	return inventory.containers.some((container) => {
		const labels = container.labels;

		if (labels["com.docker.compose.project"] === record.appName) {
			return labels["com.docker.compose.service"] === record.serviceName;
		}

		if (labels["com.docker.stack.namespace"] === record.appName) {
			return (
				labels["com.docker.swarm.service.name"] ===
				`${record.appName}_${record.serviceName}`
			);
		}

		return false;
	});
};

const buildHealthyReason = (record: RecoveryRecord) => {
	if (record.kind === "compose-database") {
		return `Database container "${record.serviceName}" is present inside compose app "${record.composeName}".`;
	}

	return "Runtime service is present.";
};

const buildRecoverableReason = (record: RecoveryRecord) => {
	if (record.kind === "compose-database") {
		return `Database container "${record.serviceName}" is missing and the compose app can be redeployed with the existing named volumes.`;
	}

	return "Runtime service is missing and all required named volumes are available for recovery.";
};

const buildMissingVolumeReason = (record: RecoveryRecord) => {
	if (record.kind === "compose-database") {
		return `Database container "${record.serviceName}" is missing, but one or more required named volumes for compose app "${record.composeName}" are unavailable.`;
	}

	return "Runtime service is missing, but one or more required named volumes are unavailable.";
};

const buildNoVolumeReason = (record: RecoveryRecord) => {
	if (record.kind === "compose-database") {
		return `Database container "${record.serviceName}" is missing and the compose service has no named volumes to reuse during a full stack redeploy.`;
	}

	return "Runtime service is missing and the platform record has no named volumes to reuse.";
};

const buildRecoveryCandidate = (
	record: RecoveryRecord,
	inventory: RuntimeInventory,
): RecoveryCandidate => {
	const expectedVolumeNames = getExpectedVolumeNames(record);
	const existingVolumeNames = expectedVolumeNames.filter((volumeName) =>
		inventory.volumeNames.has(volumeName),
	);
	const missingVolumeNames = expectedVolumeNames.filter(
		(volumeName) => !inventory.volumeNames.has(volumeName),
	);
	const servicePresent =
		record.kind === "compose-database"
			? hasComposeRuntimeService(record, inventory)
			: inventory.serviceNames.has(record.appName);

	if (servicePresent) {
		return {
			...record,
			status: "healthy",
			recoverable: false,
			servicePresent: true,
			existingVolumeNames,
			missingVolumeNames,
			expectedVolumeNames,
			reason: buildHealthyReason(record),
		};
	}

	if (expectedVolumeNames.length === 0) {
		return {
			...record,
			status: "orphaned-no-volume",
			recoverable: false,
			servicePresent: false,
			existingVolumeNames,
			missingVolumeNames,
			expectedVolumeNames,
			reason: buildNoVolumeReason(record),
		};
	}

	if (missingVolumeNames.length > 0) {
		return {
			...record,
			status: "orphaned-missing-volume",
			recoverable: false,
			servicePresent: false,
			existingVolumeNames,
			missingVolumeNames,
			expectedVolumeNames,
			reason: buildMissingVolumeReason(record),
		};
	}

	return {
		...record,
		status: "orphaned-recoverable",
		recoverable: true,
		servicePresent: false,
		existingVolumeNames,
		missingVolumeNames,
		expectedVolumeNames,
		reason: buildRecoverableReason(record),
	};
};

const loadRuntimeInventoryMap = async (records: RecoveryRecord[]) => {
	const inventoryEntries = await Promise.all(
		Array.from(
			new Set(records.map((record) => getInventoryTargetKey(record.serverId))),
		).map(async (targetKey) => {
			const inventory = await buildRuntimeInventory(
				targetKey === LOCAL_TARGET ? null : targetKey,
			);

			return [targetKey, inventory] as const;
		}),
	);

	return new Map<string, RuntimeInventory>(inventoryEntries);
};

const sortCandidates = (candidates: RecoveryCandidate[]) => {
	const statusOrder: Record<RecoveryCandidateStatus, number> = {
		"orphaned-recoverable": 0,
		"orphaned-missing-volume": 1,
		"orphaned-no-volume": 2,
		healthy: 3,
	};

	return candidates.sort((left, right) => {
		const statusComparison =
			statusOrder[left.status] - statusOrder[right.status];
		if (statusComparison !== 0) {
			return statusComparison;
		}

		const appComparison = left.appName.localeCompare(right.appName);
		if (appComparison !== 0) {
			return appComparison;
		}

		return left.name.localeCompare(right.name);
	});
};

export const scanRecoveryTargets = async (
	organizationId: string,
	target?: string,
) => {
	const [managedRecords, composeRecords] = await Promise.all([
		getManagedDatabaseRecords(),
		normalizeComposeDatabaseRecords(),
	]);

	const records = [...managedRecords, ...composeRecords].filter((record) => {
		if (record.organizationId !== organizationId) {
			return false;
		}

		if (!target) {
			return true;
		}

		if (target === LOCAL_TARGET) {
			return record.serverId === null;
		}

		return record.serverId === target;
	});

	const inventoryMap = await loadRuntimeInventoryMap(records);
	const candidates = sortCandidates(
		records.map((record) =>
			buildRecoveryCandidate(
				record,
				inventoryMap.get(getInventoryTargetKey(record.serverId)) as RuntimeInventory,
			),
		),
	);

	return {
		target: target ?? "all",
		summary: {
			total: candidates.length,
			healthy: candidates.filter((candidate) => candidate.status === "healthy")
				.length,
			recoverable: candidates.filter((candidate) => candidate.recoverable).length,
			missingVolume: candidates.filter(
				(candidate) => candidate.status === "orphaned-missing-volume",
			).length,
			noVolume: candidates.filter(
				(candidate) => candidate.status === "orphaned-no-volume",
			).length,
		},
		candidates,
	};
};

const getManagedDatabaseRecordByTarget = async (
	type: RecoveryDatabaseType,
	id: string,
): Promise<ManagedDatabaseRecord> => {
	if (type === "mysql") {
		const database = await findMySqlById(id);
		return {
			kind: "managed-database",
			id: database.mysqlId,
			type: "mysql",
			label: recoveryLabels.mysql,
			name: database.name,
			appName: database.appName,
			dockerImage: database.dockerImage,
			applicationStatus: database.applicationStatus,
			projectName: database.environment.project.name,
			environmentName: database.environment.name,
			organizationId: database.environment.project.organizationId,
			serverId: database.serverId ?? null,
			serverName: database.server?.name ?? "Local node",
			mounts: database.mounts.map((mount) => ({
				type: mount.type,
				mountPath: mount.mountPath,
				volumeName: mount.volumeName ?? null,
			})),
		};
	}

	if (type === "postgres") {
		const database = await findPostgresById(id);
		return {
			kind: "managed-database",
			id: database.postgresId,
			type: "postgres",
			label: recoveryLabels.postgres,
			name: database.name,
			appName: database.appName,
			dockerImage: database.dockerImage,
			applicationStatus: database.applicationStatus,
			projectName: database.environment.project.name,
			environmentName: database.environment.name,
			organizationId: database.environment.project.organizationId,
			serverId: database.serverId ?? null,
			serverName: database.server?.name ?? "Local node",
			mounts: database.mounts.map((mount) => ({
				type: mount.type,
				mountPath: mount.mountPath,
				volumeName: mount.volumeName ?? null,
			})),
		};
	}

	if (type === "mariadb") {
		const database = await findMariadbById(id);
		return {
			kind: "managed-database",
			id: database.mariadbId,
			type: "mariadb",
			label: recoveryLabels.mariadb,
			name: database.name,
			appName: database.appName,
			dockerImage: database.dockerImage,
			applicationStatus: database.applicationStatus,
			projectName: database.environment.project.name,
			environmentName: database.environment.name,
			organizationId: database.environment.project.organizationId,
			serverId: database.serverId ?? null,
			serverName: database.server?.name ?? "Local node",
			mounts: database.mounts.map((mount) => ({
				type: mount.type,
				mountPath: mount.mountPath,
				volumeName: mount.volumeName ?? null,
			})),
		};
	}

	if (type === "mongo") {
		const database = await findMongoById(id);
		return {
			kind: "managed-database",
			id: database.mongoId,
			type: "mongo",
			label: recoveryLabels.mongo,
			name: database.name,
			appName: database.appName,
			dockerImage: database.dockerImage,
			applicationStatus: database.applicationStatus,
			projectName: database.environment.project.name,
			environmentName: database.environment.name,
			organizationId: database.environment.project.organizationId,
			serverId: database.serverId ?? null,
			serverName: database.server?.name ?? "Local node",
			mounts: database.mounts.map((mount) => ({
				type: mount.type,
				mountPath: mount.mountPath,
				volumeName: mount.volumeName ?? null,
			})),
		};
	}

	const database = await findRedisById(id);
	return {
		kind: "managed-database",
		id: database.redisId,
		type: "redis",
		label: recoveryLabels.redis,
		name: database.name,
		appName: database.appName,
		dockerImage: database.dockerImage,
		applicationStatus: database.applicationStatus,
		projectName: database.environment.project.name,
		environmentName: database.environment.name,
		organizationId: database.environment.project.organizationId,
		serverId: database.serverId ?? null,
		serverName: database.server?.name ?? "Local node",
		mounts: database.mounts.map((mount) => ({
			type: mount.type,
			mountPath: mount.mountPath,
			volumeName: mount.volumeName ?? null,
		})),
	};
};

const getComposeDatabaseRecordByTarget = async (
	composeId: string,
	serviceName: string,
): Promise<ComposeDatabaseRecord> => {
	const compose = await findComposeById(composeId);
	const composeSpec = await loadRecoveryComposeSpecification(compose as Compose);

	if (!composeSpec?.services?.[serviceName]) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Compose database service not found",
		});
	}

	const service = composeSpec.services[serviceName];
	const image = service.image;
	if (typeof image !== "string") {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Compose database image not found",
		});
	}

	const databaseType = getComposeDatabaseType(image);
	if (!databaseType) {
		throw new TRPCError({
			code: "NOT_FOUND",
			message: "Compose service is not a supported database",
		});
	}

	return {
		kind: "compose-database",
		id: `${compose.composeId}:${serviceName}`,
		type: databaseType,
		label: recoveryLabels[databaseType],
		name: serviceName,
		appName: compose.appName,
		dockerImage: image,
		applicationStatus: compose.composeStatus,
		projectName: compose.environment.project.name,
		environmentName: compose.environment.name,
		organizationId: compose.environment.project.organizationId,
		serverId: compose.serverId ?? null,
		serverName: compose.server?.name ?? "Local node",
		composeId: compose.composeId,
		composeName: compose.name,
		serviceName,
		expectedVolumeNames: getComposeServiceVolumes(
			compose as Compose,
			composeSpec,
			service,
		),
	};
};

export const getRecoveryCandidate = async (
	target: RecoveryTargetInput,
): Promise<RecoveryCandidate> => {
	const record =
		target.kind === "managed-database"
			? await getManagedDatabaseRecordByTarget(target.type, target.id)
			: await getComposeDatabaseRecordByTarget(
					target.composeId,
					target.serviceName,
				);

	const inventory = await buildRuntimeInventory(record.serverId);
	return buildRecoveryCandidate(record, inventory);
};

export const recoverRecoveryTarget = async (target: RecoveryTargetInput) => {
	if (target.kind === "managed-database") {
		if (target.type === "mysql") {
			return deployMySql(target.id);
		}

		if (target.type === "postgres") {
			return deployPostgres(target.id);
		}

		if (target.type === "mariadb") {
			return deployMariadb(target.id);
		}

		if (target.type === "mongo") {
			return deployMongo(target.id);
		}

		return deployRedis(target.id);
	}

	return deployCompose({
		composeId: target.composeId,
		titleLog: "Recovery service redeploy",
		descriptionLog: `Recovery Service redeployed the compose app to restore database service "${target.serviceName}".`,
	});
};

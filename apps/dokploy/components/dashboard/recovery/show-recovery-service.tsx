"use client";

import {
	CheckCircle2,
	HardDrive,
	LifeBuoy,
	Loader2,
	RefreshCcw,
	Server,
	TriangleAlert,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AlertBlock } from "@/components/shared/alert-block";
import { DialogAction } from "@/components/shared/dialog-action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { api, type RouterOutputs } from "@/utils/api";

type RecoveryScan = RouterOutputs["recovery"]["scan"];
type RecoveryCandidate = RecoveryScan["candidates"][number];

const LOCAL_TARGET = "local";

const statusMeta: Record<
	RecoveryCandidate["status"],
	{ label: string; className: string }
> = {
	healthy: {
		label: "Healthy",
		className:
			"border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
	},
	"orphaned-recoverable": {
		label: "Recoverable",
		className:
			"border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
	},
	"orphaned-missing-volume": {
		label: "Missing volume",
		className:
			"border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
	},
	"orphaned-no-volume": {
		label: "No named volume",
		className:
			"border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300",
	},
};

const summaryCards = (scan?: RecoveryScan) => [
	{
		label: "Recovery targets",
		value: scan?.summary.total ?? 0,
		icon: Server,
	},
	{
		label: "Recoverable",
		value: scan?.summary.recoverable ?? 0,
		icon: LifeBuoy,
	},
	{
		label: "Missing volumes",
		value: scan?.summary.missingVolume ?? 0,
		icon: TriangleAlert,
	},
	{
		label: "Healthy",
		value: scan?.summary.healthy ?? 0,
		icon: CheckCircle2,
	},
];

export const ShowRecoveryService = () => {
	const { data: servers = [] } = api.server.all.useQuery();
	const { data: isCloud } = api.settings.isCloud.useQuery();
	const [target, setTarget] = useState("");

	useEffect(() => {
		if (target) {
			return;
		}

		if (isCloud === false) {
			setTarget(LOCAL_TARGET);
			return;
		}

		if (servers[0]?.serverId) {
			setTarget(servers[0].serverId);
		}
	}, [isCloud, servers, target]);

	const scan = api.recovery.scan.useQuery(
		{ target },
		{
			enabled: target.length > 0,
		},
	);
	const recover = api.recovery.recover.useMutation({
		onSuccess: async () => {
			toast.success("Recovery action completed successfully.");
			await scan.refetch();
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const targetOptions = [
		...(isCloud === false
			? [{ value: LOCAL_TARGET, label: "Local node" }]
			: []),
		...servers.map((server) => ({
			value: server.serverId,
			label: server.name,
		})),
	];

	const scanResults = scan.data?.candidates ?? [];
	const getCandidateKey = (candidate: RecoveryCandidate) =>
		candidate.kind === "managed-database"
			? `managed-database:${candidate.type}:${candidate.id}`
			: `compose-database:${candidate.composeId}:${candidate.serviceName}`;
	const recoveringKey = recover.variables
		? recover.variables.kind === "managed-database"
			? `managed-database:${recover.variables.type}:${recover.variables.id}`
			: `compose-database:${recover.variables.composeId}:${recover.variables.serviceName}`
		: null;
	const hasTarget = target.length > 0;

	return (
		<div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
			<Card className="rounded-xl border-border/70">
				<CardHeader className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
					<div className="space-y-2">
						<CardTitle className="flex items-center gap-2 text-xl">
							<LifeBuoy className="size-5 text-primary" />
							Recovery Service
						</CardTitle>
						<CardDescription>
							Scan managed database services and compose-backed database
							services, detect missing runtime resources, and recover them by
							reusing the named volumes already attached to the platform.
						</CardDescription>
					</div>

					<div className="flex w-full flex-col gap-2 md:w-auto md:min-w-80">
						<Select onValueChange={setTarget} value={target}>
							<SelectTrigger>
								<SelectValue placeholder="Select a recovery target" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Targets</SelectLabel>
									{targetOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
						<Button
							className="gap-2"
							disabled={!target || scan.isFetching}
							onClick={() => {
								void scan.refetch();
							}}
							variant="outline"
						>
							{scan.isFetching ? (
								<Loader2 className="size-4 animate-spin" />
							) : (
								<RefreshCcw className="size-4" />
							)}
							Rescan target
						</Button>
					</div>
				</CardHeader>
				<CardContent className="space-y-4">
					<AlertBlock type="info">
						Recovery Service can rebuild first-class database services and
						redeploy managed compose apps when one of their database services is
						missing. It still does not adopt unmanaged Docker or Compose
						databases.
					</AlertBlock>

					{targetOptions.length === 0 && (
						<AlertBlock type="warning">
							There are no recovery targets available yet. Add a server or use
							the local node deployment flow first.
						</AlertBlock>
					)}
				</CardContent>
			</Card>

			<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
				{summaryCards(scan.data).map((item) => {
					const Icon = item.icon;
					return (
						<Card key={item.label} className="rounded-xl border-border/70">
							<CardContent className="flex items-center justify-between p-5">
								<div className="space-y-1">
									<p className="text-sm text-muted-foreground">{item.label}</p>
									<p className="text-2xl font-semibold">{item.value}</p>
								</div>
								<Icon className="size-5 text-muted-foreground" />
							</CardContent>
						</Card>
					);
				})}
			</div>

			<Card className="rounded-xl border-border/70">
				<CardHeader>
					<CardTitle>Dry Run</CardTitle>
					<CardDescription>
						Each result shows the current runtime state and whether the platform
						can safely recreate the service from its saved record.
					</CardDescription>
				</CardHeader>
				<CardContent>
					{!hasTarget ? (
						<div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
							Select a recovery target to start the dry run.
						</div>
					) : scan.isLoading ? (
						<div className="flex min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground">
							<Loader2 className="size-4 animate-spin" />
							Scanning recovery target...
						</div>
					) : scanResults.length === 0 ? (
						<div className="flex min-h-40 items-center justify-center text-sm text-muted-foreground">
							No recoverable database targets were found for this target.
						</div>
					) : (
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Database</TableHead>
										<TableHead>Target</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Volumes</TableHead>
										<TableHead>Reason</TableHead>
										<TableHead className="text-right">Action</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{scanResults.map((candidate) => {
										const status = statusMeta[candidate.status];
										const rowKey = getCandidateKey(candidate);
										const isRecovering = recoveringKey === rowKey;
										const actionLabel =
											candidate.kind === "compose-database"
												? "Redeploy stack"
												: "Recover";
										const dialogTitle =
											candidate.kind === "compose-database"
												? `Redeploy ${candidate.composeName}?`
												: `Recover ${candidate.name}?`;
										const dialogDescription =
											candidate.kind === "compose-database"
												? `This will redeploy the compose app "${candidate.composeName}" to restore the database service "${candidate.serviceName}" using the existing named volumes already present on ${candidate.serverName}.`
												: `This will recreate the ${candidate.label} service "${candidate.appName}" using the existing named volumes already present on ${candidate.serverName}.`;

										return (
											<TableRow key={rowKey}>
												<TableCell className="min-w-64 align-top">
													<div className="flex flex-col gap-1">
														<div className="flex items-center gap-2">
															<span className="font-medium">{candidate.name}</span>
															<Badge variant="outline">{candidate.label}</Badge>
															{candidate.kind === "compose-database" && (
																<Badge variant="secondary">Compose app</Badge>
															)}
														</div>
														{candidate.kind === "compose-database" && (
															<span className="text-xs text-muted-foreground">
																Parent compose: {candidate.composeName}
															</span>
														)}
														<span className="font-mono text-xs text-muted-foreground">
															{candidate.appName}
														</span>
														<span className="text-xs text-muted-foreground">
															{candidate.projectName} / {candidate.environmentName}
														</span>
														<span className="text-xs text-muted-foreground">
															{candidate.dockerImage}
														</span>
													</div>
												</TableCell>
												<TableCell className="min-w-44 align-top">
													<div className="flex items-center gap-2 text-sm">
														<Server className="size-4 text-muted-foreground" />
														<span>{candidate.serverName}</span>
													</div>
												</TableCell>
												<TableCell className="align-top">
													<Badge
														className={cn(
															"border font-medium",
															status.className,
														)}
														variant="outline"
													>
														{status.label}
													</Badge>
												</TableCell>
												<TableCell className="min-w-64 align-top">
													<div className="flex flex-col gap-2">
														<div className="flex flex-wrap gap-2">
															{candidate.expectedVolumeNames.length === 0 ? (
																<span className="text-sm text-muted-foreground">
																	No named volumes
																</span>
															) : (
																candidate.expectedVolumeNames.map((volumeName) => {
																	const present =
																		candidate.existingVolumeNames.includes(volumeName);
																	return (
																		<Badge
																			key={volumeName}
																			className={cn(
																				"gap-1 border",
																				present
																					? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
																					: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
																			)}
																			variant="outline"
																		>
																			<HardDrive className="size-3" />
																			{volumeName}
																		</Badge>
																	);
																})
															)}
														</div>
													</div>
												</TableCell>
												<TableCell className="min-w-80 align-top text-sm text-muted-foreground">
													{candidate.reason}
												</TableCell>
												<TableCell className="text-right align-top">
													{candidate.recoverable ? (
														<DialogAction
															description={dialogDescription}
															onClick={() => {
																if (candidate.kind === "compose-database") {
																	recover.mutate({
																		kind: "compose-database",
																		composeId: candidate.composeId,
																		serviceName: candidate.serviceName,
																	});
																	return;
																}

																recover.mutate({
																	kind: "managed-database",
																	id: candidate.id,
																	type: candidate.type,
																});
															}}
															title={dialogTitle}
															type="default"
														>
															<Button
																className="gap-2"
																disabled={isRecovering}
																size="sm"
															>
																{isRecovering ? (
																	<Loader2 className="size-4 animate-spin" />
																) : (
																	<LifeBuoy className="size-4" />
																)}
																{actionLabel}
															</Button>
														</DialogAction>
													) : (
														<span className="text-sm text-muted-foreground">
															{candidate.servicePresent
																? "Already healthy"
																: "Not recoverable"}
														</span>
													)}
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

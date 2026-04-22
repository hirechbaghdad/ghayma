"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	BookText,
	CheckIcon,
	ChevronsUpDown,
	Globe,
	HelpCircle,
	LayoutGrid,
	List,
	Loader2,
	SearchIcon,
	Store,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { GithubIcon } from "@/components/icons/data-tools-icons";
import { AlertBlock } from "@/components/shared/alert-block";
import { BreadcrumbSidebar } from "@/components/shared/breadcrumb-sidebar";
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
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
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
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";

const TEMPLATE_BASE_URL_KEY = "dokploy_template_base_url";

const MarketplaceProjectSchema = z.object({
	targetMode: z.enum(["new", "existing"]),
	projectName: z
		.string()
		.min(1, "Project name is required")
		.refine(
			(name) => {
				const trimmedName = name.trim();
				const validNameRegex =
					/^[\p{L}\p{N}_-][\p{L}\p{N}\s_.-]*[\p{L}\p{N}_-]$/u;
				return validNameRegex.test(trimmedName);
			},
			{
				message:
					"Project name must start and end with a letter, number, hyphen or underscore. Spaces are allowed in between.",
			},
		)
		.refine((name) => !/^\d/.test(name.trim()), {
			message: "Project name cannot start with a number",
		})
		.transform((name) => name.trim())
		.optional()
		.or(z.literal("")),
	projectId: z.string().optional(),
});

type MarketplaceProjectForm = z.infer<typeof MarketplaceProjectSchema>;

type TemplateItem = {
	id: string;
	name: string;
	description: string;
	logo?: string;
	version?: string;
	tags: string[];
	links?: {
		github?: string;
		website?: string;
		docs?: string;
	};
};

export const ShowMarketplace = () => {
	const router = useRouter();
	const utils = api.useUtils();
	const [viewMode, setViewMode] = useState<"detailed" | "icon">("detailed");
	const [query, setQuery] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [serverId, setServerId] = useState<string | undefined>(undefined);
	const [selectedTemplate, setSelectedTemplate] = useState<TemplateItem | null>(
		null,
	);
	const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);
	const [customBaseUrl, setCustomBaseUrl] = useState<string | undefined>(() => {
		if (typeof window !== "undefined") {
			return localStorage.getItem(TEMPLATE_BASE_URL_KEY) || undefined;
		}
		return undefined;
	});

	const { data: isCloud } = api.settings.isCloud.useQuery();
	const { data: auth } = api.user.get.useQuery();
	const { data: servers } = api.server.withSSHKey.useQuery();
	const { data: projects } = api.project.all.useQuery(undefined, {
		enabled: auth?.role === "owner" || auth?.canCreateServices,
	});
	const {
		data,
		isLoading: isLoadingTemplates,
		error: errorTemplates,
		isError: isErrorTemplates,
	} = api.compose.templates.useQuery({ baseUrl: customBaseUrl });
	const { data: tags, isLoading: isLoadingTags } = api.compose.getTags.useQuery({
		baseUrl: customBaseUrl,
	});
	const { mutateAsync: deployTemplate, isLoading: isDeployingTemplate } =
		api.compose.deployTemplate.useMutation();
	const { mutateAsync: createProject, isLoading: isCreatingProject } =
		api.project.create.useMutation();

	const form = useForm<MarketplaceProjectForm>({
		defaultValues: {
			targetMode: "existing",
			projectId: "",
			projectName: "",
		},
		resolver: zodResolver(MarketplaceProjectSchema.superRefine((data, ctx) => {
			if (data.targetMode === "new" && !data.projectName?.trim()) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["projectName"],
					message: "Project name is required",
				});
			}

			if (data.targetMode === "existing" && !data.projectId) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ["projectId"],
					message: "Select a project",
				});
			}
		})),
	});

	const targetMode = form.watch("targetMode");

	useEffect(() => {
		if (customBaseUrl) {
			localStorage.setItem(TEMPLATE_BASE_URL_KEY, customBaseUrl);
		} else {
			localStorage.removeItem(TEMPLATE_BASE_URL_KEY);
		}
	}, [customBaseUrl]);

	useEffect(() => {
		if (!isDeployDialogOpen) {
			form.reset({
				targetMode: "existing",
				projectId: "",
				projectName: "",
			});
			if (!isCloud) {
				setServerId("dokploy");
			} else {
				setServerId(undefined);
			}
		}
	}, [form, isCloud, isDeployDialogOpen]);

	const templates =
		data?.filter((template) => {
			const matchesTags =
				selectedTags.length === 0 ||
				template.tags.some((tag) => selectedTags.includes(tag));
			const matchesQuery =
				query === "" ||
				template.name.toLowerCase().includes(query.toLowerCase()) ||
				template.description.toLowerCase().includes(query.toLowerCase());
			return matchesTags && matchesQuery;
		}) || [];

	const availableProjects =
		projects?.filter((project) => project.environments?.[0]?.environmentId) || [];

	useEffect(() => {
		if (!isDeployDialogOpen) return;
		if (availableProjects.length > 0) return;
		if (form.getValues("targetMode") === "new") return;

		form.setValue("targetMode", "new");
	}, [availableProjects.length, form, isDeployDialogOpen]);

	const hasServers = !!servers && servers.length > 0;
	const shouldShowServerDropdown = hasServers;

	const handleOpenTemplateDialog = (template: TemplateItem) => {
		setSelectedTemplate(template);
		setIsDeployDialogOpen(true);
	};

	const onSubmit = async (values: MarketplaceProjectForm) => {
		if (!selectedTemplate) {
			return;
		}

		const promise = (async () => {
			let targetProjectId = values.projectId;
			let targetEnvironmentId =
				availableProjects.find((project) => project.projectId === values.projectId)
					?.environments?.[0]?.environmentId || "";

			if (values.targetMode === "new") {
				const created = await createProject({
					name: values.projectName?.trim() || "",
					description: "",
					projectId: "",
				});

				targetProjectId = created.project.projectId;
				targetEnvironmentId = created.environment.environmentId;
			}

			if (!targetEnvironmentId) {
				throw new Error("No environment available for the selected project");
			}

			const compose = await deployTemplate({
				serverId: serverId === "dokploy" ? undefined : serverId,
				environmentId: targetEnvironmentId,
				id: selectedTemplate.id,
				baseUrl: customBaseUrl,
			});

			await Promise.all([
				utils.project.all.invalidate(),
				utils.environment.one.invalidate({ environmentId: targetEnvironmentId }),
			]);

			setIsDeployDialogOpen(false);
			setSelectedTemplate(null);

			await router.push(
				`/dashboard/project/${targetProjectId}/environment/${targetEnvironmentId}`,
			);

			return compose;
		})();

		toast.promise(promise, {
			loading:
				values.targetMode === "new"
					? `Creating project and deploying ${selectedTemplate.name}...`
					: `Deploying ${selectedTemplate.name}...`,
			success: () => `${selectedTemplate.name} added successfully`,
			error: (error) =>
				error instanceof Error
					? error.message
					: `An error occurred deploying ${selectedTemplate.name}`,
		});
	};

	return (
		<>
			<BreadcrumbSidebar
				list={[{ name: "Marketplace", href: "/dashboard/marketplace" }]}
			/>
			<div className="w-full">
				<Card className="rounded-xl bg-sidebar p-2.5">
					<div className="rounded-xl bg-background shadow-md">
						<div className="flex w-full flex-wrap items-center justify-between gap-4 p-6">
							<CardHeader className="p-0">
								<CardTitle className="flex flex-row gap-2 text-xl">
									<Store className="size-6 self-center text-muted-foreground" />
									Marketplace
								</CardTitle>
								<CardDescription>
									Browse ready-to-run templates and deploy them into a new or
									existing resource group.
								</CardDescription>
							</CardHeader>
							<div className="rounded-full border border-border/70 bg-card/70 px-3 py-2 text-xs font-medium text-muted-foreground">
								{templates.length} templates available
							</div>
						</div>

						<CardContent className="flex min-h-[60vh] flex-col gap-4 border-t py-8">
							<div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
								<div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center">
									<Input
										placeholder="Search marketplace"
										onChange={(e) => setQuery(e.target.value)}
										className="w-full sm:max-w-md"
										value={query}
									/>
									<Input
										placeholder="Base URL (optional)"
										onChange={(e) =>
											setCustomBaseUrl(e.target.value || undefined)
										}
										className="w-full sm:max-w-sm"
										value={customBaseUrl || ""}
									/>
								</div>

								<div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end xl:w-auto">
									<Popover modal={true}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													"w-full justify-between !bg-input sm:w-[220px]",
												)}
											>
												{isLoadingTags
													? "Loading..."
													: selectedTags.length > 0
														? `Selected ${selectedTags.length} tags`
														: "Select tags"}
												<ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="p-0" align="end">
											<Command>
												<CommandInput placeholder="Search tag..." className="h-9" />
												{isLoadingTags && (
													<span className="py-6 text-center text-sm">
														Loading tags...
													</span>
												)}
												<CommandEmpty>No tags found.</CommandEmpty>
												<ScrollArea className="h-96">
													<CommandGroup>
														{tags?.map((tag) => (
															<CommandItem
																value={tag}
																key={tag}
																onSelect={() => {
																	if (selectedTags.includes(tag)) {
																		setSelectedTags(
																			selectedTags.filter((t) => t !== tag),
																		);
																		return;
																	}
																	setSelectedTags([...selectedTags, tag]);
																}}
															>
																{tag}
																<CheckIcon
																	className={cn(
																		"ml-auto h-4 w-4",
																		selectedTags.includes(tag)
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</ScrollArea>
											</Command>
										</PopoverContent>
									</Popover>
									<Button
										size="icon"
										onClick={() =>
											setViewMode(viewMode === "detailed" ? "icon" : "detailed")
										}
										className="h-9 w-9 flex-shrink-0"
									>
										{viewMode === "detailed" ? (
											<LayoutGrid className="size-4" />
										) : (
											<List className="size-4" />
										)}
									</Button>
								</div>
							</div>

							{selectedTags.length > 0 && (
								<div className="flex flex-wrap justify-end gap-2">
									{selectedTags.map((tag) => (
										<Badge
											key={tag}
											variant="secondary"
											className="cursor-pointer"
											onClick={() =>
												setSelectedTags(selectedTags.filter((t) => t !== tag))
											}
										>
											{tag} ×
										</Badge>
									))}
								</div>
							)}

							{isErrorTemplates && (
								<AlertBlock type="error">{errorTemplates?.message}</AlertBlock>
							)}

							{isLoadingTemplates ? (
								<div className="flex min-h-[50vh] w-full flex-row items-center justify-center gap-4">
									<Loader2 className="min-h-[60vh] size-8 animate-spin text-muted-foreground" />
									<div className="text-lg font-medium text-muted-foreground">
										Loading templates...
									</div>
								</div>
							) : templates.length === 0 ? (
								<div className="flex min-h-[50vh] w-full items-center justify-center gap-2">
									<SearchIcon className="size-6 text-muted-foreground" />
									<div className="text-xl font-medium text-muted-foreground">
										No templates found
									</div>
								</div>
							) : (
								<div
									className={cn(
										"grid gap-6",
										viewMode === "detailed"
											? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
											: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6",
									)}
								>
									{templates.map((template, idx) => (
										<div
											key={`${template.id}-${template.version || "default"}-${idx}`}
											className={cn(
												"relative flex flex-col overflow-hidden rounded-lg border",
												viewMode === "icon" && "h-[200px]",
												viewMode === "detailed" && "h-[400px]",
											)}
										>
											<Badge className="absolute right-2 top-2" variant="blue">
												{template.version}
											</Badge>
											<div
												className={cn(
													"flex flex-none flex-col items-center gap-4 bg-muted/30 p-6 pb-3",
													viewMode === "detailed" && "border-b",
												)}
											>
												<img
													src={`${customBaseUrl || "https://templates.dokploy.com/"}/blueprints/${template.id}/${template.logo}`}
													className={cn(
														"object-contain",
														viewMode === "detailed" ? "size-24" : "size-16",
													)}
													alt={template.name}
												/>
												<div className="flex flex-col items-center gap-2">
													<span className="line-clamp-1 text-sm font-medium">
														{template.name}
													</span>
													{viewMode === "detailed" &&
														template.tags.length > 0 && (
															<div className="flex flex-wrap justify-center gap-1.5">
																{template.tags.map((tag) => (
																	<Badge
																		key={tag}
																		variant="green"
																		className="px-2 py-0 text-[10px]"
																	>
																		{tag}
																	</Badge>
																))}
															</div>
														)}
												</div>
											</div>

											{viewMode === "detailed" && (
												<ScrollArea className="flex-1 p-6">
													<div className="text-sm text-muted-foreground">
														{template.description}
													</div>
												</ScrollArea>
											)}

											<div
												className={cn(
													"mt-auto flex-none px-6 py-3",
													viewMode === "detailed"
														? "flex items-center justify-between border-t bg-muted/30"
														: "flex justify-center",
												)}
											>
												{viewMode === "detailed" && (
													<div className="flex gap-2">
														{template.links?.github && (
															<Link
																href={template.links.github}
																target="_blank"
																className="text-muted-foreground transition-colors hover:text-foreground"
															>
																<GithubIcon className="size-5" />
															</Link>
														)}
														{template.links?.website && (
															<Link
																href={template.links.website}
																target="_blank"
																className="text-muted-foreground transition-colors hover:text-foreground"
															>
																<Globe className="size-5" />
															</Link>
														)}
														{template.links?.docs && (
															<Link
																href={template.links.docs}
																target="_blank"
																className="text-muted-foreground transition-colors hover:text-foreground"
															>
																<BookText className="size-5" />
															</Link>
														)}
													</div>
												)}
												<Button
													variant="secondary"
													size="sm"
													className={cn("w-auto", viewMode === "detailed" && "w-auto")}
													onClick={() => handleOpenTemplateDialog(template)}
												>
													Add from Marketplace
												</Button>
											</div>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</div>
				</Card>
			</div>

			<Dialog open={isDeployDialogOpen} onOpenChange={setIsDeployDialogOpen}>
				<DialogContent className="sm:max-w-xl">
					<DialogHeader>
						<DialogTitle>
							{selectedTemplate?.name || "Template"} Marketplace Setup
						</DialogTitle>
						<DialogDescription>
							Choose whether to add this template to a new resource group or an
							existing one.
						</DialogDescription>
					</DialogHeader>

					<Form {...form}>
						<form
							id="marketplace-template-form"
							onSubmit={form.handleSubmit(onSubmit)}
							className="grid gap-5"
						>
							<FormField
								control={form.control}
								name="targetMode"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>Deployment Target</FormLabel>
										<FormControl>
											<RadioGroup
												value={field.value}
												onValueChange={field.onChange}
												className="grid gap-3"
											>
												<label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/65 p-4">
													<RadioGroupItem value="new" id="marketplace-target-new" />
													<div>
														<p className="text-sm font-semibold text-foreground">
															New Resource Group
														</p>
														<p className="mt-1 text-xs text-muted-foreground">
															Create a new project in dashboard/projects and deploy
															this template into it.
														</p>
													</div>
												</label>
												<label className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/65 p-4">
													<RadioGroupItem
														value="existing"
														id="marketplace-target-existing"
														disabled={availableProjects.length === 0}
													/>
													<div>
														<p className="text-sm font-semibold text-foreground">
															Existing Resource Group
														</p>
														<p className="mt-1 text-xs text-muted-foreground">
															Add this template to one of your current projects.
														</p>
													</div>
												</label>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{targetMode === "new" ? (
								<FormField
									control={form.control}
									name="projectName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>New Resource Group Name</FormLabel>
											<FormControl>
												<Input placeholder="Nginx Services" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							) : (
								<FormField
									control={form.control}
									name="projectId"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Select Existing Resource Group</FormLabel>
											<Select onValueChange={field.onChange} value={field.value}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Choose a project" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{availableProjects.map((project) => (
														<SelectItem
															key={project.projectId}
															value={project.projectId}
														>
															{project.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}

							{shouldShowServerDropdown && (
								<div>
									<Label className="flex w-fit flex-row items-center gap-1 break-all pb-2 pt-1">
										Select a Server {!isCloud ? "(Optional)" : ""}
										<HelpCircle className="size-4 text-muted-foreground" />
									</Label>
									<Select
										onValueChange={(value) => setServerId(value)}
										value={serverId}
									>
										<SelectTrigger>
											<SelectValue
												placeholder={
													!isCloud ? "Atlanexis CloudOS" : "Select a Server"
												}
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{!isCloud && (
													<SelectItem value="dokploy">
														<span className="flex w-full items-center justify-between gap-2">
															<span>Atlanexis CloudOS</span>
															<span className="self-center text-xs text-muted-foreground">
																Default
															</span>
														</span>
													</SelectItem>
												)}
												{servers?.map((server) => (
													<SelectItem
														key={server.serverId}
														value={server.serverId}
													>
														<span className="flex w-full items-center justify-between gap-2">
															<span>{server.name}</span>
															<span className="self-center text-xs text-muted-foreground">
																{server.ipAddress}
															</span>
														</span>
													</SelectItem>
												))}
												<SelectLabel>
													Servers ({servers?.length + (!isCloud ? 1 : 0)})
												</SelectLabel>
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							)}

							{targetMode === "existing" && availableProjects.length === 0 && (
								<AlertBlock type="warning">
									No existing resource groups are available. Create a new one
									from the marketplace instead.
								</AlertBlock>
							)}
						</form>
					</Form>

					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsDeployDialogOpen(false)}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							form="marketplace-template-form"
							isLoading={isCreatingProject || isDeployingTemplate}
						>
							{targetMode === "new"
								? "Create Project and Deploy"
								: "Deploy Template"}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

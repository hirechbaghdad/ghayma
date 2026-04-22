"use client";

import type { inferRouterOutputs } from "@trpc/server";
import {
	ArrowUpRight,
	BarChartHorizontalBigIcon,
	Bell,
	BlocksIcon,
	BookIcon,
	BotIcon,
	Boxes,
	ChevronsUpDown,
	Clock,
	CreditCard,
	Database,
	Folder,
	Forward,
	GalleryVerticalEnd,
	GitBranch,
	HeartIcon,
	KeyRound,
	LayoutGrid,
	Loader2,
	MenuIcon,
	type LucideIcon,
	Package,
	PieChart,
	Server,
	SettingsIcon,
	ShieldCheck,
	Star,
	Store,
	Trash2,
	User,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import type { AppRouter } from "@/server/api/root";
import { api } from "@/utils/api";
import { AddOrganization } from "../dashboard/organization/handle-organization";
import { DialogAction } from "../shared/dialog-action";
import { Logo } from "../shared/logo";
import { Button } from "../ui/button";
import { TimeBadge } from "../ui/time-badge";
import { UpdateServerButton } from "./update-server";
import { UserNav } from "./user-nav";

type AuthQueryOutput = inferRouterOutputs<AppRouter>["user"]["get"];

type SingleNavItem = {
	isSingle?: true;
	title: string;
	url: string;
	icon?: LucideIcon;
	isEnabled?: (opts: { auth?: AuthQueryOutput; isCloud: boolean }) => boolean;
};

type NavItem =
	| SingleNavItem
	| {
		isSingle: false;
		title: string;
		icon: LucideIcon;
		items: SingleNavItem[];
		isEnabled?: (opts: {
			auth?: AuthQueryOutput;
			isCloud: boolean;
		}) => boolean;
	};

type ExternalLink = {
	name: string;
	url: string;
	icon: React.ComponentType<{ className?: string }>;
	isEnabled?: (opts: { auth?: AuthQueryOutput; isCloud: boolean }) => boolean;
};

type Menu = {
	home: NavItem[];
	settings: NavItem[];
	help: ExternalLink[];
};

const MENU: Menu = {
	home: [
		{
			isSingle: true,
			title: "Resources",
			url: "/dashboard/projects",
			icon: Folder,
		},
		{
			isSingle: true,
			title: "Marketplace",
			url: "/dashboard/marketplace",
			icon: Store,
			isEnabled: ({ auth }) =>
				!!(auth?.role === "owner" || auth?.canCreateServices),
		},
		{
			isSingle: true,
			title: "Monitoring",
			url: "/dashboard/monitoring",
			icon: BarChartHorizontalBigIcon,
			isEnabled: ({ isCloud }) => !isCloud,
		},
		{
			isSingle: true,
			title: "Automated Cron Profiles",
			url: "/dashboard/schedules",
			icon: Clock,
			isEnabled: ({ isCloud, auth }) => !isCloud && auth?.role === "owner",
		},
		{
			isSingle: true,
			title: "Dynamic Routing Configuration",
			url: "/dashboard/traefik",
			icon: GalleryVerticalEnd,
			isEnabled: ({ auth, isCloud }) =>
				!!(
					(auth?.role === "owner" || auth?.canAccessToTraefikFiles) &&
					!isCloud
				),
		},
		{
			isSingle: true,
			title: "Dynamic Routing Requests",
			url: "/dashboard/requests",
			icon: Forward,
			isEnabled: ({ auth, isCloud }) =>
				!!((auth?.role === "owner" || auth?.canAccessToDocker) && !isCloud),
		},
		{
			isSingle: true,
			title: "Dynamic Routing Certificates",
			url: "/dashboard/settings/certificates",
			icon: ShieldCheck,
			isEnabled: ({ auth }) => !!(auth?.role === "owner"),
		},
		{
			isSingle: true,
			title: "Containers Engine",
			url: "/dashboard/docker",
			icon: BlocksIcon,
			isEnabled: ({ auth, isCloud }) =>
				!!((auth?.role === "owner" || auth?.canAccessToDocker) && !isCloud),
		},
		{
			isSingle: true,
			title: "Distributed Compute Management",
			url: "/dashboard/swarm",
			icon: PieChart,
			isEnabled: ({ auth, isCloud }) =>
				!!((auth?.role === "owner" || auth?.canAccessToDocker) && !isCloud),
		},
		{
			isSingle: true,
			title: "Distributed Compute Cluster Management",
			url: "/dashboard/settings/cluster",
			icon: Boxes,
			isEnabled: ({ auth, isCloud }) => !!(auth?.role === "owner" && !isCloud),
		},
		{
			isSingle: true,
			title: "Version Info",
			url: "/dashboard/version-info",
			icon: HeartIcon,
		},
		{
			isSingle: true,
			title: "AI Agent",
			url: "/dashboard/ai-agent",
			icon: BotIcon,
		},
	],
	settings: [
		{
			isSingle: true,
			title: "Local Node settings",
			url: "/dashboard/settings/server",
			icon: SettingsIcon,
			isEnabled: ({ auth, isCloud }) => !!(auth?.role === "owner" && !isCloud),
		},
		{
			isSingle: true,
			title: "Servers",
			url: "/dashboard/settings/servers",
			icon: Server,
			isEnabled: ({ auth }) => !!(auth?.role === "owner"),
		},
		{
			isSingle: true,
			title: "API Services",
			url: "/dashboard/settings/api-services",
			icon: KeyRound,
			isEnabled: ({ auth }) =>
				!!(auth?.role === "owner" || auth?.canAccessToAPI),
		},
		{
			isSingle: true,
			title: "IAM Roles",
			icon: Users,
			url: "/dashboard/settings/users",
			isEnabled: ({ auth }) => !!(auth?.role === "owner"),
		},
		{
			isSingle: true,
			title: "SSH Management",
			icon: KeyRound,
			url: "/dashboard/settings/ssh-keys",
			isEnabled: ({ auth }) =>
				!!(auth?.role === "owner" || auth?.canAccessToSSHKeys),
		},
		{
			title: "Artificial Intelligence Integration",
			icon: BotIcon,
			url: "/dashboard/settings/ai",
			isSingle: true,
			isEnabled: ({ auth }) => !!(auth?.role === "owner"),
		},
		{
			isSingle: true,
			title: "Git Repositories Integration",
			url: "/dashboard/settings/git-providers",
			icon: GitBranch,
			isEnabled: ({ auth }) =>
				!!(auth?.role === "owner" || auth?.canAccessToGitProviders),
		},
		{
			isSingle: true,
			title: "Container Registry Integration",
			url: "/dashboard/settings/registry",
			icon: Package,
			isEnabled: ({ auth }) => !!(auth?.role === "owner"),
		},
		{
			isSingle: true,
			title: "S3 Integration",
			url: "/dashboard/settings/destinations",
			icon: Database,
			isEnabled: ({ auth }) => !!(auth?.role === "owner"),
		},
		{
			isSingle: true,
			title: "Notifications",
			url: "/dashboard/settings/notifications",
			icon: Bell,
			isEnabled: ({ auth }) => !!(auth?.role === "owner"),
		},
		{
			isSingle: true,
			title: "Billing",
			url: "/dashboard/settings/billing",
			icon: CreditCard,
			isEnabled: ({ auth, isCloud }) => !!(auth?.role === "owner" && isCloud),
		},
	],
	help: [
		{
			name: "Atlanexis Support",
			url: "https://atlanexis.com/support",
			icon: BookIcon,
		},
	],
} as const;

function createMenuForAuthUser(opts: {
	auth?: AuthQueryOutput;
	isCloud: boolean;
}): Menu {
	return {
		home: MENU.home.filter((item) =>
			!item.isEnabled
				? true
				: item.isEnabled({
					auth: opts.auth,
					isCloud: opts.isCloud,
				}),
		),
		settings: MENU.settings.filter((item) =>
			!item.isEnabled
				? true
				: item.isEnabled({
					auth: opts.auth,
					isCloud: opts.isCloud,
				}),
		),
		help: MENU.help.filter((item) =>
			!item.isEnabled
				? true
				: item.isEnabled({
					auth: opts.auth,
					isCloud: opts.isCloud,
				}),
		),
	};
}

function isActiveRoute(opts: { itemUrl: string; pathname: string }): boolean {
	const normalizedItemUrl = opts.itemUrl?.replace("/projects", "/project");
	const normalizedPathname = opts.pathname?.replace("/projects", "/project");

	if (!normalizedPathname) return false;
	if (normalizedPathname === normalizedItemUrl) return true;

	if (normalizedPathname.startsWith(normalizedItemUrl)) {
		const nextChar = normalizedPathname.charAt(normalizedItemUrl.length);
		return nextChar === "/";
	}

	return false;
}

function findActiveNavItem(
	navItems: NavItem[],
	pathname: string,
): SingleNavItem | undefined {
	const found = navItems.find((item) =>
		item.isSingle !== false
			? isActiveRoute({ itemUrl: item.url, pathname })
			: item.items.some((subItem) =>
				isActiveRoute({ itemUrl: subItem.url, pathname }),
			),
	);

	if (found?.isSingle !== false) {
		return found;
	}

	return found?.items.find((subItem) =>
		isActiveRoute({ itemUrl: subItem.url, pathname }),
	);
}

function flattenNavItems(items: NavItem[]): SingleNavItem[] {
	return items.flatMap((item) => (item.isSingle !== false ? [item] : item.items));
}

function OrganizationSwitcher() {
	const { data: isCloud } = api.settings.isCloud.useQuery();
	const { data: user } = api.user.get.useQuery();
	const { data: session } = authClient.useSession();
	const {
		data: organizations,
		refetch,
		isLoading,
	} = api.organization.all.useQuery();
	const { mutateAsync: deleteOrganization, isLoading: isRemoving } =
		api.organization.delete.useMutation();
	const { mutateAsync: setDefaultOrganization, isLoading: isSettingDefault } =
		api.organization.setDefault.useMutation();
	const { data: activeOrganization } = authClient.useActiveOrganization();

	if (isLoading) {
		return (
			<div className="inline-flex h-11 items-center gap-2 rounded-full border border-border/70 bg-card/80 px-4 text-sm text-muted-foreground">
				<Loader2 className="size-4 animate-spin" />
				<span>Loading workspace</span>
			</div>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					className="h-11 gap-3 rounded-full border-border/70 bg-card/85 px-3 shadow-sm"
				>
					<div className="flex size-8 items-center justify-center rounded-full border border-border/70 bg-background">
						<Logo className="size-5" logoUrl={activeOrganization?.logo || undefined} />
					</div>
					<div className="hidden min-w-0 text-left sm:block">
						<p className="truncate text-sm font-semibold">
							{activeOrganization?.name ?? "Select Organization"}
						</p>
						<p className="truncate text-xs text-muted-foreground">
							Workspace
						</p>
					</div>
					<ChevronsUpDown className="size-4 text-muted-foreground" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 rounded-2xl" align="start" sideOffset={8}>
				<DropdownMenuLabel className="text-xs text-muted-foreground">
					Organizations
				</DropdownMenuLabel>
				{organizations?.map((org) => {
					const isDefault = org.members?.[0]?.isDefault ?? false;
					return (
						<div className="flex items-center gap-2 px-1 py-1" key={org.id}>
							<DropdownMenuItem
								onClick={async () => {
									await authClient.organization.setActive({
										organizationId: org.id,
									});
									window.location.reload();
								}}
								className="flex flex-1 items-center justify-between rounded-xl px-3 py-3"
							>
								<div className="min-w-0">
									<p className="truncate font-medium">{org.name}</p>
									<p className="truncate text-xs text-muted-foreground">
										{isDefault ? "Default organization" : "Switch workspace"}
									</p>
								</div>
								<div className="flex size-8 items-center justify-center rounded-full border border-border/70 bg-background">
									<Logo className="size-5" logoUrl={org.logo ?? undefined} />
								</div>
							</DropdownMenuItem>

							<Button
								variant="ghost"
								size="icon"
								className={cn(
									"size-9 rounded-full",
									isDefault ? "text-yellow-500" : "text-muted-foreground",
								)}
								isLoading={isSettingDefault && !isDefault}
								disabled={isDefault}
								onClick={async (event) => {
									if (isDefault) return;
									event.stopPropagation();
									await setDefaultOrganization({
										organizationId: org.id,
									})
										.then(() => {
											refetch();
											toast.success("Default organization updated");
										})
										.catch((error) => {
											toast.error(
												error?.message || "Error setting default organization",
											);
										});
								}}
								title={isDefault ? "Default organization" : "Set as default"}
							>
								<Star
									className="size-4"
									fill={isDefault ? "currentColor" : "none"}
								/>
							</Button>

							{org.ownerId === session?.user?.id && (
								<DialogAction
									title="Delete Organization"
									description="Are you sure you want to delete this organization?"
									type="destructive"
									onClick={async () => {
										await deleteOrganization({
											organizationId: org.id,
										})
											.then(() => {
												refetch();
												toast.success("Organization deleted successfully");
											})
											.catch((error) => {
												toast.error(
													error?.message || "Error deleting organization",
												);
											});
									}}
								>
									<Button
										variant="ghost"
										size="icon"
										className="size-9 rounded-full text-muted-foreground hover:text-red-500"
										isLoading={isRemoving}
									>
										<Trash2 className="size-4" />
									</Button>
								</DialogAction>
							)}
						</div>
					);
				})}
				{(user?.role === "owner" || isCloud) && (
					<>
						<DropdownMenuSeparator />
						<div className="px-1 py-1">
							<AddOrganization />
						</div>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function NotificationsMenu() {
	const { data: invitations, refetch } = api.user.getInvitations.useQuery();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative size-11 rounded-full border-border/70 bg-card/85 shadow-sm"
				>
					<Bell className="size-4 text-primary" />
					{invitations && invitations.length > 0 && (
						<span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
							{invitations.length}
						</span>
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-80 rounded-2xl" align="end" sideOffset={8}>
				<DropdownMenuLabel>Pending Invitations</DropdownMenuLabel>
				<div className="flex flex-col gap-2 p-1">
					{invitations && invitations.length > 0 ? (
						invitations.map((invitation) => (
							<div
								key={invitation.id}
								className="rounded-2xl border border-border/70 bg-card/70 p-3"
							>
								<p className="font-medium">{invitation.organization?.name}</p>
								<p className="mt-1 text-xs text-muted-foreground">
									Role: {invitation.role}
								</p>
								<p className="text-xs text-muted-foreground">
									Expires: {new Date(invitation.expiresAt).toLocaleString()}
								</p>
								<div className="mt-3">
									<DialogAction
										title="Accept Invitation"
										description="Are you sure you want to accept this invitation?"
										type="default"
										onClick={async () => {
											const { error } =
												await authClient.organization.acceptInvitation({
													invitationId: invitation.id,
												});

											if (error) {
												toast.error(error.message || "Error accepting invitation");
											} else {
												toast.success("Invitation accepted successfully");
												await refetch();
											}
										}}
									>
										<Button size="sm" variant="secondary">
											Accept Invitation
										</Button>
									</DialogAction>
								</div>
							</div>
						))
					) : (
						<div className="rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-sm text-muted-foreground">
							No pending invitations
						</div>
					)}
				</div>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function AppLauncher({
	pathname,
	sections,
}: {
	pathname: string;
	sections: Array<{ title: string; items: SingleNavItem[] }>;
}) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				variant="outline"
				className="h-11 gap-2 rounded-full border-border/70 bg-card/85 px-4 shadow-sm"
				onClick={() => setOpen(true)}
			>
				<LayoutGrid className="size-4 text-primary" />
				<span>Apps</span>
			</Button>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-5xl overflow-hidden rounded-[2rem] border-border/70 p-0">
					<DialogHeader className="border-b border-border/60 px-6 pb-5 pt-6">
						<DialogTitle>Apps Menu</DialogTitle>
						<DialogDescription>
							Open services, infrastructure tools, and settings from one place.
						</DialogDescription>
					</DialogHeader>
					<Command className="rounded-none bg-transparent">
						<div className="px-6 pt-4">
							<CommandInput placeholder="Search apps, pages, and settings..." />
						</div>
						<CommandList className="max-h-[72vh] px-4 pb-6 pt-4">
							<CommandEmpty>No matching destination found.</CommandEmpty>
							{sections.map((section) => (
								<CommandGroup
									key={section.title}
									heading={section.title}
									className="mb-6"
								>
									<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
										{section.items.map((item) => {
											const isActive = isActiveRoute({
												itemUrl: item.url,
												pathname,
											});
											const Icon = item.icon ?? LayoutGrid;

											return (
												<CommandItem
													key={`${section.title}-${item.url}`}
													value={`${section.title} ${item.title} ${item.url}`}
													className="rounded-3xl p-0 aria-selected:bg-transparent"
													onSelect={() => setOpen(false)}
												>
													<Link
														href={item.url}
														className={cn(
															"flex w-full items-start gap-4 rounded-3xl border p-5 transition-all",
															isActive
																? "border-primary/30 bg-primary/10 shadow-[0_18px_34px_hsl(var(--primary)/0.14)]"
																: "border-border/70 bg-card/80 hover:border-primary/20 hover:bg-accent/70 hover:shadow-[0_18px_34px_rgba(15,23,42,0.06)]",
														)}
													>
														<div className="flex size-12 items-center justify-center rounded-2xl bg-primary/12 text-primary">
															<Icon className="size-6" />
														</div>
														<div className="min-w-0">
															<p className="truncate text-sm font-semibold">
																{item.title}
															</p>
															<p className="mt-1 text-xs text-muted-foreground">
																{item.url
																	.replace("/dashboard/", "")
																	.replaceAll("/", " / ")}
															</p>
														</div>
													</Link>
												</CommandItem>
											);
										})}
									</div>
								</CommandGroup>
							))}
						</CommandList>
					</Command>
				</DialogContent>
			</Dialog>
		</>
	);
}

function TopQuickLinks({
	items,
	pathname,
}: {
	items: SingleNavItem[];
	pathname: string;
}) {
	return (
		<div className="hidden items-center gap-2 xl:flex">
			{items.slice(0, 5).map((item) => {
				const Icon = item.icon ?? LayoutGrid;
				const isActive = isActiveRoute({ itemUrl: item.url, pathname });

				return (
						<Link
							key={item.url}
							href={item.url}
							className={cn(
								"inline-flex min-w-0 max-w-[13rem] items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-colors",
								isActive
									? "border-primary/30 bg-primary/10 text-primary"
									: "border-border/70 bg-card/65 text-muted-foreground hover:border-primary/20 hover:text-foreground",
							)}
						>
							<Icon className="size-3.5" />
							<span className="truncate">{item.title}</span>
						</Link>
					);
				})}
		</div>
	);
}

function SidebarNavLink({
	item,
	pathname,
	onNavigate,
}: {
	item: SingleNavItem;
	pathname: string;
	onNavigate?: () => void;
}) {
	const Icon = item.icon ?? LayoutGrid;
	const isActive = isActiveRoute({ itemUrl: item.url, pathname });

	return (
		<Link
			href={item.url}
			onClick={onNavigate}
			className={cn(
				"group relative flex items-center gap-3 rounded-[1.35rem] border px-3.5 py-3 transition-all duration-300",
				isActive
					? "dashboard-sidebar-link-active text-foreground"
					: "border-transparent text-muted-foreground hover:translate-x-1 hover:border-primary/15 hover:bg-background/75 hover:text-foreground",
			)}
		>
			<div
				className={cn(
					"flex size-10 items-center justify-center rounded-[1rem] border transition-all duration-300",
					isActive
						? "border-primary/10 bg-primary text-primary-foreground"
						: "border-border/60 bg-card/80 text-primary group-hover:border-primary/20 group-hover:bg-primary/10",
				)}
			>
				<Icon className="size-4" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-semibold">{item.title}</p>
				<p className="truncate text-xs text-muted-foreground">
					{item.url.replace("/dashboard/", "").replaceAll("/", " / ")}
				</p>
			</div>
			<div
				className={cn(
					"h-9 w-1 rounded-full bg-gradient-to-b from-primary via-primary to-primary/40 transition-all duration-300",
					isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50",
				)}
			/>
		</Link>
	);
}

function SidebarSection({
	title,
	items,
	pathname,
	onNavigate,
}: {
	title: string;
	items: SingleNavItem[];
	pathname: string;
	onNavigate?: () => void;
}) {
	return (
		<div className="relative z-10 mt-5">
			<div className="px-3 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
				{title}
			</div>
			<div className="mt-2 flex flex-col gap-1.5">
				{items.map((item) => (
					<SidebarNavLink
						key={`${title}-${item.url}`}
						item={item}
						pathname={pathname}
						onNavigate={onNavigate}
					/>
				))}
			</div>
		</div>
	);
}

function DashboardSidebar({
	pathname,
	activeItem,
	homeEntries,
	settingsEntries,
	onNavigate,
}: {
	pathname: string;
	activeItem?: SingleNavItem;
	homeEntries: SingleNavItem[];
	settingsEntries: SingleNavItem[];
	onNavigate?: () => void;
}) {
	return (
		<div className="dashboard-sidebar flex h-full flex-col rounded-[2rem] p-3 text-sidebar-foreground">
			<div className="relative z-10 flex h-full flex-col">
				<div className="rounded-[1.65rem] border border-border/70 bg-background/70 p-4 shadow-sm">
					<div className="flex items-center gap-3">
						<div className="flex size-12 items-center justify-center rounded-[1.2rem] bg-primary/12 text-primary">
							<Logo className="size-6" />
						</div>
						<div className="min-w-0">
							<p className="truncate text-sm font-semibold">
								Atlanexis CloudOS
							</p>
							<p className="truncate text-xs text-muted-foreground">
								Navigation Hub
							</p>
						</div>
					</div>
					<div className="mt-4 rounded-[1.35rem] border border-border/60 bg-card/75 p-4">
						<p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary/80">
							Control Center
						</p>
						<p className="mt-2 truncate text-base font-semibold text-foreground">
							{activeItem?.title ?? "Dashboard"}
						</p>
						<p className="mt-1 text-xs leading-5 text-muted-foreground">
							A persistent control surface for infrastructure, platform
							settings, and operations.
						</p>
					</div>
				</div>

				<div className="mt-4 flex-1 overflow-y-auto pr-1">
					<SidebarSection
						title="Platform"
						items={homeEntries}
						pathname={pathname}
						onNavigate={onNavigate}
					/>
					<SidebarSection
						title="Configuration"
						items={settingsEntries}
						pathname={pathname}
						onNavigate={onNavigate}
					/>
				</div>

				<div className="relative z-10 mt-4 rounded-[1.65rem] border border-border/70 bg-background/70 p-4 shadow-sm">
					<p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary/80">
						Atlanexis Copyright
					</p>
					<p className="mt-3 text-sm font-semibold text-foreground">
						(c) 2026 Hirech Baghdad Belkheir
					</p>
					<p className="mt-1 text-xs leading-5 text-muted-foreground">
						Atlanexis Inc
					</p>
				</div>
			</div>
		</div>
	);
}

interface Props {
	children: React.ReactNode;
}

export default function Page({ children }: Props) {
	const pathname = usePathname();
	const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
	const { data: auth } = api.user.get.useQuery();
	const { data: dokployVersion } = api.settings.getDokployVersion.useQuery();
	const { data: isCloud } = api.settings.isCloud.useQuery();

	const { home, settings, help } = createMenuForAuthUser({
		auth,
		isCloud: !!isCloud,
	});
	const homeEntries = useMemo(() => flattenNavItems(home), [home]);
	const settingsEntries = useMemo(() => flattenNavItems(settings), [settings]);
	const activeItem = findActiveNavItem([...home, ...settings], pathname);
	const includesProjects = pathname?.includes("/dashboard/project");

	return (
		<div className="dashboard-shell min-h-svh">
			<div className="mx-auto flex min-h-svh max-w-[1780px] gap-4 px-3 py-3 sm:px-4 lg:px-5">
				<aside className="hidden lg:block lg:w-[300px] xl:w-[320px]">
					<div className="sticky top-3 h-[calc(100svh-1.5rem)]">
						<DashboardSidebar
							pathname={pathname}
							activeItem={activeItem}
							homeEntries={homeEntries}
							settingsEntries={settingsEntries}
						/>
					</div>
				</aside>

				<div className="min-w-0 flex-1">
					<header className="dashboard-topbar sticky top-3 z-40 rounded-[1.75rem] px-4 py-3 sm:px-5">
						<div className="flex flex-col gap-4">
							<div className="flex flex-wrap items-center justify-between gap-3">
								<div className="flex min-w-0 items-center gap-3">
									<Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
										<SheetTrigger asChild>
											<Button
												variant="outline"
												size="icon"
												className="size-11 rounded-[1.2rem] border-border/70 bg-card/80 shadow-sm lg:hidden"
											>
												<MenuIcon className="size-4" />
												<span className="sr-only">Open navigation</span>
											</Button>
										</SheetTrigger>
										<SheetContent
											side="left"
											className="w-[92vw] max-w-[360px] border-none bg-transparent p-3 shadow-none"
										>
											<SheetHeader className="sr-only">
												<SheetTitle>Dashboard Navigation</SheetTitle>
												<SheetDescription>
													Open platform and configuration sections.
												</SheetDescription>
											</SheetHeader>
											<div className="h-full">
												<DashboardSidebar
													pathname={pathname}
													activeItem={activeItem}
													homeEntries={homeEntries}
													settingsEntries={settingsEntries}
													onNavigate={() => setIsMobileNavOpen(false)}
												/>
											</div>
										</SheetContent>
									</Sheet>

									<Link
										href="/dashboard/projects"
										className="flex items-center gap-3 rounded-full border border-border/70 bg-card/80 px-3 py-2 shadow-sm"
									>
										<div className="flex size-9 items-center justify-center rounded-full bg-primary/12 text-primary">
											<Logo className="size-5" />
										</div>
										<div className="hidden min-w-0 sm:block">
											<p className="truncate text-sm font-semibold">
												Atlanexis CloudOS
											</p>
											<p className="truncate text-xs text-muted-foreground">
												Dashboard
											</p>
										</div>
									</Link>
								</div>

								<div className="flex flex-wrap items-center justify-end gap-2">
									{!isCloud && (
										<div className="hidden md:block">
											<TimeBadge />
										</div>
									)}
									<NotificationsMenu />
									<OrganizationSwitcher />
									<div className="min-w-[220px] max-w-full">
										<UserNav />
									</div>
								</div>
							</div>

							<div className="flex flex-wrap items-center justify-between gap-3">
								<div className="flex min-w-0 items-center gap-3">
									<div className="flex min-w-0 flex-col">
										<p className="text-xs font-medium uppercase tracking-[0.22em] text-primary">
											Control Center
										</p>
										<p className="truncate text-lg font-semibold text-foreground">
											{activeItem?.title ?? "Dashboard"}
										</p>
									</div>
									<Separator
										orientation="vertical"
										className="hidden h-8 sm:block"
									/>
									<Breadcrumb className="hidden sm:block">
										<BreadcrumbList>
											<BreadcrumbItem className="block">
												<BreadcrumbLink asChild>
													<Link
														href={activeItem?.url || "/dashboard/projects"}
														className="text-sm text-muted-foreground hover:text-foreground"
													>
														{activeItem?.url || "/dashboard/projects"}
													</Link>
												</BreadcrumbLink>
											</BreadcrumbItem>
										</BreadcrumbList>
									</Breadcrumb>
								</div>

								<div className="flex flex-wrap items-center gap-2">
									{!isCloud && auth?.role === "owner" && <UpdateServerButton />}
									{help.map((item) => (
										<Link
											key={item.name}
											href={item.url}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/20 hover:text-foreground"
										>
											<item.icon className="size-4 text-primary" />
											<span>{item.name}</span>
											<ArrowUpRight className="size-3.5 text-primary/70" />
										</Link>
									))}
									{dokployVersion && (
										<div className="rounded-full border border-border/70 bg-card/70 px-3 py-2 text-xs font-medium text-muted-foreground">
											Version {dokployVersion}
										</div>
									)}
								</div>
							</div>
						</div>
					</header>

					<main className="dashboard-content relative flex-1 pt-4">
						<div
							className={cn(
								"min-h-[calc(100svh-8rem)] rounded-[2rem] border border-border/70 bg-card/55 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-5 lg:p-6",
								includesProjects && "p-0 sm:p-0 lg:p-0",
							)}
						>
							<div
								className={cn(
									"relative z-10 h-full",
									includesProjects ? "" : "rounded-[1.5rem]",
								)}
							>
								{children}
							</div>
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Play, Square, RotateCw, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShowContainerConfig } from "../config/show-container-config";
import { ShowDockerModalLogs } from "../logs/show-docker-modal-logs";
import { DockerTerminalModal } from "../terminal/docker-terminal-modal";
import type { Container } from "./show-containers";
import { api } from "@/utils/api";
import { toast } from "sonner";

export const columns: ColumnDef<Container>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="font-mono text-sm">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "state",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    State
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const value = row.getValue("state") as string;
            return (
                <div className="capitalize">
                    <Badge
                        variant={
                            value === "running"
                                ? "default"
                                : value === "failed"
                                    ? "destructive"
                                    : "secondary"
                        }
                    >
                        {value}
                    </Badge>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return <div className="capitalize text-xs text-slate-400">{row.getValue("status")}</div>;
        },
    },
    {
        accessorKey: "image",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Image
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => <div className="lowercase text-xs truncate max-w-[150px]">{row.getValue("image")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const container = row.original;
            const utils = api.useContext();
            const isRunning = container.state === "running";

            // Power Mutations
            const { mutate: start } = api.docker.startContainer.useMutation({
                onSuccess: () => {
                    toast.success("Container started");
                    utils.docker.getContainers.invalidate();
                },
                onError: (err) => toast.error(err.message)
            });

            const { mutate: stop } = api.docker.stopContainer.useMutation({
                onSuccess: () => {
                    toast.success("Container stopped");
                    utils.docker.getContainers.invalidate();
                },
                onError: (err) => toast.error(err.message)
            });

            const { mutate: restart } = api.docker.restartContainer.useMutation({
                onSuccess: () => {
                    toast.success("Container restarted");
                    utils.docker.getContainers.invalidate();
                },
                onError: (err) => toast.error(err.message)
            });

            const { mutate: remove } = api.docker.removeContainer.useMutation({
                onSuccess: () => {
                    toast.success("Container removed from engine");
                    utils.docker.getContainers.invalidate();
                },
                onError: (err) => toast.error(`Removal failed: ${err.message}`)
            });

            return (
                <div className="flex items-center gap-2">
                    {/* POWER CONTROLS GROUP */}
                    <div className="flex items-center bg-muted/50 rounded-md border p-0.5">
                        {isRunning ? (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 text-amber-500 hover:bg-amber-500/10"
                                onClick={() => stop({ id: container.containerId })}
                            >
                                <Square className="h-3.5 w-3.5 fill-current" />
                            </Button>
                        ) : (
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-7 w-7 text-emerald-500 hover:bg-emerald-500/10"
                                onClick={() => start({ id: container.containerId })}
                            >
                                <Play className="h-3.5 w-3.5 fill-current" />
                            </Button>
                        )}
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 text-blue-500 hover:bg-blue-500/10"
                            onClick={() => restart({ containerId: container.containerId })}
                        >
                            <RotateCw className="h-3.5 w-3.5" />
                        </Button>
                    </div>

                    {/* DROP DOWN MENU */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            
                            <ShowDockerModalLogs
                                containerId={container.containerId}
                                serverId={container.serverId}
                            >
                                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                    View Logs
                                </div>
                            </ShowDockerModalLogs>

                            <ShowContainerConfig
                                containerId={container.containerId}
                                serverId={container.serverId || ""}
                            />

                            <DockerTerminalModal
                                containerId={container.containerId}
                                serverId={container.serverId || ""}
                            >
                                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground">
                                    Terminal
                                </div>
                            </DockerTerminalModal>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem 
                                className="text-red-500 focus:text-red-500 focus:bg-red-500/10 gap-2 cursor-pointer"
                                onClick={() => {
                                    if (confirm(`Are you sure you want to permanently delete container "${container.name}"?`)) {
                                        remove({ id: container.containerId });
                                    }
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete Container
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
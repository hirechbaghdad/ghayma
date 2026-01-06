import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, RotateCcw, Terminal, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
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
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="p-0 hover:bg-transparent">
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="font-mono font-medium text-blue-400">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "state",
        header: "State",
        cell: ({ row }) => {
            const value = row.getValue("state") as string;
            const isRunning = value === "running";
            return (
                <Badge className="capitalize border-none px-3" variant={isRunning ? "default" : "secondary"}>
                   <span className={`mr-2 h-1.5 w-1.5 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
                   {value}
                </Badge>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Uptime",
        cell: ({ row }) => <div className="text-xs text-muted-foreground">{row.getValue("status")}</div>,
    },
    {
        id: "actions",
        header: () => <div className="text-right mr-4">Management</div>,
        cell: ({ row }) => {
            const container = row.original;
            const utils = api.useContext();

            const { mutate: restart, isLoading: isRestarting } = api.docker.restartContainer.useMutation({
                onSuccess: () => {
                    toast.success("Container restarted");
                    utils.docker.getContainers.invalidate();
                },
                onError: (err) => toast.error(err.message)
            });

            return (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-8 border-slate-800 bg-slate-900/40 text-xs"
                        onClick={() => restart({ containerId: container.containerId })}
                        disabled={isRestarting}
                    >
                        <RotateCcw className={`h-3 w-3 mr-2 ${isRestarting ? 'animate-spin' : ''}`} />
                        Restart
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 border border-slate-800">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-52 bg-slate-900 border-slate-800">
                            <DropdownMenuLabel className="text-[10px] uppercase text-slate-500">Monitoring</DropdownMenuLabel>
                            <ShowDockerModalLogs containerId={container.containerId} serverId={container.serverId}>
                                <div className="flex items-center px-2 py-1.5 text-sm hover:bg-slate-800 cursor-pointer rounded-sm">
                                    <FileText className="mr-2 h-4 w-4" /> View Logs
                                </div>
                            </ShowDockerModalLogs>
                            <DockerTerminalModal containerId={container.containerId} serverId={container.serverId || ""}>
                                <div className="flex items-center px-2 py-1.5 text-sm hover:bg-slate-800 cursor-pointer rounded-sm">
                                    <Terminal className="mr-2 h-4 w-4" /> Terminal
                                </div>
                            </DockerTerminalModal>
                            <DropdownMenuSeparator className="bg-slate-800" />
                            <ShowContainerConfig containerId={container.containerId} serverId={container.serverId || ""} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
    },
];
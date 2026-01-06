import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Container, Database, Layers, Globe, RefreshCcw, Search, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api, type RouterOutputs } from "@/utils/api";
import { columns } from "./colums";
import { Badge } from "@/components/ui/badge";

export type Container = NonNullable<RouterOutputs["docker"]["getContainers"]>[0];

export const ShowContainers = ({ serverId }: { serverId?: string }) => {
    const { data: containers, isLoading: isLoadingContainers, refetch: refetchContainers } = api.docker.getContainers.useQuery({ serverId });
    const { data: volumes, isLoading: isLoadingVolumes, refetch: refetchVolumes } = api.docker.getVolumes.useQuery({ serverId });
    const { data: networks, isLoading: isLoadingNetworks, refetch: refetchNetworks } = api.docker.getNetworks.useQuery({ serverId });
    const { data: images, isLoading: isLoadingImages, refetch: refetchImages } = api.docker.getImages.useQuery({ serverId });

    // DIAGNOSTIC: Open your browser console (F12) to see if data is actually arriving
    React.useEffect(() => {
        if (volumes) console.log("Volumes Data:", volumes);
        if (networks) console.log("Networks Data:", networks);
        if (images) console.log("Images Data:", images);
    }, [volumes, networks, images]);

    const table = useReactTable({
        data: containers ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const onRefresh = () => {
        refetchContainers();
        refetchVolumes();
        refetchNetworks();
        refetchImages();
    };

    const formatBytes = (bytes: number) => {
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(2)} MB`;
    };

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Container className="size-8 text-primary" />
                        Atlanexis Engine
                    </h1>
                    <p className="text-muted-foreground text-sm font-mono tracking-tight uppercase">Node Resource Control Panel</p>
                </div>
                <Button variant="outline" size="sm" onClick={onRefresh} className="gap-2 border-slate-800 bg-slate-900/50 hover:bg-slate-800 transition-all">
                    <RefreshCcw className="size-4" /> Refresh Engine
                </Button>
            </div>

            <Tabs defaultValue="containers" className="w-full">
                <TabsList className="bg-slate-950 border border-slate-800 p-1 rounded-lg">
                    <TabsTrigger value="containers" className="gap-2 px-4 py-2 text-xs uppercase">Containers</TabsTrigger>
                    <TabsTrigger value="volumes" className="gap-2 px-4 py-2 text-xs uppercase">Volumes</TabsTrigger>
                    <TabsTrigger value="networks" className="gap-2 px-4 py-2 text-xs uppercase">Networks</TabsTrigger>
                    <TabsTrigger value="images" className="gap-2 px-4 py-2 text-xs uppercase">Images</TabsTrigger>
                </TabsList>

                <TabsContent value="containers" className="mt-6 space-y-4">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search active containers..."
                            onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
                            className="pl-9 bg-slate-950 border-slate-800"
                        />
                    </div>
                    <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-2xl">
                        <Table>
                            <TableHeader className="bg-slate-900/60">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} className="border-slate-800">
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id} className="text-[10px] uppercase font-bold text-slate-400 py-4 px-6">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {isLoadingContainers ? (
                                    <TableRow><TableCell colSpan={columns.length} className="h-32 text-center text-slate-500 font-mono italic">SYNCING CONTAINERS...</TableCell></TableRow>
                                ) : table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} className="border-slate-800 hover:bg-slate-900/40">
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="py-4 px-6">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={columns.length} className="h-32 text-center text-slate-500">Empty Engine.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="volumes" className="mt-6">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-xl">
                        <Table>
                            <TableHeader className="bg-slate-900/60">
                                <TableRow className="border-slate-800">
                                    <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-4 px-6">Volume Name</TableHead>
                                    <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-4">Driver</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingVolumes ? (
                                    <TableRow><TableCell colSpan={2} className="h-32 text-center text-slate-500">LOADING STORAGE...</TableCell></TableRow>
                                ) : (volumes as any)?.length > 0 ? (
                                    (volumes as any).map((vol: any, i: number) => (
                                        <TableRow key={i} className="border-slate-800 hover:bg-slate-900/40">
                                            <TableCell className="font-mono text-sm text-blue-400 px-6 py-4 flex items-center gap-3">
                                                <Database className="size-4 text-slate-500" /> {vol.name || vol.Name}
                                            </TableCell>
                                            <TableCell className="text-xs text-slate-400">{vol.driver || vol.Driver}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={2} className="h-32 text-center text-slate-500 italic">No Volumes detected.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="networks" className="mt-6">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-xl">
                        <Table>
                            <TableHeader className="bg-slate-900/60">
                                <TableRow className="border-slate-800">
                                    <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-4 px-6">Network Name</TableHead>
                                    <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-4">Driver</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingNetworks ? (
                                    <TableRow><TableCell colSpan={2} className="h-32 text-center text-slate-500">LOADING NETWORKS...</TableCell></TableRow>
                                ) : (networks as any)?.length > 0 ? (
                                    (networks as any).map((net: any, i: number) => (
                                        <TableRow key={i} className="border-slate-800 hover:bg-slate-900/40">
                                            <TableCell className="font-mono text-sm text-green-400 px-6 py-4 flex items-center gap-3">
                                                <Globe className="size-4 text-slate-500" /> {net.name || net.Name}
                                            </TableCell>
                                            <TableCell className="text-xs text-slate-300">{net.driver || net.Driver}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={2} className="h-32 text-center text-slate-500 italic">No Networks detected.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="images" className="mt-6">
                    <div className="rounded-xl border border-slate-800 bg-slate-950/40 overflow-hidden shadow-xl">
                        <Table>
                            <TableHeader className="bg-slate-900/60">
                                <TableRow className="border-slate-800">
                                    <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-4 px-6">Image</TableHead>
                                    <TableHead className="text-[10px] uppercase font-bold text-slate-400 py-4">Size</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoadingImages ? (
                                    <TableRow><TableCell colSpan={2} className="h-32 text-center text-slate-500">LOADING IMAGES...</TableCell></TableRow>
                                ) : (images as any)?.length > 0 ? (
                                    (images as any).map((img: any, i: number) => (
                                        <TableRow key={i} className="border-slate-800 hover:bg-slate-900/40">
                                            <TableCell className="font-mono text-sm text-orange-400 px-6 py-4 flex items-center gap-3">
                                                <Layers className="size-4 text-slate-500" /> {img.repoTags?.[0] || img.Id?.substring(7,19)}
                                            </TableCell>
                                            <TableCell className="text-xs font-mono text-slate-400">{formatBytes(img.size || img.Size || 0)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={2} className="h-32 text-center text-slate-500 italic">No Images detected.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};
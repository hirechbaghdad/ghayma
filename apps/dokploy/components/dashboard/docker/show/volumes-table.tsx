import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, HardDrive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    data: any[];
}

export const VolumesTable = ({ data }: Props) => {
    return (
        <div className="rounded-xl border border-slate-800 bg-background overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-900/50">
                    <TableRow className="border-slate-800">
                        <TableHead className="text-[10px] uppercase font-bold text-slate-500">Volume Name</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-500">Driver</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-500">Mountpoint</TableHead>
                        <TableHead className="text-right text-[10px] uppercase font-bold text-slate-500">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="h-32 text-center text-slate-500">No volumes found.</TableCell>
                        </TableRow>
                    ) : (
                        data.map((volume, index) => (
                            <TableRow key={index} className="border-slate-800 hover:bg-slate-900/20">
                                <TableCell className="font-mono text-sm text-blue-400">
                                    <div className="flex items-center gap-2">
                                        <Database className="size-3 text-slate-500" />
                                        {volume.name.substring(0, 20)}{volume.name.length > 20 ? '...' : ''}
                                    </div>
                                </TableCell>
                                <TableCell className="text-xs text-slate-400">{volume.driver}</TableCell>
                                <TableCell className="text-[10px] font-mono text-slate-500 max-w-[200px] truncate">
                                    {volume.mountpoint}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:text-red-500">
                                        <Trash2 className="size-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
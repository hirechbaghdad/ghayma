import React, { useState } from "react";
import { api } from "@/utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingBasket, Search, Plus, Link2, Loader2, WifiOff, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layouts/dashboard-layout"; // Adjust path if necessary

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [deployMode, setDeployMode] = useState<"new" | "existing">("new");
    const [newProjectName, setNewProjectName] = useState("");
    const [selectedProjectId, setSelectedProjectId] = useState("");

    const { 
        data: templates, 
        isLoading: isLoadingTemplates, 
        isError, 
        error,
        refetch 
    } = api.marketplace.getTemplates.useQuery(undefined, {
        retry: 0,
        refetchOnWindowFocus: false
    });
    
    const { data: projects } = api.project.all.useQuery();
    const utils = api.useContext();
    
    const { mutate: deploy, isLoading: isDeploying } = api.marketplace.deploy.useMutation({
        onSuccess: () => {
            toast.success("Deployment queued successfully!");
            setSelectedTemplate(null);
            setNewProjectName("");
            setSelectedProjectId("");
            utils.project.all.invalidate();
        },
        onError: (err) => toast.error(err.message)
    });

    const filteredTemplates = templates?.filter(t => 
        t?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    const canSubmit = deployMode === "new" ? newProjectName.trim().length > 0 : !!selectedProjectId;

    return (
        <DashboardLayout>
            <div className="flex flex-col gap-8 p-6 lg:p-10 min-h-screen">
                <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold flex items-center gap-3 tracking-tight text-white">
                            <ShoppingBasket className="h-10 w-10 text-blue-500" /> Marketplace
                        </h1>
                        <p className="text-slate-400 mt-1">Deploy production-ready stacks instantly.</p>
                    </div>
                    {!isError && (
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                            <Input 
                                className="pl-10 py-6 bg-slate-900 border-slate-800 text-white placeholder:text-slate-600 focus:ring-blue-500" 
                                placeholder="Search templates..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    )}
                </header>

                {isLoadingTemplates ? (
                    <div className="flex flex-col items-center justify-center py-40 gap-4">
                        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                        <p className="text-slate-500">Loading templates...</p>
                    </div>
                ) : isError ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/10">
                        <WifiOff className="h-12 w-12 text-red-500 mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">Function not ready</h2>
                        <p className="text-slate-400 max-w-md mb-6">{error?.message}</p>
                        <Button onClick={() => refetch()} className="bg-slate-800 hover:bg-slate-700">
                            <RefreshCw className="h-4 w-4 mr-2" /> Retry Connection
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredTemplates.map((template) => (
                            <Card key={template.id} className="bg-slate-900 border-slate-800 flex flex-col group hover:border-blue-500/50 transition-all duration-300 shadow-xl">
                                <CardHeader className="items-center pb-2">
                                    <div className="w-16 h-16 bg-slate-800/50 rounded-xl flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                                        <img src={template.logo} alt={template.name} className="max-h-full object-contain" />
                                    </div>
                                    <CardTitle className="mt-4 text-white text-center font-bold text-lg">{template.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-sm text-slate-400 grow px-6">
                                    {template.description}
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full bg-blue-600 hover:bg-blue-700 font-bold" onClick={() => setSelectedTemplate(template)}>
                                        Install Stack
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

                <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
                    <DialogContent className="bg-slate-900 border-slate-800 text-white shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">Deploy {selectedTemplate?.name}</DialogTitle>
                            <DialogDescription className="text-slate-400">Select where to host this service.</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                                <Button 
                                    variant="ghost" 
                                    className={`flex-1 transition-colors ${deployMode === 'new' ? 'bg-slate-800 text-white' : 'text-slate-500'}`} 
                                    onClick={() => setDeployMode("new")}
                                >
                                    <Plus className="w-4 h-4 mr-2" /> New Project
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    className={`flex-1 transition-colors ${deployMode === 'existing' ? 'bg-slate-800 text-white' : 'text-slate-500'}`} 
                                    onClick={() => setDeployMode("existing")}
                                >
                                    <Link2 className="w-4 h-4 mr-2" /> Existing
                                </Button>
                            </div>

                            {deployMode === "new" ? (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Project Name</label>
                                    <Input 
                                        className="bg-slate-950 border-slate-800 h-12 focus:border-blue-500"
                                        placeholder="e.g. My Next App" 
                                        value={newProjectName}
                                        onChange={(e) => setNewProjectName(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 ml-1 uppercase tracking-wider">Select Project</label>
                                    <Select onValueChange={setSelectedProjectId} value={selectedProjectId}>
                                        <SelectTrigger className="bg-slate-950 border-slate-800 h-12">
                                            <SelectValue placeholder="Choose a project..." />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
                                            {projects?.map(p => (
                                                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        <DialogFooter>
                            <Button 
                                className="w-full bg-blue-600 hover:bg-blue-700 h-12 font-bold text-lg shadow-lg" 
                                disabled={isDeploying || !canSubmit}
                                onClick={() => deploy({
                                    templateId: selectedTemplate.id,
                                    projectName: deployMode === "new" ? newProjectName : undefined,
                                    existingProjectId: deployMode === "existing" ? selectedProjectId : undefined
                                })}
                            >
                                {isDeploying ? <Loader2 className="animate-spin" /> : "Confirm Deployment"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </DashboardLayout>
    );
}
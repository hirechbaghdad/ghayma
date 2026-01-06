import React, { useState } from "react";
import { api } from "@/utils/api";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Server, HardDrive, Layers, Activity, Terminal as TerminalIcon, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// This is the critical fix: Dynamically import the Terminal component
// and disable Server-Side Rendering (SSR) for it.
const HostTerminal = dynamic(
  () => import("@/components/Terminal").then((mod) => mod.HostTerminal),
  { 
    ssr: false, 
    loading: () => (
        <div className="h-[450px] flex flex-col items-center justify-center bg-slate-950 rounded-b-xl border border-slate-800 text-slate-500 font-mono">
            <Loader2 className="h-6 w-6 animate-spin mb-2" />
            <p>Initializing Terminal Environment...</p>
        </div>
    )
  }
);

const VersionInfoPage = () => {
  const [isTerminalActive, setIsTerminalActive] = useState(false);
  
  // Fetch System Stats
  const { data: stats, isLoading: statsLoading } = api.system.getStats.useQuery();
  
  // Fetch Servers to get the current Server ID
  const { data: servers, isLoading: serversLoading } = api.server.all.useQuery();

  const mainServerId = servers?.[0]?.serverId;

  if (statsLoading || serversLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">System Information</h1>
        <p className="text-muted-foreground text-sm">Real-time status of your host and Docker engine.</p>
      </div>

      {/* Stats Cards Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Docker Engine */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Docker Engine</CardTitle>
            <Layers className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">v{stats?.docker.version || "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.docker.running || 0} Containers Running
            </p>
          </CardContent>
        </Card>

        {/* Host OS */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Host OS</CardTitle>
            <Server className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.os.distro || "Linux"}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.os.arch} ({stats?.os.release})
            </p>
          </CardContent>
        </Card>

        {/* Memory */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Memory</CardTitle>
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatBytes(stats?.memory.used || 0)} / {formatBytes(stats?.memory.total || 0)}
            </div>
            <div className="w-full bg-slate-800 mt-2 h-1.5 rounded-full overflow-hidden">
               <div 
                 className="bg-green-500 h-full transition-all duration-500" 
                 style={{ width: `${((stats?.memory.used || 0) / (stats?.memory.total || 1)) * 100}%` }} 
               />
            </div>
          </CardContent>
        </Card>

        {/* Storage */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {formatBytes(stats?.storage[0]?.used || 0)} / {formatBytes(stats?.storage[0]?.size || 0)}
            </div>
            <p className="text-xs text-muted-foreground truncate">Mount: {stats?.storage[0]?.mount || "/"}</p>
          </CardContent>
        </Card>
      </div>

      {/* Terminal Section */}
      <div className="space-y-0 shadow-2xl">
        <div className="flex items-center justify-between bg-slate-900 p-4 rounded-t-xl border border-slate-800 border-b-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <TerminalIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-white">Interactive Host Terminal</h2>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                        {mainServerId ? `System Linked: ${mainServerId}` : "No Host Detected"}
                    </p>
                </div>
            </div>
          </div>

          {!isTerminalActive ? (
            <Button 
              onClick={() => setIsTerminalActive(true)}
              className="bg-primary hover:bg-primary/90 text-white gap-2 font-bold"
              disabled={!mainServerId}
            >
              <Power className="h-4 w-4" />
              ESTABLISH CONNECTION
            </Button>
          ) : (
            <Button 
              variant="destructive"
              onClick={() => setIsTerminalActive(false)}
              className="gap-2 font-bold"
            >
              <Power className="h-4 w-4" />
              TERMINATE SESSION
            </Button>
          )}
        </div>
        
        <div className="relative">
            {isTerminalActive && mainServerId ? (
              <HostTerminal serverId={mainServerId} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[450px] border border-slate-800 rounded-b-xl bg-slate-950/40 text-center space-y-4">
                <div className="p-4 rounded-full bg-slate-900 border border-slate-800">
                    <TerminalIcon className="h-10 w-10 text-slate-700" />
                </div>
                <div className="max-w-xs px-6">
                    <p className="text-slate-300 font-medium">Terminal Offline</p>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                        Securely connect to your host's shell. Use this with caution as you will have direct command-line access to the host machine.
                    </p>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

// Formatting Helper
function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

VersionInfoPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default VersionInfoPage;
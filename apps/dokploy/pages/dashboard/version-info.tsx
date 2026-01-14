import React from "react";
import { api } from "@/utils/api";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Server, HardDrive, Layers, Activity, FileText, ShieldCheck, AlertCircle } from "lucide-react";

const VersionInfoPage = () => {
  // Fetch System Stats
  const { data: stats, isLoading: statsLoading } = api.system.getStats.useQuery();
  
  // Fetch License Content
  // Note: You must implement 'getLicense' in your backend trpc system router
  // to read /usr/share/atlanexis/license.txt
  const { 
    data: license, 
    isLoading: licenseLoading, 
    isError: licenseError 
  } = api.system.getLicense.useQuery(undefined, {
    retry: false,
  });

  if (statsLoading || licenseLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Loading System Data...</p>
        </div>
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
        <Card className="bg-slate-900/50 border-slate-800 shadow-sm">
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
        <Card className="bg-slate-900/50 border-slate-800 shadow-sm">
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
        <Card className="bg-slate-900/50 border-slate-800 shadow-sm">
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
        <Card className="bg-slate-900/50 border-slate-800 shadow-sm">
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

      {/* License Content Section */}
      <div className="space-y-0 shadow-2xl rounded-xl overflow-hidden border border-slate-800">
        <div className="flex items-center justify-between bg-slate-900 p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
                <h2 className="text-lg font-semibold text-white">License Agreement</h2>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                </p>
            </div>
          </div>
          <FileText className="h-5 w-5 text-slate-600" />
        </div>
        
        <div className="bg-slate-950 p-1">
            <div className="h-[500px] w-full overflow-y-auto rounded-lg bg-slate-950 p-6 font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-wrap selection:bg-primary/30">
              {license ? (
                license
              ) : licenseError ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <div className="p-3 bg-red-500/10 rounded-full">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-white font-medium">Backend Procedure Missing</p>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">
                      The frontend is ready, but <code>system.getLicense</code> is not defined in your tRPC router.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-2">
                  <FileText className="h-8 w-8 text-slate-800" />
                  <p className="text-slate-500">License file is empty.</p>
                </div>
              )}
            </div>
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
// server/api/routers/system.ts (or add to existing router)
import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import si from "systeminformation";

export const systemRouter = createTRPCRouter({
  getStats: protectedProcedure.query(async () => {
    // Fetch all stats in parallel
    const [osInfo, mem, fsSize, networkInterfaces, dockerInfo] = await Promise.all([
      si.osInfo(),
      si.mem(),
      si.fsSize(),
      si.networkInterfaces(),
      si.dockerInfo(),
    ]);

    return {
      os: {
        platform: osInfo.platform,
        distro: osInfo.distro,
        release: osInfo.release,
        arch: osInfo.arch,
      },
      memory: {
        total: mem.total,
        used: mem.used,
        free: mem.free,
      },
      storage: fsSize.map(disk => ({
        fs: disk.fs,
        size: disk.size,
        used: disk.used,
        mount: disk.mount,
      })),
      network: networkInterfaces,
      docker: {
        version: dockerInfo.serverVersion,
        containers: dockerInfo.containers,
        running: dockerInfo.containersRunning,
        paused: dockerInfo.containersPaused,
        stopped: dockerInfo.containersStopped,
      }
    };
  }),
});
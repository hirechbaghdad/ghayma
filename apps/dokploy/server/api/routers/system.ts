import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import si from "systeminformation";
import fs from "node:fs";

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

  getLicense: protectedProcedure.query(async () => {
    const licensePath = "/usr/share/atlanexis/license.txt";
    try {
      if (fs.existsSync(licensePath)) {
        return fs.readFileSync(licensePath, "utf-8");
      }
      return "License file not found at /usr/share/atlanexis/license.txt";
    } catch (error) {
      console.error("Error reading license file:", error);
      throw new Error("Failed to read license file");
    }
  }),
});
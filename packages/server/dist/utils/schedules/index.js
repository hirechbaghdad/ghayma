import { schedules } from "../../db/schema/index.js";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { scheduleJob } from "./utils.js";
export const initSchedules = async () => {
    try {
        const schedulesResult = await db.query.schedules.findMany({
            where: eq(schedules.enabled, true),
            with: {
                server: true,
                application: true,
                compose: true,
                user: true,
            },
        });
        console.log(`Initializing ${schedulesResult.length} schedules`);
        for (const schedule of schedulesResult) {
            scheduleJob(schedule);
            console.log(`Initialized schedule: ${schedule.name} ${schedule.scheduleType} ✅`);
        }
    }
    catch (error) {
        console.log(`Error initializing schedules: ${error}`);
    }
};

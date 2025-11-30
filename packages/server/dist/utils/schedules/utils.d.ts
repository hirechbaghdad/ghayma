import type { Schedule } from "../../db/schema/schedule.js";
export declare const scheduleJob: (schedule: Schedule) => void;
export declare const removeScheduleJob: (scheduleId: string) => void;
export declare const runCommand: (scheduleId: string) => Promise<void>;

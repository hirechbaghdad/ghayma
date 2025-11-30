import type { LogEntry } from "./types.js";
interface HourlyData {
    hour: string;
    count: number;
}
export declare function processLogs(logString: string, dateRange?: {
    start?: string;
    end?: string;
}): HourlyData[];
interface PageInfo {
    pageIndex: number;
    pageSize: number;
}
interface SortInfo {
    id: string;
    desc: boolean;
}
export declare function parseRawConfig(rawConfig: string, page?: PageInfo, sort?: SortInfo, search?: string, status?: string[], dateRange?: {
    start?: string;
    end?: string;
}): {
    data: LogEntry[];
    totalCount: number;
};
export {};

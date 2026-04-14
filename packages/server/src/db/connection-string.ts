export const DEFAULT_DATABASE_URL =
	"postgres://atlanexis:amukds4wi9001583845717ad2@127.0.0.1:5432/atlanexis";

export const getDatabaseUrl = () =>
	process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;

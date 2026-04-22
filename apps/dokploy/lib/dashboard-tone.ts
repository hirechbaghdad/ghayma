export const DASHBOARD_TONE_STORAGE_KEY = "atlanexis-dashboard-tone";

export const DASHBOARD_TONES = [
	{
		id: "azure",
		label: "Azure",
		description: "Cool blue with a clean control-plane feel.",
		swatches: ["211 100% 50%", "193 95% 68%", "225 100% 78%"],
	},
	{
		id: "scarlet",
		label: "Scarlet",
		description: "A sharper red-magenta blend for a more energetic surface.",
		swatches: ["353 91% 58%", "10 94% 67%", "328 82% 68%"],
	},
	{
		id: "purple",
		label: "Purple",
		description: "A vivid violet gradient for a richer SaaS presentation.",
		swatches: ["270 88% 66%", "315 72% 64%", "242 89% 74%"],
	},
	{
		id: "green-lime",
		label: "Green Lime",
		description: "A bright green-lime system tone with a fresh SaaS edge.",
		swatches: ["146 72% 42%", "84 79% 54%", "162 67% 62%"],
	},
] as const;

export type DashboardTone = (typeof DASHBOARD_TONES)[number]["id"];

export const DEFAULT_DASHBOARD_TONE: DashboardTone = "azure";

export function isDashboardTone(value: string | null | undefined): value is DashboardTone {
	return DASHBOARD_TONES.some((tone) => tone.id === value);
}

export function getStoredDashboardTone(): DashboardTone {
	if (typeof window === "undefined") {
		return DEFAULT_DASHBOARD_TONE;
	}

	const storedTone = window.localStorage.getItem(DASHBOARD_TONE_STORAGE_KEY);
	return isDashboardTone(storedTone) ? storedTone : DEFAULT_DASHBOARD_TONE;
}

export function applyDashboardTone(tone: DashboardTone) {
	if (typeof document === "undefined") {
		return;
	}

	document.documentElement.dataset.dashboardTone = tone;
}

export function persistDashboardTone(tone: DashboardTone) {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(DASHBOARD_TONE_STORAGE_KEY, tone);
}

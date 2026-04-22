"use client";

import { useEffect, useState } from "react";
import {
	applyDashboardTone,
	type DashboardTone,
	DASHBOARD_TONES,
	DEFAULT_DASHBOARD_TONE,
	getStoredDashboardTone,
	isDashboardTone,
	persistDashboardTone,
} from "@/lib/dashboard-tone";

export default function useDashboardTone() {
	const [tone, setToneState] = useState<DashboardTone>(DEFAULT_DASHBOARD_TONE);

	useEffect(() => {
		const initialTone = getStoredDashboardTone();
		setToneState(initialTone);
		applyDashboardTone(initialTone);

		const handleStorage = (event: StorageEvent) => {
			if (!isDashboardTone(event.newValue)) {
				return;
			}

			setToneState(event.newValue);
			applyDashboardTone(event.newValue);
		};

		window.addEventListener("storage", handleStorage);
		return () => {
			window.removeEventListener("storage", handleStorage);
		};
	}, []);

	const setTone = (nextTone: DashboardTone) => {
		setToneState(nextTone);
		persistDashboardTone(nextTone);
		applyDashboardTone(nextTone);
	};

	return {
		tone,
		setTone,
		tones: DASHBOARD_TONES,
	};
}

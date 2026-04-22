"use client";

import { useEffect } from "react";
import { applyDashboardTone, getStoredDashboardTone } from "@/lib/dashboard-tone";

export const DashboardToneProvider = () => {
	useEffect(() => {
		applyDashboardTone(getStoredDashboardTone());
	}, []);

	return null;
};

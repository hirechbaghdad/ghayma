"use client";

import { Check, Moon, Palette, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import useDashboardTone from "@/utils/hooks/use-dashboard-tone";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const DashboardAppearance = () => {
	const { tone, setTone, tones } = useDashboardTone();
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<div className="w-full">
			<Card className="mx-auto h-full max-w-5xl rounded-xl bg-sidebar p-2.5">
				<div className="rounded-xl bg-background shadow-md">
					<CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
						<div className="space-y-1">
							<CardTitle className="flex flex-row items-center gap-2 text-xl">
								<Palette className="size-6 text-primary" />
								Dashboard Appearance
							</CardTitle>
							<CardDescription>
								Choose the dashboard accent tone. This is stored in your
								current browser.
							</CardDescription>
						</div>
						<div className="rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground">
							Current tone:{" "}
							<span className="font-semibold text-foreground">
								{tones.find((item) => item.id === tone)?.label ?? "Azure"}
							</span>
						</div>
					</CardHeader>
					<CardContent className="border-t py-6">
						<div className="mb-6 rounded-[1.35rem] border border-border/70 bg-card/70 p-4">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<p className="text-sm font-semibold text-foreground">
										Theme Mode
									</p>
									<p className="mt-1 text-xs text-muted-foreground">
										Switch between light and dark dashboard rendering.
									</p>
								</div>
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => setTheme("light")}
										className={cn(
											"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
											resolvedTheme === "light"
												? "border-primary bg-primary text-primary-foreground shadow-[0_16px_28px_hsl(var(--primary)/0.18)]"
												: "border-border/70 bg-background hover:border-primary/20 hover:bg-accent/60",
										)}
									>
										<Sun className="size-4" />
										<span>Light</span>
									</button>
									<button
										type="button"
										onClick={() => setTheme("dark")}
										className={cn(
											"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
											resolvedTheme === "dark"
												? "border-primary bg-primary text-primary-foreground shadow-[0_16px_28px_hsl(var(--primary)/0.18)]"
												: "border-border/70 bg-background hover:border-primary/20 hover:bg-accent/60",
										)}
									>
										<Moon className="size-4" />
										<span>Dark</span>
									</button>
								</div>
							</div>
						</div>

						<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
							{tones.map((option) => {
								const isActive = option.id === tone;

								return (
									<button
										key={option.id}
										type="button"
										onClick={() => setTone(option.id)}
										className={cn(
											"dashboard-tone-option rounded-[1.5rem] border p-4 text-left transition-all duration-300",
											isActive
												? "dashboard-tone-option-active border-primary/25 bg-primary/10 shadow-[0_20px_40px_hsl(var(--primary)/0.18)]"
												: "border-border/70 bg-card/65 hover:-translate-y-1 hover:border-primary/20 hover:bg-accent/60",
										)}
									>
										<div className="flex items-start justify-between gap-3">
											<div>
												<p className="text-sm font-semibold text-foreground">
													{option.label}
												</p>
												<p className="mt-1 text-xs leading-5 text-muted-foreground">
													{option.description}
												</p>
											</div>
											<div
												className={cn(
													"flex size-7 items-center justify-center rounded-full border transition-colors",
													isActive
														? "border-primary bg-primary text-primary-foreground"
														: "border-border/80 bg-background text-transparent",
												)}
											>
												<Check className="size-4" />
											</div>
										</div>

										<div className="mt-5 flex items-center gap-2">
											{option.swatches.map((swatch) => (
												<span
													key={`${option.id}-${swatch}`}
													className="size-8 rounded-full border border-white/30 shadow-sm"
													style={{ backgroundColor: `hsl(${swatch})` }}
												/>
											))}
										</div>

										<div className="mt-5 rounded-[1.2rem] border border-border/60 bg-background/75 p-3">
											<div className="flex items-center gap-2">
												<span
													className="size-3 rounded-full"
													style={{
														backgroundColor: `hsl(${option.swatches[0]})`,
													}}
												/>
												<span className="text-xs font-medium text-foreground">
													Navigation and highlights
												</span>
											</div>
											<div className="mt-3 flex items-center gap-2">
												<div
													className="h-9 flex-1 rounded-full"
													style={{
														background:
															`linear-gradient(135deg, hsl(${option.swatches[0]}), hsl(${option.swatches[1]}))`,
													}}
												/>
												<div className="h-9 w-20 rounded-full border border-border/60 bg-card/80" />
											</div>
										</div>
									</button>
								);
							})}
						</div>
					</CardContent>
				</div>
			</Card>
		</div>
	);
};

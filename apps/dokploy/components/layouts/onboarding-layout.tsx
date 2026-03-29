"use client";

import { MoonStar, SunMedium } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GithubIcon } from "../icons/data-tools-icons";
import { Logo } from "../shared/logo";
import { Button } from "../ui/button";

const supportHighlights = [
	"Secure sign-in with optional 2FA",
	"Cloud-ready onboarding and password recovery",
	"Built for fast deploys, ops, and project handoff",
];

const particles = [
	{ top: "8%", left: "12%", size: 10, delay: "0s", duration: "18s", color: "blue" },
	{ top: "18%", left: "72%", size: 14, delay: "1.2s", duration: "16s", color: "lemon" },
	{ top: "26%", left: "40%", size: 8, delay: "2.8s", duration: "20s", color: "yellow" },
	{ top: "34%", left: "82%", size: 12, delay: "0.6s", duration: "19s", color: "blue" },
	{ top: "42%", left: "16%", size: 9, delay: "3.4s", duration: "21s", color: "lemon" },
	{ top: "52%", left: "58%", size: 15, delay: "2s", duration: "17s", color: "yellow" },
	{ top: "61%", left: "8%", size: 10, delay: "4.1s", duration: "22s", color: "blue" },
	{ top: "68%", left: "73%", size: 11, delay: "1.7s", duration: "15s", color: "lemon" },
	{ top: "76%", left: "28%", size: 16, delay: "3s", duration: "18s", color: "yellow" },
	{ top: "84%", left: "87%", size: 8, delay: "4.5s", duration: "20s", color: "blue" },
	{ top: "14%", left: "54%", size: 7, delay: "1s", duration: "23s", color: "lemon" },
	{ top: "88%", left: "44%", size: 13, delay: "2.3s", duration: "16s", color: "yellow" },
] as const;

const LiveClock = () => {
	const [timeStr, setTimeStr] = useState("");

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			const utc = now.getTime() + now.getTimezoneOffset() * 60000;
			const gmtPlusOne = new Date(utc + 3600000);

			setTimeStr(
				gmtPlusOne.toLocaleTimeString("en-GB", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
				}),
			);
		};

		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	if (!timeStr) {
		return <span className="opacity-0">00:00</span>;
	}

	return <span>{timeStr} GMT+1</span>;
};

interface Props {
	children: React.ReactNode;
}

const ThemeToggle = ({ isLight }: { isLight: boolean }) => {
	const { setTheme } = useTheme();

	return (
		<div className="inline-flex items-center rounded-full border border-white/20 bg-black/10 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/10">
			<button
				type="button"
				onClick={() => setTheme("dark")}
				className={cn(
					"inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
					!isLight
						? "bg-slate-950 text-white shadow-sm"
						: "text-slate-600 hover:text-slate-900",
				)}
			>
				<MoonStar className="size-3.5" />
				Dark
			</button>
			<button
				type="button"
				onClick={() => setTheme("light")}
				className={cn(
					"inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
					isLight
						? "bg-white text-slate-900 shadow-sm"
						: "text-slate-300 hover:text-white",
				)}
			>
				<SunMedium className="size-3.5" />
				Light
			</button>
		</div>
	);
};

const particleColor = (isLight: boolean, color: (typeof particles)[number]["color"]) => {
	if (color === "blue") {
		return isLight
			? "bg-[radial-gradient(circle,_rgba(59,130,246,0.85)_0%,_rgba(59,130,246,0.18)_55%,_transparent_75%)]"
			: "bg-[radial-gradient(circle,_rgba(56,189,248,0.95)_0%,_rgba(37,99,235,0.24)_58%,_transparent_78%)]";
	}

	if (color === "lemon") {
		return isLight
			? "bg-[radial-gradient(circle,_rgba(132,204,22,0.9)_0%,_rgba(163,230,53,0.2)_55%,_transparent_75%)]"
			: "bg-[radial-gradient(circle,_rgba(190,242,100,0.95)_0%,_rgba(132,204,22,0.24)_58%,_transparent_78%)]";
	}

	return isLight
		? "bg-[radial-gradient(circle,_rgba(250,204,21,0.9)_0%,_rgba(250,204,21,0.18)_55%,_transparent_75%)]"
		: "bg-[radial-gradient(circle,_rgba(253,224,71,0.95)_0%,_rgba(234,179,8,0.24)_58%,_transparent_78%)]";
};

export const OnboardingLayout = ({ children }: Props) => {
	const { resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const isLight = mounted ? resolvedTheme === "light" : false;

	return (
		<div
			className={cn(
				"relative min-h-svh overflow-hidden transition-colors duration-700",
				isLight ? "bg-white text-slate-950" : "bg-[#07101d] text-white",
			)}
		>
			<div className="absolute inset-0 overflow-hidden">
				<div
					className={cn(
						"absolute inset-0 transition-colors duration-700",
						isLight
							? "bg-[linear-gradient(180deg,_rgba(255,255,255,0.96)_0%,_rgba(248,250,252,0.92)_100%)]"
							: "bg-[linear-gradient(180deg,_rgba(3,7,18,0.96)_0%,_rgba(10,22,40,0.95)_100%)]",
					)}
				/>
				<div
					className={cn(
						"absolute -left-20 top-16 size-80 rounded-full blur-3xl transition-opacity duration-700",
						isLight
							? "bg-[radial-gradient(circle,_rgba(59,130,246,0.28)_0%,_transparent_70%)]"
							: "bg-[radial-gradient(circle,_rgba(59,130,246,0.34)_0%,_transparent_72%)]",
					)}
				/>
				<div
					className={cn(
						"absolute right-0 top-0 size-[26rem] -translate-y-1/4 rounded-full blur-3xl transition-opacity duration-700",
						isLight
							? "bg-[radial-gradient(circle,_rgba(163,230,53,0.24)_0%,_transparent_70%)]"
							: "bg-[radial-gradient(circle,_rgba(190,242,100,0.28)_0%,_transparent_72%)]",
					)}
				/>
				<div
					className={cn(
						"absolute bottom-0 left-1/3 size-[28rem] translate-y-1/3 rounded-full blur-3xl transition-opacity duration-700",
						isLight
							? "bg-[radial-gradient(circle,_rgba(250,204,21,0.24)_0%,_transparent_70%)]"
							: "bg-[radial-gradient(circle,_rgba(253,224,71,0.28)_0%,_transparent_72%)]",
					)}
				/>
				<div
					className={cn(
						"absolute inset-0 opacity-70",
						isLight
							? "bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.12)_0,_transparent_26%),radial-gradient(circle_at_80%_18%,_rgba(163,230,53,0.14)_0,_transparent_28%),radial-gradient(circle_at_70%_78%,_rgba(250,204,21,0.15)_0,_transparent_26%)]"
							: "bg-[radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.16)_0,_transparent_26%),radial-gradient(circle_at_80%_18%,_rgba(163,230,53,0.18)_0,_transparent_28%),radial-gradient(circle_at_70%_78%,_rgba(250,204,21,0.18)_0,_transparent_26%)]",
					)}
				/>
				{particles.map((particle, index) => (
					<span
						key={`${particle.top}-${particle.left}`}
						className={cn(
							"onboarding-particle absolute rounded-full blur-[1px] opacity-90",
							particleColor(isLight, particle.color),
						)}
						style={{
							top: particle.top,
							left: particle.left,
							width: `${particle.size}px`,
							height: `${particle.size}px`,
							animationDelay: particle.delay,
							animationDuration: particle.duration,
							boxShadow: isLight
								? "0 0 28px rgba(255,255,255,0.55)"
								: "0 0 34px rgba(148,163,184,0.25)",
							transform: `translate3d(0, 0, 0) scale(${1 + (index % 3) * 0.12})`,
						}}
					/>
				))}
				<div
					className={cn(
						"absolute inset-0",
						isLight
							? "bg-[linear-gradient(to_right,rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.04)_1px,transparent_1px)]"
							: "bg-[linear-gradient(to_right,rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.05)_1px,transparent_1px)]",
					)}
					style={{ backgroundSize: "72px 72px" }}
				/>
			</div>

			<div className="relative z-10 mx-auto flex min-h-svh w-full max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
				<div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,520px)] lg:items-center">
					<aside
						className={cn(
							"hidden flex-col justify-between rounded-[2rem] border p-8 shadow-2xl backdrop-blur-xl lg:flex",
							isLight
								? "border-slate-200/70 bg-white/35"
								: "border-white/15 bg-white/[0.07]",
						)}
					>
						<div className="space-y-8">
							<Link
								href="https://atlanexis.com"
								className={cn(
									"inline-flex items-center gap-3 text-sm font-medium transition-opacity hover:opacity-80",
									isLight ? "text-slate-700" : "text-white/90",
								)}
								target="_blank"
								rel="noreferrer"
							>
								<Logo className="size-10" />
								<span>Atlanexis Cloud Appliance</span>
							</Link>

							<div className="space-y-4">
								<p
									className={cn(
										"max-w-xl text-5xl font-semibold tracking-tight",
										isLight ? "text-slate-950" : "text-white",
									)}
								>
									A focused entry point for the people who run your platform.
								</p>
								<p
									className={cn(
										"max-w-lg text-base leading-7",
										isLight ? "text-slate-600" : "text-white/70",
									)}
								>
									Sign in, finish setup, or recover access from one polished
									surface designed to keep the operational flow fast and clear.
								</p>
							</div>

							<div className="space-y-3">
								{supportHighlights.map((item) => (
									<div
										key={item}
										className={cn(
											"flex items-start gap-3 text-sm",
											isLight ? "text-slate-700" : "text-white/80",
										)}
									>
										<span
											className={cn(
												"mt-2 size-2 rounded-full",
												isLight ? "bg-slate-500/70" : "bg-white/70",
											)}
										/>
										<span>{item}</span>
									</div>
								))}
							</div>
						</div>

						<div
							className={cn(
								"flex items-end justify-between gap-4 border-t pt-8",
								isLight ? "border-slate-200/70" : "border-white/10",
							)}
						>
							<blockquote className="space-y-2">
								<p
									className={cn(
										"text-lg leading-7",
										isLight ? "text-slate-950" : "text-white",
									)}
								>
									&ldquo;The dynamic cloud for your business.&rdquo;
								</p>
								<p
									className={cn(
										"text-sm",
										isLight ? "text-slate-500" : "text-white/60",
									)}
								>
									A quiet backdrop that keeps the forms readable.
								</p>
							</blockquote>

							<div
								className={cn(
									"text-right font-mono text-sm font-medium",
									isLight ? "text-slate-600" : "text-white/80",
								)}
							>
								<LiveClock />
							</div>
						</div>
					</aside>

					<div
						className={cn(
							"onboarding-noise-panel relative w-full rounded-[2rem] border p-4 shadow-2xl backdrop-blur-2xl sm:p-6 lg:p-8",
							isLight
								? "border-white/80 bg-white/40 text-slate-950"
								: "border-white/15 bg-white/[0.10] text-white",
						)}
					>
						<div className="relative z-10">
							<div className="mb-6 flex items-center justify-between gap-4">
								<div className="flex items-center gap-3 lg:hidden">
									<Link
										href="https://atlanexis.com"
										className={cn(
											"inline-flex items-center gap-3 text-sm font-medium",
											isLight ? "text-slate-700" : "text-white/90",
										)}
										target="_blank"
										rel="noreferrer"
									>
										<Logo className="size-9" />
										<span>Atlanexis Cloud Appliance</span>
									</Link>
								</div>
								<div className="ml-auto">
									<ThemeToggle isLight={isLight} />
								</div>
							</div>

							<div className="mb-4 flex items-center justify-between gap-4 lg:hidden">
								<div
									className={cn(
										"font-mono text-xs",
										isLight ? "text-slate-500" : "text-white/60",
									)}
								>
									<LiveClock />
								</div>
							</div>

							<div
								className={cn(
									isLight
										? "[&_label]:text-slate-700 [&_input]:border-slate-300/60 [&_input]:bg-white/55 [&_input]:text-slate-950 [&_input::placeholder]:text-slate-400 [&_textarea]:border-slate-300/60 [&_textarea]:bg-white/55 [&_textarea]:text-slate-950 [&_textarea::placeholder]:text-slate-400 [&_select]:border-slate-300/60 [&_select]:bg-white/55 [&_select]:text-slate-950"
										: "[&_label]:text-white/90 [&_input]:border-white/20 [&_input]:bg-white/10 [&_input]:text-white [&_input::placeholder]:text-white/50 [&_textarea]:border-white/20 [&_textarea]:bg-white/10 [&_textarea]:text-white [&_textarea::placeholder]:text-white/50 [&_select]:border-white/20 [&_select]:bg-white/10 [&_select]:text-white",
								)}
							>
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div
				className={cn(
					"pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t to-transparent",
					isLight ? "from-white/65" : "from-black/55",
				)}
			/>

			<div className="absolute bottom-6 right-6 z-20 hidden md:block">
				<div
					className={cn(
						"max-w-xs rounded-2xl border px-4 py-3 backdrop-blur-md",
						isLight
							? "border-slate-200/70 bg-white/35"
							: "border-white/10 bg-black/20",
					)}
				>
					<p
						className={cn(
							"text-sm",
							isLight ? "text-slate-500" : "text-white/65",
						)}
					>
						Need help?
					</p>
					<Link
						href="https://atlanexis.com"
						target="_blank"
						rel="noreferrer"
						className={cn(
							"text-sm font-medium transition-opacity hover:opacity-80",
							isLight ? "text-slate-900" : "text-white",
						)}
					>
						Visit Atlanexis support
					</Link>
				</div>
			</div>

			<div className="absolute right-6 top-6 z-20 flex items-center gap-2">
				<div
					className={cn(
						"rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-md",
						isLight
							? "border-slate-200/70 bg-white/40 text-slate-600"
							: "border-white/10 bg-white/10 text-white/75",
					)}
				>
					<LiveClock />
				</div>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"border hover:text-current",
						isLight
							? "border-slate-200/70 text-slate-700 hover:bg-white/65"
							: "border-white/10 text-white hover:bg-white/15 hover:text-white",
					)}
					asChild
				>
					<Link
						href="https://github.com/hirechbaghdad"
						aria-label="GitHub"
						target="_blank"
						rel="noreferrer"
					>
						<GithubIcon className="size-5" />
					</Link>
				</Button>
				<Button
					variant="ghost"
					size="icon"
					className={cn(
						"border hover:text-current",
						isLight
							? "border-slate-200/70 text-slate-700 hover:bg-white/65"
							: "border-white/10 text-white hover:bg-white/15 hover:text-white",
					)}
					asChild
				>
					<Link
						href="https://x.com/hirechbaghdad"
						aria-label="X / Twitter"
						target="_blank"
						rel="noreferrer"
					>
						<svg
							stroke="currentColor"
							fill="currentColor"
							strokeWidth="0"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className="size-5"
						>
							<path d="M10.4883 14.651L15.25 21H22.25L14.3917 10.5223L20.9308 3H18.2808L13.1643 8.88578L8.75 3H1.75L9.26086 13.0145L2.31915 21H4.96917L10.4883 14.651ZM16.25 19L5.75 5H7.75L18.25 19H16.25Z" />
						</svg>
					</Link>
				</Button>
			</div>
		</div>
	);
};

export default OnboardingLayout;

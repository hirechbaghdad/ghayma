import React, { useEffect, useRef, useState } from "react";
import { api } from "@/utils/api";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import dynamic from "next/dynamic";

// We create a wrapper to ensure xterm only loads in the browser
const AIAgentTerminal = () => {
	const terminalRef = useRef<HTMLDivElement>(null);
	const xtermRef = useRef<any>(null);
	const isInitialized = useRef(false);
	const executeAiCommand = api.admin.executeAiAgent.useMutation();

	useEffect(() => {
		if (!terminalRef.current || isInitialized.current) return;

		// We import inside useEffect to guarantee it's client-side
		const initTerminal = async () => {
			const { Terminal } = await import("xterm");
			const { FitAddon } = await import("xterm-addon-fit");
			await import("xterm/css/xterm.css");

			const term = new Terminal({
				cursorBlink: true,
				fontFamily: '"Fira Code", monospace',
				fontSize: 14,
				theme: {
					background: "#0a0a0a",
					foreground: "#d4d4d4",
					cursor: "#f8f8f2",
				},
			});

			const fitAddon = new FitAddon();
			term.loadAddon(fitAddon);
			term.open(terminalRef.current!);
			fitAddon.fit();

			term.writeln("\x1b[35m[Atlanexis AI Agent]\x1b[0m Node context detected. Client initialized.");
			term.writeln("Ready for commands (e.g., 'deploy odoo 19 on  existing project Atlanexis')");
			term.write("\r\n\x1b[32mλ\x1b[0m ");

			let inputBuffer = "";

			term.onData(async (data) => {
				const charCode = data.charCodeAt(0);

				if (charCode === 13) { // Enter
					term.write("\r\n");
					const command = inputBuffer.trim();
					if (command) {
						term.writeln(`\x1b[90mThinking...\x1b[0m`);
						try {
							const res = await executeAiCommand.mutateAsync({ prompt: command });
							term.writeln(res.message);
						} catch (e) {
							term.writeln("\x1b[31mError: Connection failed.\x1b[0m");
						}
					}
					inputBuffer = "";
					term.write("\r\n\x1b[32mλ\x1b[0m ");
				} else if (charCode === 127) { // Backspace
					if (inputBuffer.length > 0) {
						inputBuffer = inputBuffer.slice(0, -1);
						term.write("\b \b");
					}
				} else {
					inputBuffer += data;
					term.write(data);
				}
			});

			xtermRef.current = term;
			isInitialized.current = true;

			window.addEventListener("resize", () => fitAddon.fit());
		};

		initTerminal();

		return () => {
			xtermRef.current?.dispose();
			isInitialized.current = false;
		};
	}, []);

	return (
		<div className="flex-1 rounded-xl border border-border bg-black p-4 overflow-hidden shadow-2xl">
			<div ref={terminalRef} className="h-full w-full" />
		</div>
	);
};

// Main Page Component
const AIAgentPage = () => {
	return (
		<DashboardLayout title="AI Agent">
			<div className="flex flex-col h-[calc(100vh-180px)] space-y-4">
				<AIAgentTerminal />
				<div className="text-xs text-muted-foreground px-2 italic">
					Agentic Terminal v1.0 - Connected to Atlanexis Cloud Services
				</div>
			</div>
		</DashboardLayout>
	);
};

export default AIAgentPage;
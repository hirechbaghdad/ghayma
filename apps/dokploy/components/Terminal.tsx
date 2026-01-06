import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';
import { api } from "@/utils/api"; // Adjust based on your trpc helper path

interface Props {
  serverId: string;
}

export const HostTerminal = ({ serverId }: Props) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);

  // 1. Setup the Mutation to send keystrokes to the server
  const { mutate: write } = api.server.terminalWrite.useMutation();
  const { mutate: resize } = api.server.terminalResize.useMutation();

  // 2. Setup the Subscription to receive data from the server
  api.server.terminal.useSubscription(
    { serverId },
    {
      onData: (data) => {
        xtermRef.current?.write(data);
      },
      onError: (err) => {
        console.error("Terminal Error:", err);
        xtermRef.current?.write("\r\n[Connection Error]\r\n");
      },
    }
  );

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: '#0f172a', // Matches Tailwind slate-950
        foreground: '#ffffff',
      },
      fontSize: 14,
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    // Send keystrokes to server
    term.onData((data) => {
      write({ serverId, data });
    });

    // Handle Resize
    const handleResize = () => {
      fitAddon.fit();
      resize({ serverId, cols: term.cols, rows: term.rows });
    };

    window.addEventListener('resize', handleResize);
    xtermRef.current = term;

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
  }, [serverId, write, resize]);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-4 shadow-2xl">
      <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-xs text-slate-400 font-mono ml-2">bash — {serverId}</span>
      </div>
      <div ref={terminalRef} className="h-[450px] w-full" />
    </div>
  );
};
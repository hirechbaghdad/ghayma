import type http from "node:http";
import { findServerById, validateRequest } from "@dokploy/server";
import { spawn } from "node-pty";
import { Client } from "ssh2";
import { WebSocketServer } from "ws";

const containerIdRegex = /^[a-zA-Z0-9_.-]+$/;
const allowedShells = new Set(["bash", "sh", "ash", "zsh"]);

const shellArg = (value: string) => `'${value.replace(/'/g, "'\\''")}'`;

export const setupDockerContainerTerminalWebSocketServer = (
	server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>,
) => {
	const wssTerm = new WebSocketServer({
		noServer: true,
		path: "/docker-container-terminal",
	});

	server.on("upgrade", (req, socket, head) => {
		const { pathname } = new URL(req.url || "", `http://${req.headers.host}`);

		if (pathname === "/_next/webpack-hmr") {
			return;
		}
		if (pathname === "/docker-container-terminal") {
			wssTerm.handleUpgrade(req, socket, head, function done(ws) {
				wssTerm.emit("connection", ws, req);
			});
		}
	});

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	wssTerm.on("connection", async (ws, req) => {
		const url = new URL(req.url || "", `http://${req.headers.host}`);
		const containerId = url.searchParams.get("containerId");
		const activeWay = url.searchParams.get("activeWay");
		const serverId = url.searchParams.get("serverId");
		const { user, session } = await validateRequest(req);

		if (!containerId || !containerIdRegex.test(containerId)) {
			ws.close(4000, "containerId no provided");
			return;
		}

		const shellName = activeWay || "sh";
		if (!allowedShells.has(shellName)) {
			ws.close(4000, "invalid shell");
			return;
		}

		if (!user || !session || user.role !== "owner") {
			ws.close();
			return;
		}
		try {
			if (serverId) {
				const server = await findServerById(serverId);
				if (server.organizationId !== session.activeOrganizationId) {
					ws.close();
					return;
				}
				if (!server.sshKeyId)
					throw new Error("No SSH key available for this server");

				const conn = new Client();
				let _stdout = "";
				let _stderr = "";
				conn
					.once("ready", () => {
						conn.exec(
							`docker exec -it -w / ${shellArg(containerId)} ${shellArg(shellName)}`,
							{ pty: true },
							(err, stream) => {
								if (err) throw err;

								stream
									.on("close", (code: number, _signal: string) => {
										ws.send(`\nContainer closed with code: ${code}\n`);
										conn.end();
									})
									.on("data", (data: string) => {
										_stdout += data.toString();
										ws.send(data.toString());
									})
									.stderr.on("data", (data) => {
										_stderr += data.toString();
										ws.send(data.toString());
										console.error("Error: ", data.toString());
									});

								ws.on("message", (message) => {
									try {
										let command: string | Buffer[] | Buffer | ArrayBuffer;
										if (Buffer.isBuffer(message)) {
											command = message.toString("utf8");
										} else {
											command = message;
										}
										stream.write(command.toString());
									} catch (error) {
										// @ts-ignore
										const errorMessage = error?.message as unknown as string;
										ws.send(errorMessage);
									}
								});

								ws.on("close", () => {
									stream.end();
								});
							},
						);
					})
					.connect({
						host: server.ipAddress,
						port: server.port,
						username: server.username,
						privateKey: server.sshKey?.privateKey,
					});
			} else {
				const ptyProcess = spawn(
					"docker",
					["exec", "-it", "-w", "/", containerId, shellName],
					{},
				);

				ptyProcess.onData((data) => {
					ws.send(data);
				});
				ws.on("close", () => {
					ptyProcess.kill();
				});
				ws.on("message", (message) => {
					try {
						let command: string | Buffer[] | Buffer | ArrayBuffer;
						if (Buffer.isBuffer(message)) {
							command = message.toString("utf8");
						} else {
							command = message;
						}
						ptyProcess.write(command.toString());
					} catch (error) {
						// @ts-ignore
						const errorMessage = error?.message as unknown as string;
						ws.send(errorMessage);
					}
				});
			}
		} catch (error) {
			// @ts-ignore
			const errorMessage = error?.message as unknown as string;

			ws.send(errorMessage);
		}
	});
};

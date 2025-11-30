import { exec, execFile } from "node:child_process";
import util from "node:util";
import { findServerById } from "../../services/server.js";
import { Client } from "ssh2";
import { ExecError } from "./ExecError.js";
// Re-export ExecError for easier imports
export { ExecError } from "./ExecError.js";
const execAsyncBase = util.promisify(exec);
export const execAsync = async (command, options) => {
    try {
        const result = await execAsyncBase(command, options);
        return {
            stdout: result.stdout.toString(),
            stderr: result.stderr.toString(),
        };
    }
    catch (error) {
        if (error instanceof Error) {
            // @ts-ignore - exec error has these properties
            const exitCode = error.code;
            // @ts-ignore
            const stdout = error.stdout?.toString() || "";
            // @ts-ignore
            const stderr = error.stderr?.toString() || "";
            throw new ExecError(`Command execution failed: ${error.message}`, {
                command,
                stdout,
                stderr,
                exitCode,
                originalError: error,
            });
        }
        throw error;
    }
};
export const execAsyncStream = (command, onData, options = {}) => {
    return new Promise((resolve, reject) => {
        let stdoutComplete = "";
        let stderrComplete = "";
        const childProcess = exec(command, options, (error) => {
            if (error) {
                reject(new ExecError(`Command execution failed: ${error.message}`, {
                    command,
                    stdout: stdoutComplete,
                    stderr: stderrComplete,
                    // @ts-ignore
                    exitCode: error.code,
                    originalError: error,
                }));
                return;
            }
            resolve({ stdout: stdoutComplete, stderr: stderrComplete });
        });
        childProcess.stdout?.on("data", (data) => {
            const stringData = data.toString();
            stdoutComplete += stringData;
            if (onData) {
                onData(stringData);
            }
        });
        childProcess.stderr?.on("data", (data) => {
            const stringData = data.toString();
            stderrComplete += stringData;
            if (onData) {
                onData(stringData);
            }
        });
        childProcess.on("error", (error) => {
            console.log(error);
            reject(new ExecError(`Command execution error: ${error.message}`, {
                command,
                stdout: stdoutComplete,
                stderr: stderrComplete,
                originalError: error,
            }));
        });
    });
};
export const execFileAsync = async (command, args, options = {}) => {
    const child = execFile(command, args);
    if (options.input && child.stdin) {
        child.stdin.write(options.input);
        child.stdin.end();
    }
    return new Promise((resolve, reject) => {
        let stdout = "";
        let stderr = "";
        child.stdout?.on("data", (data) => {
            stdout += data.toString();
        });
        child.stderr?.on("data", (data) => {
            stderr += data.toString();
        });
        child.on("close", (code) => {
            if (code === 0) {
                resolve({ stdout, stderr });
            }
            else {
                reject(new Error(`Command failed with code ${code}. Stderr: ${stderr}`));
            }
        });
        child.on("error", reject);
    });
};
export const execAsyncRemote = async (serverId, command, onData) => {
    if (!serverId)
        return { stdout: "", stderr: "" };
    const server = await findServerById(serverId);
    if (!server.sshKeyId)
        throw new Error("No SSH key available for this server");
    let stdout = "";
    let stderr = "";
    return new Promise((resolve, reject) => {
        const conn = new Client();
        sleep(1000);
        conn
            .once("ready", () => {
            conn.exec(command, (err, stream) => {
                if (err) {
                    onData?.(err.message);
                    reject(new ExecError(`Remote command execution failed: ${err.message}`, {
                        command,
                        serverId,
                        originalError: err,
                    }));
                    return;
                }
                stream
                    .on("close", (code, _signal) => {
                    conn.end();
                    if (code === 0) {
                        resolve({ stdout, stderr });
                    }
                    else {
                        reject(new ExecError(`Remote command failed with exit code ${code}`, {
                            command,
                            stdout,
                            stderr,
                            exitCode: code,
                            serverId,
                        }));
                    }
                })
                    .on("data", (data) => {
                    stdout += data.toString();
                    onData?.(data.toString());
                })
                    .stderr.on("data", (data) => {
                    stderr += data.toString();
                    onData?.(data.toString());
                });
            });
        })
            .on("error", (err) => {
            conn.end();
            if (err.level === "client-authentication") {
                const errorMsg = `Authentication failed: Invalid SSH private key. ❌ Error: ${err.message} ${err.level}`;
                onData?.(errorMsg);
                reject(new ExecError(errorMsg, {
                    command,
                    serverId,
                    originalError: err,
                }));
            }
            else {
                const errorMsg = `SSH connection error: ${err.message}`;
                onData?.(errorMsg);
                reject(new ExecError(errorMsg, {
                    command,
                    serverId,
                    originalError: err,
                }));
            }
        })
            .connect({
            host: server.ipAddress,
            port: server.port,
            username: server.username,
            privateKey: server.sshKey?.privateKey,
            timeout: 99999,
        });
    });
};
export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

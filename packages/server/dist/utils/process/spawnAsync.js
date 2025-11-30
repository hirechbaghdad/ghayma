import { spawn, } from "node:child_process";
import BufferList from "bl";
export const spawnAsync = (command, args, onData, // Callback opcional para manejar datos en tiempo real
options) => {
    const child = spawn(command, args ?? [], options ?? {});
    const stdout = child.stdout ? new BufferList() : new BufferList();
    const stderr = child.stderr ? new BufferList() : new BufferList();
    if (child.stdout) {
        child.stdout.on("data", (data) => {
            stdout.append(data);
            if (onData) {
                onData(data.toString());
            }
        });
    }
    if (child.stderr) {
        child.stderr.on("data", (data) => {
            stderr.append(data);
            if (onData) {
                onData(data.toString());
            }
        });
    }
    const promise = new Promise((resolve, reject) => {
        child.on("error", reject);
        child.on("close", (code) => {
            if (code === 0) {
                resolve(stdout);
            }
            else {
                const err = new Error(`${stderr.toString()}`);
                err.code = code || -1;
                err.stderr = stderr;
                err.stdout = stdout;
                reject(err);
            }
        });
    });
    promise.child = child;
    return promise;
};

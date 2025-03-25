import { exec } from 'child_process';

export function runScript(scriptPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = exec(`ts-node ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
                reject(new Error(`Execution error: ${stderr || error.message}`));
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}

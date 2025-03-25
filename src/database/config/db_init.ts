import { promises as fs } from 'fs';
import path from 'path';
import { exec } from 'child_process';

function runScript(scriptPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = exec(`ts-node ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Execution error: ${stderr || error.message}`));
            } else {
                console.log(stdout);
                resolve();
            }
        });
    });
}

async function initDatabase() {
    try {
        await runScript(path.join(__dirname, 'db_setup.ts'));
        await runScript(path.join(__dirname, 'db_seed.ts'));
        console.log('✅ Full DB initialization complete.');
    } catch (error) {
        console.error('❌ DB initialization failed:', error);
    }
}

initDatabase();

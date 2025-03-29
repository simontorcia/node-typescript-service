import dotenv from 'dotenv';
import app from './app';
import pool from './database/config/db';
import { initializeDatabase } from './database/config/dbInit';
import { dropAllTables } from './database/config/dbReset';
import logger from './utils/logger';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function initializeApp() {
    try {
        // Inizializzazione del DB (schema + seed, se abilitato)
        await initializeDatabase();
    } catch (error) {
        logger.error('❌ Database initialization failed:', error);
        throw new Error('Database initialization failed');
    }
}

async function startServer() {
    const server = app.listen(PORT, () => {
        logger.info(`🚀 Server running at http://localhost:${PORT}`);
    });

    server.on('error', (error) => {
        logger.error('❌ Error during server startup:', error);
        process.exit(1);
    });

    return server;
}

async function gracefulShutdown(server: any) {
    let isShuttingDown = false;

    if (isShuttingDown) return;
    isShuttingDown = true;

    logger.info('⏳ Gracefully shutting down...');

    try {
        if (process.env.DB_RESET_ON_EXIT === 'true') {
            await dropAllTables();
        }

        await pool.end();
        logger.info('✅ DB connection closed.');

        server.close(() => {
            logger.info('🛑 Express server closed.');
            process.exit(0);
        });
    } catch (err) {
        logger.error('❌ Error during shutdown:', err);
        process.exit(1);
    }
}

async function main() {
    try {
        await initializeApp();

        const server = await startServer();

        // Catch termination signals
        process.on('SIGINT', () => gracefulShutdown(server));
        process.on('SIGTERM', () => gracefulShutdown(server));
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

main();

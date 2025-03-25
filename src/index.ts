import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import pool from './database/config/db';
import { initializeDatabase } from './database/config/dbInit';
import { dropAllTables } from './database/config/dbReset';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

// Flag per evitare shutdown multipli
let isShuttingDown = false;

async function startServer() {
    try {
        // Inizializzazione del DB (schema + seed, se abilitato)
        await initializeDatabase();

        // Avvio del server Express
        const server = app.listen(PORT, () => {
            logger.info(`🚀 Server running at http://localhost:${PORT}`);
        });

        // Graceful shutdown
        async function gracefulShutdown() {
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

        // Catch termination signals
        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
    } catch (error) {
        logger.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

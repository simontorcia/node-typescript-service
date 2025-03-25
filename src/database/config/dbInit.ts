import { setupDatabase } from './dbSetup';
import { seedDatabase } from './dbSeed';

export async function initializeDatabase() {
    if (process.env.DB_INIT !== 'true') {
        console.log('ℹ️ DB_INIT not set to true, skipping DB initialization.');
        return;
    }

    await setupDatabase();
    await seedDatabase();

    console.log('✅ Full DB initialization complete.');
}

// 👇 se il file viene lanciato direttamente, eseguilo!
if (require.main === module) {
    initializeDatabase().catch((err) => {
        console.error('❌ DB initialization failed:', err);
        process.exit(1);
    });
}

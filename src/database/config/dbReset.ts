import pool from './db';

export async function dropAllTables() {
    try {
        await pool.query('SET FOREIGN_KEY_CHECKS = 0');

        const [tables]: any = await pool.query("SHOW TABLES");
        const tableNames = tables.map((row: any) => Object.values(row)[0]);

        for (const table of tableNames) {
            await pool.query(`DROP TABLE IF EXISTS \`${table}\``);
        }

        await pool.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('🗑️ All tables dropped.');
    } catch (error) {
        console.error('❌ Error while dropping tables:', error);
    }
}

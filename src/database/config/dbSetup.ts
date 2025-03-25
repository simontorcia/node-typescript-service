import { promises as fs } from 'fs';
import path from 'path';
import pool from './db';

export async function setupDatabase() {
    try {
        const [rows] = await pool.query("SHOW TABLES LIKE 'users'");
        if ((rows as any[]).length > 0) {
            console.log('ℹ️ Tables already exist. Skipping schema setup.');
            return;
        }

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = await fs.readFile(schemaPath, 'utf-8');
        await pool.query(schema);

        console.log('✅ Database schema created successfully.');
    } catch (error) {
        console.error('❌ Error setting up database schema:', error);
        throw error;
    }
}

import { promises as fs } from 'fs';
import path from 'path';
import pool from './db';

async function setupDatabase() {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf-8');

    try {
        await pool.query(schema);
        console.log('✅ Database schema created successfully.');
    } catch (error) {
        console.error('❌ Error setting up database schema:', error);
    }
}

setupDatabase();

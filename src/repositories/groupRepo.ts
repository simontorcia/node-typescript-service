import pool from '../database/config/db';
import { Group, PaginatedGroups } from '../models/Group';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { COUNT_GROUPS, DELETE_GROUP, GET_ALL_GROUPS, GET_GROUP_BY_ID, GET_GROUPS_PAGINATED, INSERT_GROUP, UPDATE_GROUP } from '../database/queries/group';

export class GroupRepo {

    private static async handleDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            console.error('Errore durante l\'operazione sul database:', error);
            throw error;
        }
    }

    static async createGroup(name: string): Promise<number> {
        return this.handleDatabaseOperation(async () => {
            const [result] = await pool.execute<ResultSetHeader>(INSERT_GROUP, [name]);
            return result.insertId;
        });
    }

    static async deleteGroup(id: number): Promise<boolean> {
        return this.handleDatabaseOperation(async () => {
            const [result] = await pool.execute<ResultSetHeader>(DELETE_GROUP, [id]);
            return result.affectedRows > 0;
        });
    }

    static async getGroupById(id: number): Promise<Group | null> {
        return this.handleDatabaseOperation(async () => {
            const [rows] = await pool.execute<RowDataPacket[]>(GET_GROUP_BY_ID, [id]);
            return rows.length > 0 ? rows[0] as Group : null;
        });
    }

    static async getGroups(limit: number, offset: number): Promise<PaginatedGroups> {
        return this.handleDatabaseOperation(async () => {
            const [rows] = await pool.query<RowDataPacket[]>(GET_GROUPS_PAGINATED, [limit, offset]);
            const [countRows] = await pool.execute<RowDataPacket[]>(COUNT_GROUPS);
            return {
                data: rows as Group[],
                total: countRows[0].total
            };
        });
    }

    static async updateGroup(id: number, name: string): Promise<boolean> {
        return this.handleDatabaseOperation(async () => {
            const [result] = await pool.execute<ResultSetHeader>(UPDATE_GROUP('name = ?'), [name, id]);
            return result.affectedRows > 0;
        });
    }
}
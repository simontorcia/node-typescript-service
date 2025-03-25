import pool from '../database/config/db';
import { User, PaginatedUsers } from '../models/User';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { INSERT_USER, DELETE_USER, GET_USER_BY_ID, GET_USERS_PAGINATED, COUNT_USERS } from '../database/queries/user';

export class UserRepo {

    private static async handleDatabaseOperation<T>(operation: () => Promise<T>): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            console.error('Errore durante l\'operazione sul database:', error);
            throw error;
        }
    }

    static async createUser(user: Readonly<User>): Promise<number> {
        return this.handleDatabaseOperation(async () => {
            const { name, surname, birth_date, sex } = user;
            console.log('Valore di sex:', sex); // Aggiungi questa riga
            const [result] = await pool.execute<ResultSetHeader>(INSERT_USER, [name, surname, birth_date, sex]);
            return result.insertId;
        });
    }

    static async deleteUser(id: number): Promise<boolean> {
        return this.handleDatabaseOperation(async () => {
            const [result] = await pool.execute<ResultSetHeader>(DELETE_USER, [id]);
            return result.affectedRows > 0;
        });
    }

    static async getUserById(id: number): Promise<User | null> {
        return this.handleDatabaseOperation(async () => {
            const [rows] = await pool.execute<RowDataPacket[]>(GET_USER_BY_ID, [id]);
            return rows.length > 0 ? rows[0] as User : null;
        });
    }

    static async getUsers(limit: number, offset: number): Promise<PaginatedUsers> {
        return this.handleDatabaseOperation(async () => {
            const [rows] = await pool.query<RowDataPacket[]>(GET_USERS_PAGINATED, [limit, offset]);
            const [countRows] = await pool.query<RowDataPacket[]>(COUNT_USERS);
            return {
                data: rows as User[],
                total: countRows[0].total
            };
        });
    }

    static async updateUser(id: number, updates: Partial<User>): Promise<boolean> {
        return this.handleDatabaseOperation(async () => {
            if (Object.keys(updates).length === 0) {
                return false;
            }

            const setClause = Object.keys(updates).map(field => `${field} = ?`).join(', ');
            const values = [...Object.values(updates), id];

            const query = `UPDATE users SET ${setClause} WHERE id = ?`;
            const [result] = await pool.execute<ResultSetHeader>(query, values);
            return result.affectedRows > 0;
        });
    }
}
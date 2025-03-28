import { User, PaginatedUsers } from '../models/User';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import {
    INSERT_USER,
    DELETE_USER,
    GET_USER_BY_ID,
    GET_USERS_PAGINATED,
    COUNT_USERS,
    GET_USER_BY_EMAIL
} from '../database/queries/userQueries';
import pool from '../database/config/db';
import logger from '../utils/logger';

export class UserRepository {
    private static async handleDatabaseOperation<T>(operation: () => Promise<T>, context: string): Promise<T> {
        try {
            return await operation();
        } catch (error) {
            logger.error(`💥 DB Error in ${context}:`, error);
            throw error;
        }
    }

    static async createUser(user: User): Promise<number> {
        return this.handleDatabaseOperation(async () => {
            const { name, surname, birth_date, sex, email, password } = user;
            logger.info(`[UserRepository] Inserting user: ${name} ${surname} ${email}`);
            const [result] = await pool.execute<ResultSetHeader>(INSERT_USER, [name, surname, birth_date, sex, email, password]);
            return result.insertId;
        }, 'createUser');
    }

    static async deleteUser(id: number): Promise<boolean> {
        return this.handleDatabaseOperation(async () => {
            logger.info(`[UserRepository] Deleting user ID: ${id}`);
            const [result] = await pool.execute<ResultSetHeader>(DELETE_USER, [id]);
            return result.affectedRows > 0;
        }, 'deleteUser');
    }

    static async getUserById(id: number): Promise<User | null> {
        return this.handleDatabaseOperation(async () => {
            logger.debug(`[UserRepository] Fetching user by ID: ${id}`);
            const [rows] = await pool.execute<RowDataPacket[]>(GET_USER_BY_ID, [id]);
            return rows.length > 0 ? rows[0] as User : null;
        }, 'getUserById');
    }

    static async getUsers(limit: number, offset: number): Promise<PaginatedUsers> {
        return this.handleDatabaseOperation(async () => {
            logger.debug(`[UserRepository] Fetching users: limit=${limit}, offset=${offset}`);
            const [rows] = await pool.query<RowDataPacket[]>(GET_USERS_PAGINATED, [limit, offset]);
            const [countRows] = await pool.query<RowDataPacket[]>(COUNT_USERS);
            return {
                data: rows as User[],
                total: countRows[0].total
            };
        }, 'getUsers');
    }

    static async updateUser(id: number, updates: Partial<User>): Promise<boolean> {
        return this.handleDatabaseOperation(async () => {
            if (Object.keys(updates).length === 0) {
                logger.warn(`[UserRepository] updateUser called with empty updates for ID: ${id}`);
                return false;
            }

            const setClause = Object.keys(updates).map(field => `${field} = ?`).join(', ');
            const values = [...Object.values(updates), id];
            const query = `UPDATE users SET ${setClause} WHERE id = ?`;

            logger.info(`[UserRepository] Updating user ID: ${id} with fields:`, updates);

            const [result] = await pool.execute<ResultSetHeader>(query, values);
            return result.affectedRows > 0;
        }, 'updateUser');
    }

    static async getUserByEmail(email: string): Promise<User | null> {
        return this.handleDatabaseOperation(async () => {
            logger.debug(`[UserRepository] Fetching user by email: ${email}`);
            const [rows] = await pool.execute<RowDataPacket[]>(GET_USER_BY_EMAIL, [email]);
            return rows.length > 0 ? rows[0] as User : null;
        }, 'getUserByEmail');
    }
}

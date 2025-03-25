import pool from '../database/config/db';
import { PaginatedUsers, User } from '../models/User';
import { RowDataPacket } from 'mysql2/promise';
import {
    CHECK_GROUP_EXISTS,
    CHECK_USER_EXISTS,
    CHECK_USER_GROUP_RELATION,
    DELETE_USER_GROUP,
    GET_GROUP_USERS_PAGINATED,
    GET_USER_GROUPS_PAGINATED,
    INSERT_USER_GROUP,
    COUNT_GROUP_USERS,
    COUNT_USER_GROUPS
} from '../database/queries/userGroup';
import { Group, PaginatedGroups } from '../models/Group';

export class UserGroupRepo {

    private static async checkExists(query: string, id: number, entity: string): Promise<boolean> {
        const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
        return rows.length > 0;
    }

    static async addUserToGroup(userId: number, groupId: number): Promise<'success' | 'alreadyJoined' | 'notFound'> {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            if (!await this.checkExists(CHECK_USER_EXISTS, userId, 'User') || !await this.checkExists(CHECK_GROUP_EXISTS, groupId, 'Group')) {
                return 'notFound';
            }

            const [existing] = await connection.query<RowDataPacket[]>(CHECK_USER_GROUP_RELATION, [userId, groupId]);
            if (existing.length > 0) {
                return 'alreadyJoined';
            }

            await connection.query(INSERT_USER_GROUP, [userId, groupId]);
            await connection.commit();
            return 'success';
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }

    static async getGroupUsers(groupId: number, limit: number = 10, offset: number = 0): Promise<PaginatedUsers | null> {
        if (!await this.checkExists(CHECK_GROUP_EXISTS, groupId, 'Group')) {
            return null;
        }

        const [rows] = await pool.execute<RowDataPacket[]>(GET_GROUP_USERS_PAGINATED, [groupId, limit, offset]);
        const [countRows] = await pool.execute<RowDataPacket[]>(COUNT_GROUP_USERS, [groupId]);

        return {
            data: rows as User[],
            total: countRows[0].total
        };
    }

    static async getUserGroups(userId: number, limit: number = 10, offset: number = 0): Promise<PaginatedGroups | null> {
        if (!await this.checkExists(CHECK_USER_EXISTS, userId, 'User')) {
            return null;
        }

        const [rows] = await pool.execute<RowDataPacket[]>(GET_USER_GROUPS_PAGINATED, [userId, limit, offset]);
        const [countRows] = await pool.execute<RowDataPacket[]>(COUNT_USER_GROUPS, [userId]);

        return {
            data: rows as Group[],
            total: countRows[0].total
        };
    }

    static async removeUserFromGroup(userId: number, groupId: number): Promise<'success' | 'notJoined' | 'notFound'> {
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            if (!await this.checkExists(CHECK_USER_EXISTS, userId, 'User') || !await this.checkExists(CHECK_GROUP_EXISTS, groupId, 'Group')) {
                return 'notFound';
            }

            const [existingRows] = await connection.query<RowDataPacket[]>(CHECK_USER_GROUP_RELATION, [userId, groupId]);
            if (existingRows.length === 0) {
                return 'notJoined';
            }

            await connection.query(DELETE_USER_GROUP, [userId, groupId]);
            await connection.commit();
            return 'success';
        } catch (err) {
            await connection.rollback();
            throw err;
        } finally {
            connection.release();
        }
    }
}
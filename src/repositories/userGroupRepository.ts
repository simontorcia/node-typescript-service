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
} from '../database/queries/userGroupQueries';
import { Group, PaginatedGroups } from '../models/Group';
import pool from '../database/config/db';
import logger from '../utils/logger';

export class UserGroupRepository {
    private static async checkExists(query: string, id: number, entity: string): Promise<boolean> {
        logger.debug(`[UserGroupRepository] Checking existence of ${entity} ID: ${id}`);
        const [rows] = await pool.execute<RowDataPacket[]>(query, [id]);
        const exists = rows.length > 0;
        logger.debug(`[UserGroupRepository] ${entity} ID ${id} exists: ${exists}`);
        return exists;
    }

    static async addUserToGroup(userId: number, groupId: number): Promise<'success' | 'alreadyJoined' | 'notFound'> {
        logger.info(`[UserGroupRepository] Adding user ${userId} to group ${groupId}`);
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const userExists = await this.checkExists(CHECK_USER_EXISTS, userId, 'User');
            const groupExists = await this.checkExists(CHECK_GROUP_EXISTS, groupId, 'Group');
            if (!userExists || !groupExists) {
                logger.warn(`[UserGroupRepository] User or Group not found for add (user=${userId}, group=${groupId})`);
                return 'notFound';
            }

            const [existing] = await connection.query<RowDataPacket[]>(CHECK_USER_GROUP_RELATION, [userId, groupId]);
            if (existing.length > 0) {
                logger.warn(`[UserGroupRepository] User ${userId} is already in group ${groupId}`);
                return 'alreadyJoined';
            }

            await connection.query(INSERT_USER_GROUP, [userId, groupId]);
            await connection.commit();

            logger.info(`[UserGroupRepository] User ${userId} successfully added to group ${groupId}`);
            return 'success';
        } catch (err) {
            await connection.rollback();
            logger.error(`💥 Error in addUserToGroup:`, err);
            throw err;
        } finally {
            connection.release();
        }
    }

    static async getGroupUsers(groupId: number, limit = 10, offset = 0): Promise<PaginatedUsers | null> {
        logger.debug(`[UserGroupRepository] Fetching users of group ${groupId} (limit=${limit}, offset=${offset})`);
        const groupExists = await this.checkExists(CHECK_GROUP_EXISTS, groupId, 'Group');
        if (!groupExists) {
            logger.warn(`[UserGroupRepository] Group ID ${groupId} not found`);
            return null;
        }

        const [rows] = await pool.execute<RowDataPacket[]>(GET_GROUP_USERS_PAGINATED, [groupId, limit, offset]);
        const [countRows] = await pool.execute<RowDataPacket[]>(COUNT_GROUP_USERS, [groupId]);

        return {
            data: rows as User[],
            total: countRows[0].total
        };
    }

    static async getUserGroups(userId: number, limit = 10, offset = 0): Promise<PaginatedGroups | null> {
        logger.debug(`[UserGroupRepository] Fetching groups of user ${userId} (limit=${limit}, offset=${offset})`);
        const userExists = await this.checkExists(CHECK_USER_EXISTS, userId, 'User');
        if (!userExists) {
            logger.warn(`[UserGroupRepository] User ID ${userId} not found`);
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
        logger.info(`[UserGroupRepository] Removing user ${userId} from group ${groupId}`);
        const connection = await pool.getConnection();

        try {
            await connection.beginTransaction();

            const userExists = await this.checkExists(CHECK_USER_EXISTS, userId, 'User');
            const groupExists = await this.checkExists(CHECK_GROUP_EXISTS, groupId, 'Group');
            if (!userExists || !groupExists) {
                logger.warn(`[UserGroupRepository] User or Group not found for removal (user=${userId}, group=${groupId})`);
                return 'notFound';
            }

            const [existingRows] = await connection.query<RowDataPacket[]>(CHECK_USER_GROUP_RELATION, [userId, groupId]);
            if (existingRows.length === 0) {
                logger.warn(`[UserGroupRepository] User ${userId} is not in group ${groupId}`);
                return 'notJoined';
            }

            await connection.query(DELETE_USER_GROUP, [userId, groupId]);
            await connection.commit();

            logger.info(`[UserGroupRepository] User ${userId} removed from group ${groupId}`);
            return 'success';
        } catch (err) {
            await connection.rollback();
            logger.error(`💥 Error in removeUserFromGroup:`, err);
            throw err;
        } finally {
            connection.release();
        }
    }
}

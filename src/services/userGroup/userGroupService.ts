import { PaginatedUsers } from '../../models/User';
import { PaginatedGroups } from '../../models/Group';
import { AlreadyJoinedError, NotFoundError, NotJoinedError } from '../../errors';
import { UserGroupRepository } from '../../repositories/userGroupRepository';
import logger from '../../utils/logger';

export class UserGroupService {
    static async addUserToGroup(userId: number, groupId: number): Promise<void> {
        logger.info(`[UserGroupService] Adding user ${userId} to group ${groupId}`);

        const result = await UserGroupRepository.addUserToGroup(userId, groupId);

        if (result === 'alreadyJoined') {
            logger.warn(`[UserGroupService] User ${userId} is already in group ${groupId}`);
            throw new AlreadyJoinedError(`User ${userId} is already in group ${groupId}`);
        }

        if (result === 'notFound') {
            logger.warn(`[UserGroupService] User or Group not found for join (user=${userId}, group=${groupId})`);
            throw new NotFoundError(`User or Group not found`);
        }

        logger.info(`[UserGroupService] User ${userId} added to group ${groupId}`);
    }

    static async getGroupUsers(groupId: number, limit = 10, offset = 0): Promise<PaginatedUsers> {
        logger.debug(`[UserGroupService] Fetching users for group ${groupId} with limit=${limit}, offset=${offset}`);
        const result = await UserGroupRepository.getGroupUsers(groupId, limit, offset);

        if (!result) {
            logger.warn(`[UserGroupService] Group ${groupId} not found`);
            throw new NotFoundError(`Group with ID ${groupId} not found`);
        }

        return result;
    }

    static async getUserGroups(userId: number, limit = 10, offset = 0): Promise<PaginatedGroups> {
        logger.debug(`[UserGroupService] Fetching groups for user ${userId} with limit=${limit}, offset=${offset}`);
        const result = await UserGroupRepository.getUserGroups(userId, limit, offset);

        if (!result) {
            logger.warn(`[UserGroupService] User ${userId} not found`);
            throw new NotFoundError(`User with ID ${userId} not found`);
        }

        return result;
    }

    static async removeUserFromGroup(userId: number, groupId: number): Promise<void> {
        logger.info(`[UserGroupService] Removing user ${userId} from group ${groupId}`);

        const result = await UserGroupRepository.removeUserFromGroup(userId, groupId);

        if (result === 'notJoined') {
            logger.warn(`[UserGroupService] User ${userId} is not in group ${groupId}`);
            throw new NotJoinedError(`User ${userId} is not in group ${groupId}`);
        }

        if (result === 'notFound') {
            logger.warn(`[UserGroupService] User or Group not found for removal (user=${userId}, group=${groupId})`);
            throw new NotFoundError(`User or Group not found`);
        }

        logger.info(`[UserGroupService] User ${userId} removed from group ${groupId}`);
    }
}

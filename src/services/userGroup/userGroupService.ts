import { PaginatedUsers } from '../../models/User';
import { AlreadyJoinedError, NotFoundError, NotJoinedError } from '../../errors/Error';
import { PaginatedGroups } from '../../models/Group';
import { UserGroupRepository } from '../../repositories/userGroupRepository';

export class UserGroupService {

    static async addUserToGroup(userId: number, groupId: number): Promise<void> {
        const result = await UserGroupRepository.addUserToGroup(userId, groupId);
        if (result === 'alreadyJoined') {
            throw new AlreadyJoinedError(`User ${userId} is already in group ${groupId}`);
        }
        if (result === 'notFound') {
            throw new NotFoundError(`User or Group not found`);
        }
    }

    static async getGroupUsers(groupId: number, limit: number = 10, offset: number = 0): Promise<PaginatedUsers> {
        const result = await UserGroupRepository.getGroupUsers(groupId, limit, offset);
        if (!result) {
            throw new NotFoundError(`Group with ID ${groupId} not found`);
        }
        return result;
    }

    static async getUserGroups(userId: number, limit: number = 10, offset: number = 0): Promise<PaginatedGroups> {
        const result = await UserGroupRepository.getUserGroups(userId, limit, offset);
        if (!result) {
            throw new NotFoundError(`User with ID ${userId} not found`);
        }
        return result;
    }

    static async removeUserFromGroup(userId: number, groupId: number): Promise<void> {
        const result = await UserGroupRepository.removeUserFromGroup(userId, groupId);
        if (result === 'notJoined') {
            throw new NotJoinedError(`User ${userId} is not in group ${groupId}`);
        }
        if (result === 'notFound') {
            throw new NotFoundError(`User or Group not found`);
        }
    }
}
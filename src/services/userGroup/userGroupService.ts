import { UserGroupRepo } from '../../repositories/userGroupRepo';
import { PaginatedUsers } from '../../models/User';
import { AlreadyJoinedError, NotFoundError, NotJoinedError } from '../../models/Error';
import { PaginatedGroups } from '../../models/Group';

export class UserGroupService {

    static async addUserToGroup(userId: number, groupId: number): Promise<void> {
        const result = await UserGroupRepo.addUserToGroup(userId, groupId);
        if (result === 'alreadyJoined') {
            throw new AlreadyJoinedError(`User ${userId} is already in group ${groupId}`);
        }
        if (result === 'notFound') {
            throw new NotFoundError(`User or Group not found`);
        }
    }

    static async getGroupUsers(groupId: number, limit: number = 10, offset: number = 0): Promise<PaginatedUsers> {
        const result = await UserGroupRepo.getGroupUsers(groupId, limit, offset);
        if (!result) {
            throw new NotFoundError(`Group with ID ${groupId} not found`);
        }
        return result;
    }

    static async getUserGroups(userId: number, limit: number = 10, offset: number = 0): Promise<PaginatedGroups> {
        const result = await UserGroupRepo.getUserGroups(userId, limit, offset);
        if (!result) {
            throw new NotFoundError(`User with ID ${userId} not found`);
        }
        return result;
    }

    static async removeUserFromGroup(userId: number, groupId: number): Promise<void> {
        const result = await UserGroupRepo.removeUserFromGroup(userId, groupId);
        if (result === 'notJoined') {
            throw new NotJoinedError(`User ${userId} is not in group ${groupId}`);
        }
        if (result === 'notFound') {
            throw new NotFoundError(`User or Group not found`);
        }
    }
}
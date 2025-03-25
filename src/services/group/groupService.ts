import { GroupRepository } from '../../repositories/groupRepository';
import { Group, PaginatedGroups } from '../../models/Group';
import { NotFoundError } from '../../errors';
import logger from '../../utils/logger';

export class GroupService {
    static async createGroup(name: string): Promise<number> {
        logger.info(`[GroupService] Creating group: ${name}`);
        const groupId = await GroupRepository.createGroup(name);
        logger.info(`[GroupService] Created group ID: ${groupId}`);
        return groupId;
    }

    static async deleteGroup(id: number): Promise<void> {
        logger.info(`[GroupService] Deleting group ID: ${id}`);
        const result = await GroupRepository.deleteGroup(id);
        if (!result) {
            logger.warn(`[GroupService] Group ID ${id} not found for deletion`);
            throw new NotFoundError(`Group with ID ${id} not found`);
        }
        logger.info(`[GroupService] Group ID ${id} deleted`);
    }

    static async getGroupById(id: number): Promise<Group> {
        logger.debug(`[GroupService] Fetching group by ID: ${id}`);
        const group = await GroupRepository.getGroupById(id);
        if (!group) {
            logger.warn(`[GroupService] Group ID ${id} not found`);
            throw new NotFoundError(`Group with ID ${id} not found`);
        }
        return group;
    }

    static async getGroups(limit: number, offset: number): Promise<PaginatedGroups> {
        logger.debug(`[GroupService] Fetching groups with limit=${limit}, offset=${offset}`);
        return GroupRepository.getGroups(limit, offset);
    }

    static async updateGroup(id: number, name: string): Promise<void> {
        logger.info(`[GroupService] Updating group ID: ${id} with name: ${name}`);
        const result = await GroupRepository.updateGroup(id, name);
        if (!result) {
            logger.warn(`[GroupService] Group ID ${id} not found for update`);
            throw new NotFoundError(`Group with ID ${id} not found`);
        }
        logger.info(`[GroupService] Group ID ${id} updated`);
    }
}

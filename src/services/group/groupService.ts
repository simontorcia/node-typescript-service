import { GroupRepo } from '../../repositories/groupRepo';
import { Group, PaginatedGroups } from '../../models/Group';
import { NotFoundError } from '../../models/Error';

export class GroupService {

    static async createGroup(name: string): Promise<number> {
        return GroupRepo.createGroup(name);
    }

    static async deleteGroup(id: number): Promise<void> {
        const result = await GroupRepo.deleteGroup(id);
        if (!result) {
            throw new NotFoundError(`Group with ID ${id} not found`);
        }
    }

    static async getGroupById(id: number): Promise<Group> {
        const group = await GroupRepo.getGroupById(id);
        if (!group) {
            throw new NotFoundError(`Group with ID ${id} not found`);
        }
        return group;
    }

    static async getGroups(limit: number, offset: number): Promise<PaginatedGroups> {
        return GroupRepo.getGroups(limit, offset);
    }

    static async updateGroup(id: number, name: string): Promise<void> {
        const result = await GroupRepo.updateGroup(id, name);
        if (!result) {
            throw new NotFoundError(`Group with ID ${id} not found`);
        }
    }
}
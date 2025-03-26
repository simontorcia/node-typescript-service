import { GroupService } from './groupService';
import { GroupRepository } from '../../repositories/groupRepository';
import { Group, PaginatedGroups } from '../../models/Group';
import { NotFoundError } from '../../errors/customErrors';

// Mocking GroupRepository
jest.mock('../../repositories/groupRepository');


describe('GroupService', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
    });

    describe('createGroup', () => {
        it('should call GroupRepository.createGroup with the correct group name', async () => {
            const groupName = 'Test Group';
            const mockGroupId = 123;
            (GroupRepository.createGroup as jest.Mock).mockResolvedValue(mockGroupId);

            const result = await GroupService.createGroup(groupName);

            expect(GroupRepository.createGroup).toHaveBeenCalledWith(groupName);
            expect(result).toBe(mockGroupId);
        });

        it('should handle errors from GroupRepository.createGroup', async () => {
            const groupName = 'Test Group';
            const mockError = new Error('Database error');
            (GroupRepository.createGroup as jest.Mock).mockRejectedValue(mockError);

            await expect(GroupService.createGroup(groupName)).rejects.toThrow('Database error');
        });
    });

    describe('getGroupById', () => {
        it('should call GroupRepository.getGroupById with the correct ID', async () => {
            const mockGroup: Group = {
                id: 1,
                name: 'Test Group',
                created_at: new Date('2023-10-26T00:00:00Z')
            };
            (GroupRepository.getGroupById as jest.Mock).mockResolvedValue(mockGroup);

            const result = await GroupService.getGroupById(1);

            expect(GroupRepository.getGroupById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockGroup);
        });

        it('should throw NotFoundError if GroupRepository.getGroupById returns null', async () => {
            (GroupRepository.getGroupById as jest.Mock).mockResolvedValue(null);

            await expect(GroupService.getGroupById(1)).rejects.toThrow(NotFoundError);
            await expect(GroupService.getGroupById(1)).rejects.toThrow('Group with ID 1 not found');
        });

        it('should throw an error if the id is not valid', async () => {
            await expect(GroupService.getGroupById(0)).rejects.toThrow(NotFoundError);
            await expect(GroupService.getGroupById(0)).rejects.toThrow('Group with ID 0 not found');
            await expect(GroupService.getGroupById(-1)).rejects.toThrow(NotFoundError);
            await expect(GroupService.getGroupById(-1)).rejects.toThrow('Group with ID -1 not found');
        });
    });

    describe('getGroups', () => {
        it('should call GroupRepository.getGroups with the correct limit and offset', async () => {
            const mockGroups: PaginatedGroups = {
                data: [],
                total: 0,
            };
            (GroupRepository.getGroups as jest.Mock).mockResolvedValue(mockGroups);

            await GroupService.getGroups(10, 0);

            expect(GroupRepository.getGroups).toHaveBeenCalledWith(10, 0);
        });

        it('should return the data from GroupRepository.getGroups', async () => {
            const mockGroups: PaginatedGroups = {
                data: [{
                    id: 1,
                    name: "Test Group",
                    created_at: new Date('2023-10-26T00:00:00Z')
                }],
                total: 1,
            };
            (GroupRepository.getGroups as jest.Mock).mockResolvedValue(mockGroups);

            const result = await GroupService.getGroups(10, 0);

            expect(result).toBe(mockGroups);
        });
    });

    describe('updateGroup', () => {
        it('should call GroupRepository.updateGroup with the correct ID and group name', async () => {
            const updatesName = 'Updated Group Name';
            (GroupRepository.updateGroup as jest.Mock).mockResolvedValue(true);

            await GroupService.updateGroup(1, updatesName);

            expect(GroupRepository.updateGroup).toHaveBeenCalledWith(1, updatesName);
        });

        it('should throw NotFoundError if GroupRepository.updateGroup returns false', async () => {
            const updatesName = 'Updated Group Name';
            (GroupRepository.updateGroup as jest.Mock).mockResolvedValue(false);

            await expect(GroupService.updateGroup(1, updatesName)).rejects.toThrow(NotFoundError);
            await expect(GroupService.updateGroup(1, updatesName)).rejects.toThrow('Group with ID 1 not found');
        });
    });

    describe('deleteGroup', () => {
        it('should call GroupRepository.deleteGroup with the correct ID', async () => {
            (GroupRepository.deleteGroup as jest.Mock).mockResolvedValue(true);

            await GroupService.deleteGroup(1);

            expect(GroupRepository.deleteGroup).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundError if GroupRepository.deleteGroup returns false', async () => {
            (GroupRepository.deleteGroup as jest.Mock).mockResolvedValue(false);

            await expect(GroupService.deleteGroup(1)).rejects.toThrow(NotFoundError);
            await expect(GroupService.deleteGroup(1)).rejects.toThrow('Group with ID 1 not found');
        });
    });
});

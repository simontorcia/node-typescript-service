import { GroupService } from './groupService';
import { GroupRepo } from '../../repositories/groupRepo';
import { Group, PaginatedGroups } from '../../models/Group';
import { NotFoundError } from '../../models/Error';

// Mocking GroupRepo
jest.mock('../../repositories/groupRepo');

// Mocking DB
jest.mock('../../database/config/db', () => ({
    connect: jest.fn(),
    query: jest.fn(),
}));

describe('GroupService', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
    });

    describe('createGroup', () => {
        it('should call GroupRepo.createGroup with the correct group name', async () => {
            const groupName = 'Test Group';
            const mockGroupId = 123;
            (GroupRepo.createGroup as jest.Mock).mockResolvedValue(mockGroupId);

            const result = await GroupService.createGroup(groupName);

            expect(GroupRepo.createGroup).toHaveBeenCalledWith(groupName);
            expect(result).toBe(mockGroupId);
        });

        it('should handle errors from GroupRepo.createGroup', async () => {
            const groupName = 'Test Group';
            const mockError = new Error('Database error');
            (GroupRepo.createGroup as jest.Mock).mockRejectedValue(mockError);

            await expect(GroupService.createGroup(groupName)).rejects.toThrow('Database error');
        });
    });

    describe('getGroupById', () => {
        it('should call GroupRepo.getGroupById with the correct ID', async () => {
            const mockGroup: Group = {
                id: 1,
                name: 'Test Group',
                created_at: new Date('2023-10-26T00:00:00Z')
            };
            (GroupRepo.getGroupById as jest.Mock).mockResolvedValue(mockGroup);

            const result = await GroupService.getGroupById(1);

            expect(GroupRepo.getGroupById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockGroup);
        });

        it('should throw NotFoundError if GroupRepo.getGroupById returns null', async () => {
            (GroupRepo.getGroupById as jest.Mock).mockResolvedValue(null);

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
        it('should call GroupRepo.getGroups with the correct limit and offset', async () => {
            const mockGroups: PaginatedGroups = {
                data: [],
                total: 0,
            };
            (GroupRepo.getGroups as jest.Mock).mockResolvedValue(mockGroups);

            await GroupService.getGroups(10, 0);

            expect(GroupRepo.getGroups).toHaveBeenCalledWith(10, 0);
        });

        it('should return the data from GroupRepo.getGroups', async () => {
            const mockGroups: PaginatedGroups = {
                data: [{
                    id: 1,
                    name: "Test Group",
                    created_at: new Date('2023-10-26T00:00:00Z')
                }],
                total: 1,
            };
            (GroupRepo.getGroups as jest.Mock).mockResolvedValue(mockGroups);

            const result = await GroupService.getGroups(10, 0);

            expect(result).toBe(mockGroups);
        });
    });

    describe('updateGroup', () => {
        it('should call GroupRepo.updateGroup with the correct ID and group name', async () => {
            const updatesName = 'Updated Group Name';
            (GroupRepo.updateGroup as jest.Mock).mockResolvedValue(true);

            await GroupService.updateGroup(1, updatesName);

            expect(GroupRepo.updateGroup).toHaveBeenCalledWith(1, updatesName);
        });

        it('should throw NotFoundError if GroupRepo.updateGroup returns false', async () => {
            const updatesName = 'Updated Group Name';
            (GroupRepo.updateGroup as jest.Mock).mockResolvedValue(false);

            await expect(GroupService.updateGroup(1, updatesName)).rejects.toThrow(NotFoundError);
            await expect(GroupService.updateGroup(1, updatesName)).rejects.toThrow('Group with ID 1 not found');
        });
    });

    describe('deleteGroup', () => {
        it('should call GroupRepo.deleteGroup with the correct ID', async () => {
            (GroupRepo.deleteGroup as jest.Mock).mockResolvedValue(true);

            await GroupService.deleteGroup(1);

            expect(GroupRepo.deleteGroup).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundError if GroupRepo.deleteGroup returns false', async () => {
            (GroupRepo.deleteGroup as jest.Mock).mockResolvedValue(false);

            await expect(GroupService.deleteGroup(1)).rejects.toThrow(NotFoundError);
            await expect(GroupService.deleteGroup(1)).rejects.toThrow('Group with ID 1 not found');
        });
    });
});

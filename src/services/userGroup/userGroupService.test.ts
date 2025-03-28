import { AlreadyJoinedError, NotFoundError, NotJoinedError } from "../../errors/customErrors";
import { PaginatedGroups } from "../../models/Group";
import { PaginatedUsers } from "../../models/User";
import { UserGroupRepository } from "../../repositories/userGroupRepository";
import { UserGroupService } from "./userGroupService";


// Mocking UserGroupRepository
jest.mock('../../repositories/userGroupRepository');


describe('UserGroupService', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
    });

    describe('addUserToGroup', () => {
        it('should call UserGroupRepository.addUserToGroup with the correct userId and groupId', async () => {
            const userId = 1;
            const groupId = 2;
            (UserGroupRepository.addUserToGroup as jest.Mock).mockResolvedValue(undefined);

            await UserGroupService.addUserToGroup(userId, groupId);

            expect(UserGroupRepository.addUserToGroup).toHaveBeenCalledWith(userId, groupId);
        });

        it('should throw AlreadyJoinedError if user is already in the group', async () => {
            const userId = 1;
            const groupId = 2;
            (UserGroupRepository.addUserToGroup as jest.Mock).mockResolvedValue('alreadyJoined');

            await expect(UserGroupService.addUserToGroup(userId, groupId)).rejects.toThrow(AlreadyJoinedError);
            await expect(UserGroupService.addUserToGroup(userId, groupId)).rejects.toThrow(`User ${userId} is already in group ${groupId}`);
        });

        it('should throw NotFoundError if user or group not found', async () => {
            const userId = 1;
            const groupId = 2;
            (UserGroupRepository.addUserToGroup as jest.Mock).mockResolvedValue('notFound');

            await expect(UserGroupService.addUserToGroup(userId, groupId)).rejects.toThrow(NotFoundError);
            await expect(UserGroupService.addUserToGroup(userId, groupId)).rejects.toThrow('User or Group not found');
        });
    });

    describe('getGroupUsers', () => {
        it('should call UserGroupRepository.getGroupUsers with the correct groupId, limit, and offset', async () => {
            const groupId = 1;
            const mockUsers: PaginatedUsers = {
                data: [],
                total: 0,
            };
            (UserGroupRepository.getGroupUsers as jest.Mock).mockResolvedValue(mockUsers);

            await UserGroupService.getGroupUsers(groupId, 10, 0);

            expect(UserGroupRepository.getGroupUsers).toHaveBeenCalledWith(groupId, 10, 0);
        });

        it('should return the paginated users from UserGroupRepository.getGroupUsers', async () => {
            const groupId = 1;
            const mockUsers: PaginatedUsers = {
                data: [{
                    id: 1,
                    name: "Test User",
                    surname: "User",
                    birth_date: "1990-01-01",
                    sex: "male",
                    email: "test@example.com",
                    password: "mockPassword"
                }],
                total: 1,
            };
            (UserGroupRepository.getGroupUsers as jest.Mock).mockResolvedValue(mockUsers);

            const result = await UserGroupService.getGroupUsers(groupId, 10, 0);

            expect(result).toEqual(mockUsers);
        });

        it('should throw NotFoundError if GroupRepo.getGroupUsers returns null', async () => {
            const groupId = 1;
            (UserGroupRepository.getGroupUsers as jest.Mock).mockResolvedValue(null);

            await expect(UserGroupService.getGroupUsers(groupId, 10, 0)).rejects.toThrow(NotFoundError);
            await expect(UserGroupService.getGroupUsers(groupId, 10, 0)).rejects.toThrow('Group with ID 1 not found');
        });
    });

    describe('getUserGroups', () => {
        it('should call UserGroupRepository.getUserGroups with the correct userId, limit, and offset', async () => {
            const userId = 1;
            const mockGroups: PaginatedGroups = {
                data: [],
                total: 0,
            };
            (UserGroupRepository.getUserGroups as jest.Mock).mockResolvedValue(mockGroups);

            await UserGroupService.getUserGroups(userId, 10, 0);

            expect(UserGroupRepository.getUserGroups).toHaveBeenCalledWith(userId, 10, 0);
        });

        it('should return the paginated groups from UserGroupRepository.getUserGroups', async () => {
            const userId = 1;
            const mockGroups: PaginatedGroups = {
                data: [{
                    id: 1,
                    name: "Test Group",
                    created_at: new Date('2023-10-26T00:00:00Z'),
                }],
                total: 1,
            };
            (UserGroupRepository.getUserGroups as jest.Mock).mockResolvedValue(mockGroups);

            const result = await UserGroupService.getUserGroups(userId, 10, 0);

            expect(result).toEqual(mockGroups);
        });

        it('should throw NotFoundError if UserRepo.getUserGroups returns null', async () => {
            const userId = 1;
            (UserGroupRepository.getUserGroups as jest.Mock).mockResolvedValue(null);

            await expect(UserGroupService.getUserGroups(userId, 10, 0)).rejects.toThrow(NotFoundError);
            await expect(UserGroupService.getUserGroups(userId, 10, 0)).rejects.toThrow('User with ID 1 not found');
        });
    });

    describe('removeUserFromGroup', () => {
        it('should call UserGroupRepository.removeUserFromGroup with the correct userId and groupId', async () => {
            const userId = 1;
            const groupId = 2;
            (UserGroupRepository.removeUserFromGroup as jest.Mock).mockResolvedValue(undefined);

            await UserGroupService.removeUserFromGroup(userId, groupId);

            expect(UserGroupRepository.removeUserFromGroup).toHaveBeenCalledWith(userId, groupId);
        });

        it('should throw NotJoinedError if user is not in the group', async () => {
            const userId = 1;
            const groupId = 2;
            (UserGroupRepository.removeUserFromGroup as jest.Mock).mockResolvedValue('notJoined');

            await expect(UserGroupService.removeUserFromGroup(userId, groupId)).rejects.toThrow(NotJoinedError);
            await expect(UserGroupService.removeUserFromGroup(userId, groupId)).rejects.toThrow(`User ${userId} is not in group ${groupId}`);
        });

        it('should throw NotFoundError if user or group not found', async () => {
            const userId = 1;
            const groupId = 2;
            (UserGroupRepository.removeUserFromGroup as jest.Mock).mockResolvedValue('notFound');

            await expect(UserGroupService.removeUserFromGroup(userId, groupId)).rejects.toThrow(NotFoundError);
            await expect(UserGroupService.removeUserFromGroup(userId, groupId)).rejects.toThrow('User or Group not found');
        });
    });
});

import { UserService } from './userService';
import { UserRepo } from '../../repositories/userRepo';
import { User } from '../../models/User';
import { NotFoundError } from '../../models/Error';

// Mocking UserRepo
jest.mock('../../repositories/userRepo');

// Mocking DB
jest.mock('../../database/config/db', () => ({
    connect: jest.fn(),
    query: jest.fn(),
}));

describe('UserService', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should call UserRepo.createUser with the correct user data', async () => {
            const user: User = {
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'male',
            };
            const mockUserId = 123;
            (UserRepo.createUser as jest.Mock).mockResolvedValue(mockUserId);

            const result = await UserService.createUser(user);

            expect(UserRepo.createUser).toHaveBeenCalledWith(user);
            expect(result).toBe(mockUserId);
        });
        it('should handle errors from UserRepo.createUser', async () => {
            const user: User = {
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'male',
            };
            const mockError = new Error('Database error');
            (UserRepo.createUser as jest.Mock).mockRejectedValue(mockError);

            await expect(UserService.createUser(user)).rejects.toThrow('Database error');
        });
    });

    describe('getUserById', () => {
        it('should call UserRepo.getUserById with the correct ID', async () => {
            const mockUser: User = {
                id: 1,
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'male',
            };
            (UserRepo.getUserById as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.getUserById(1);

            expect(UserRepo.getUserById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockUser);
        });

        it('should throw NotFoundError if UserRepo.getUserById returns null', async () => {
            (UserRepo.getUserById as jest.Mock).mockResolvedValue(null);

            await expect(UserService.getUserById(1)).rejects.toThrow(NotFoundError);
            await expect(UserService.getUserById(1)).rejects.toThrow('User with ID 1 not found');
        });

        it('should throw an error if the id is not valid', async () => {
            await expect(UserService.getUserById(0)).rejects.toThrow(NotFoundError);
            await expect(UserService.getUserById(0)).rejects.toThrow('User with ID 0 not found');
            await expect(UserService.getUserById(-1)).rejects.toThrow(NotFoundError);
            await expect(UserService.getUserById(-1)).rejects.toThrow('User with ID -1 not found');
        });
    });

    describe('getUsers', () => {
        it('should call UserRepo.getUsers with the correct limit and offset', async () => {
            const mockUsers = {
                data: [],
                total: 0,
            };
            (UserRepo.getUsers as jest.Mock).mockResolvedValue(mockUsers);

            await UserService.getUsers(10, 0);

            expect(UserRepo.getUsers).toHaveBeenCalledWith(10, 0);
        });

        it('should return the data from UserRepo.getUsers', async () => {
            const mockUsers = {
                data: [{
                    id: 1,
                    name: "test",
                    surname: "test",
                    birth_date: "1990-01-01",
                    sex: "male"
                }],
                total: 1,
            };
            (UserRepo.getUsers as jest.Mock).mockResolvedValue(mockUsers);

            const result = await UserService.getUsers(10, 0);

            expect(result).toBe(mockUsers);
        });
    });

    describe('updateUser', () => {
        it('should call UserRepo.updateUser with the correct ID and updates', async () => {
            const updates: Partial<User> = { name: 'Updated Name' };
            (UserRepo.updateUser as jest.Mock).mockResolvedValue(true);

            await UserService.updateUser(1, updates);

            expect(UserRepo.updateUser).toHaveBeenCalledWith(1, updates);
        });

        it('should throw NotFoundError if UserRepo.updateUser returns false', async () => {
            const updates: Partial<User> = { name: 'Updated Name' };
            (UserRepo.updateUser as jest.Mock).mockResolvedValue(false);

            await expect(UserService.updateUser(1, updates)).rejects.toThrow(NotFoundError);
            await expect(UserService.updateUser(1, updates)).rejects.toThrow('User with ID 1 not found');
        });
    });

    describe('deleteUser', () => {
        it('should call UserRepo.deleteUser with the correct ID', async () => {
            (UserRepo.deleteUser as jest.Mock).mockResolvedValue(true);

            await UserService.deleteUser(1);

            expect(UserRepo.deleteUser).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundError if UserRepo.deleteUser returns false', async () => {
            (UserRepo.deleteUser as jest.Mock).mockResolvedValue(false);

            await expect(UserService.deleteUser(1)).rejects.toThrow(NotFoundError);
            await expect(UserService.deleteUser(1)).rejects.toThrow('User with ID 1 not found');
        });
    });
});

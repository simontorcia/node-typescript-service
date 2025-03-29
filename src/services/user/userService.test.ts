import { UserService } from './userService';
import { User } from '../../models/User';
import { AlreadyExistsError, MissingPasswordError, NotFoundError } from '../../errors/customErrors';
import { UserRepository } from '../../repositories/userRepository';

// Mocking UserRepository
jest.mock('../../repositories/userRepository');

describe('UserService', () => {
    beforeEach(() => {
        // Clear mocks before each test
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should call UserRepository.createUser with correct user data', async () => {
            const user: User = {
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'M',
                email: 'test@example.com',
                password: 'password123',
            };
            const mockUserId = 123;
            (UserRepository.createUser as jest.Mock).mockResolvedValue(mockUserId);

            const result = await UserService.createUser(user);

            expect(UserRepository.createUser).toHaveBeenCalledWith({
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'M',
                email: 'test@example.com',
                password: expect.any(String),
            });
            expect(result).toBe(mockUserId);
        });

        it('should throw MissingPasswordError if password is not provided', async () => {
            const user: Omit<User, 'password'> = {
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'M',
                email: 'test@example.com',
            };

            await expect(UserService.createUser(user as User)).rejects.toThrow(MissingPasswordError);
            await expect(UserService.createUser(user as User)).rejects.toThrow('Password is required for user creation');
        });

        it('should throw AlreadyExistsError on duplicate email', async () => {
            const user: User = {
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'M',
                email: 'test@example.com',
                password: 'password123',
            };
            const mockError = { code: 'ER_DUP_ENTRY' };
            (UserRepository.createUser as jest.Mock).mockRejectedValue(mockError);

            await expect(UserService.createUser(user)).rejects.toThrow(AlreadyExistsError);
            await expect(UserService.createUser(user)).rejects.toThrow(`Email '${user.email}' already exists`);
        });

        it('should handle other createUser errors', async () => {
            const user: User = {
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'M',
                email: 'test@example.com',
                password: 'password123',
            };
            const mockError = new Error('Database error');
            (UserRepository.createUser as jest.Mock).mockRejectedValue(mockError);

            await expect(UserService.createUser(user)).rejects.toThrow('Database error');
        });
    });

    describe('getUserById', () => {
        it('should call UserRepository.getUserById with correct ID', async () => {
            const mockUser: User = {
                id: 1,
                name: 'Test',
                surname: 'User',
                birth_date: '2023-10-26',
                sex: 'M',
                email: 'test@example.com',
                password: 'someHashedPassword'
            };
            (UserRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

            const result = await UserService.getUserById(1);

            expect(UserRepository.getUserById).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockUser);
        });

        it('should throw NotFoundError if user not found', async () => {
            (UserRepository.getUserById as jest.Mock).mockResolvedValue(null);

            await expect(UserService.getUserById(1)).rejects.toThrow(NotFoundError);
            await expect(UserService.getUserById(1)).rejects.toThrow('User with ID 1 not found');
        });
    });

    describe('getUsers', () => {
        it('should call UserRepository.getUsers with correct params', async () => {
            const mockUsers = {
                data: [],
                total: 0,
            };
            (UserRepository.getUsers as jest.Mock).mockResolvedValue(mockUsers);

            await UserService.getUsers(10, 0);

            expect(UserRepository.getUsers).toHaveBeenCalledWith(10, 0);
        });

        it('should return users data', async () => {
            const mockUsers = {
                data: [{
                    id: 1,
                    name: "test",
                    surname: "test",
                    birth_date: "1990-01-01",
                    sex: "M",
                    email: 'test@example.com',
                    password: 'someHashedPassword'
                }],
                total: 1,
            };
            (UserRepository.getUsers as jest.Mock).mockResolvedValue(mockUsers);

            const result = await UserService.getUsers(10, 0);

            expect(result).toBe(mockUsers);
        });
    });

    describe('updateUser', () => {
        it('should call UserRepository.updateUser with correct data', async () => {
            const updates: Partial<User> = { name: 'Updated Name' };
            (UserRepository.updateUser as jest.Mock).mockResolvedValue(true);

            await UserService.updateUser(1, updates);

            expect(UserRepository.updateUser).toHaveBeenCalledWith(1, updates);
        });

        it('should throw NotFoundError if update fails', async () => {
            const updates: Partial<User> = { name: 'Updated Name' };
            (UserRepository.updateUser as jest.Mock).mockResolvedValue(false);

            await expect(UserService.updateUser(1, updates)).rejects.toThrow(NotFoundError);
            await expect(UserService.updateUser(1, updates)).rejects.toThrow('User with ID 1 not found');
        });
    });

    describe('deleteUser', () => {
        it('should call UserRepository.deleteUser with correct ID', async () => {
            (UserRepository.deleteUser as jest.Mock).mockResolvedValue(true);

            await UserService.deleteUser(1);

            expect(UserRepository.deleteUser).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundError if delete fails', async () => {
            (UserRepository.deleteUser as jest.Mock).mockResolvedValue(false);

            await expect(UserService.deleteUser(1)).rejects.toThrow(NotFoundError);
            await expect(UserService.deleteUser(1)).rejects.toThrow('User with ID 1 not found');
        });
    });
});
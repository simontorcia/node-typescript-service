import { UserRepository } from '../../repositories/userRepository';
import { User, PaginatedUsers } from '../../models/User';
import { NotFoundError } from '../../errors/customErrors';
import logger from '../../utils/logger';

export class UserService {
    static async createUser(user: Readonly<User>): Promise<number> {
        logger.info(`[UserService] Creating user: ${user.name} ${user.surname}`);
        const userId = await UserRepository.createUser(user);
        logger.info(`[UserService] Created user ID: ${userId}`);
        return userId;
    }

    static async deleteUser(id: number): Promise<void> {
        logger.info(`[UserService] Deleting user ID: ${id}`);
        const result = await UserRepository.deleteUser(id);
        if (!result) {
            logger.warn(`[UserService] User ID ${id} not found for deletion`);
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        logger.info(`[UserService] User ID ${id} deleted`);
    }

    static async getUserById(id: number): Promise<User> {
        logger.debug(`[UserService] Fetching user by ID: ${id}`);
        const user = await UserRepository.getUserById(id);
        if (!user) {
            logger.warn(`[UserService] User ID ${id} not found`);
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return user;
    }

    static async getUsers(limit: number, offset: number): Promise<PaginatedUsers> {
        logger.debug(`[UserService] Fetching users: limit=${limit}, offset=${offset}`);
        return UserRepository.getUsers(limit, offset);
    }

    static async updateUser(id: number, updates: Partial<User>): Promise<void> {
        logger.info(`[UserService] Updating user ID: ${id} with data:`, updates);
        const result = await UserRepository.updateUser(id, updates);
        if (!result) {
            logger.warn(`[UserService] User ID ${id} not found for update`);
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        logger.info(`[UserService] User ID ${id} updated`);
    }
}

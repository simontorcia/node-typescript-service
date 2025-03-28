import { UserRepository } from '../../repositories/userRepository';
import { User, PaginatedUsers } from '../../models/User';
import { AlreadyExistsError, MissingPasswordError, NotFoundError } from '../../errors/customErrors';
import logger from '../../utils/logger';
import bcrypt from 'bcrypt';


export class UserService {

    static async createUser(user: User): Promise<number> {
        logger.info(`[UserService] Creating user: ${user.email}`);
        if (!user.password) {
            const errorMessage = 'Password is required for user creation';
            logger.warn(`[UserService] ${errorMessage}. User: ${user.email}`);
            throw new MissingPasswordError();
        }
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            const userDataForDb: User = {
                ...user,
                password: hashedPassword,
                id: undefined,
                created_at: undefined
            };
            const newUserId = await UserRepository.createUser(userDataForDb);
            logger.info(`[UserService] User created with ID: ${newUserId}`);
            return newUserId;
        } catch (error: any) {
            if (error.code === 'ER_DUP_ENTRY') {
                const errorMessage = `Email '${user.email}' already exists`;
                logger.warn(`[UserService] ${errorMessage}`);
                throw new AlreadyExistsError(errorMessage);
            }
            logger.error('[UserService] Error creating user:', error);
            throw error;
        }
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

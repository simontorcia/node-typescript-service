import { UserRepository } from '../../repositories/userRepository';
import { User, PaginatedUsers } from '../../models/User';
import { NotFoundError } from '../../errors/Error';

export class UserService {

    static async createUser(user: Readonly<User>): Promise<number> {
        return UserRepository.createUser(user);
    }

    static async deleteUser(id: number): Promise<void> {
        const result = await UserRepository.deleteUser(id);
        if (!result) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
    }

    static async getUserById(id: number): Promise<User> {
        const user = await UserRepository.getUserById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return user;
    }

    static async getUsers(limit: number, offset: number): Promise<PaginatedUsers> {
        return UserRepository.getUsers(limit, offset);
    }

    static async updateUser(id: number, updates: Partial<User>): Promise<void> {
        const result = await UserRepository.updateUser(id, updates);
        if (!result) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
    }
}
import { UserRepo } from '../../repositories/userRepo';
import { User, PaginatedUsers } from '../../models/User';
import { NotFoundError } from '../../models/Error';

export class UserService {

    static async createUser(user: Readonly<User>): Promise<number> {
        return UserRepo.createUser(user);
    }

    static async deleteUser(id: number): Promise<void> {
        const result = await UserRepo.deleteUser(id);
        if (!result) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
    }

    static async getUserById(id: number): Promise<User> {
        const user = await UserRepo.getUserById(id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return user;
    }

    static async getUsers(limit: number, offset: number): Promise<PaginatedUsers> {
        return UserRepo.getUsers(limit, offset);
    }

    static async updateUser(id: number, updates: Partial<User>): Promise<void> {
        const result = await UserRepo.updateUser(id, updates);
        if (!result) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
    }
}
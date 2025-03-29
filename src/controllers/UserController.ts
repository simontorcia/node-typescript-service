import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user/userService';
import { calculatePagination, createPaginationMetadata } from '../utils/pagination';
import { User } from '../models/User';
import { AlreadyExistsError } from '../errors/customErrors';

export class UserController {
    static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.body;
            const userId = await UserService.createUser(user);
            res.status(201).json({ userId });
        } catch (error) {
            if (error instanceof AlreadyExistsError) {
                res.status(409).json({ message: error.message, code: error.code }); // Invia 409
            } else {
                next(error);
            }
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        await UserService.deleteUser(id);
        res.status(204).send();
    }

    static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        const user = await UserService.getUserById(id);
        res.json(user);
    }

    static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const { offset, limit } = calculatePagination(page, pageSize);

        const { data, total } = await UserService.getUsers(limit, offset);

        res.json({
            users: data,
            pagination: {
                totalItems: total,
                ...createPaginationMetadata(page, total, pageSize),
            },
        });
    }

    static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        const updates: Partial<User> = req.body;
        await UserService.updateUser(id, updates);
        res.status(200).json({ message: 'User updated successfully' });
    }
}

import { Request, Response } from 'express';
import { UserService } from '../services/user/userService';
import { NotFoundError } from '../errors/Error';
import { calculatePagination, createPaginationMetadata } from '../utils/pagination';
import { User } from '../models/User';

export class UserController {

    static async createUser(req: Request, res: Response): Promise<void> {
        try {
            const user: User = req.body;
            const userId = await UserService.createUser(user);
            res.status(201).json({ userId });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await UserService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const user = await UserService.getUserById(id);
            res.json(user);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async getUsers(req: Request, res: Response): Promise<void> {
        try {
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
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const updates: Partial<User> = req.body;
            await UserService.updateUser(id, updates);
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}
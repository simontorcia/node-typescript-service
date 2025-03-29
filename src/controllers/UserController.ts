import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user/userService';
import { calculatePagination, createPaginationMetadata } from '../utils/pagination';
import { User } from '../models/User';
import { AlreadyExistsError } from '../errors/customErrors';
import logger from '../utils/logger';

export class UserController {
    static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, surname, email, password, birth_date, sex } = req.body;
            const user: User = { name, surname, email, password, birth_date, sex };

            logger.info(`[UserController] Creating user: ${email}`);

            const userId = await UserService.createUser(user);

            res.status(201).json({ userId });

            logger.debug(`[UserController] User created with ID: ${userId}`);

        } catch (error) {
            if (error instanceof AlreadyExistsError) {
                res.status(409).json({ message: error.message, code: error.code });
            } else {
                logger.error('[UserController] Error creating user:', error);
                next(error);
            }
        }
    }

    static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        logger.info(`[UserController] Deleting user with ID: ${id}`);

        await UserService.deleteUser(Number(id));

        res.status(204).send();

        logger.debug(`[UserController] User with ID: ${id} deleted`);
    }

    static async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        logger.debug(`[UserController] Getting user with ID: ${id}`);

        const user = await UserService.getUserById(Number(id));

        res.json(user);
    }

    static async getUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const { offset, limit } = calculatePagination(page, pageSize);

        logger.debug(`[UserController] Getting users (page: ${page}, pageSize: ${pageSize})`);

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
        const { id } = req.params;
        const { name, surname, email, birth_date, sex } = req.body;
        const updates = { name, surname, email, birth_date, sex };

        logger.info(`[UserController] Updating user with ID: ${id}, new data:`, updates);

        await UserService.updateUser(Number(id), updates);

        res.json({ message: 'User updated successfully' });

        logger.debug(`[UserController] User with ID: ${id} updated`);
    }
}
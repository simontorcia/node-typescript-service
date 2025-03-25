import { Request, Response } from 'express';
import { GroupService } from '../services/group/groupService';
import { NotFoundError } from '../errors/Error';
import { calculatePagination, createPaginationMetadata } from '../utils/pagination';

export class GroupController {

    static async createGroup(req: Request, res: Response): Promise<void> {
        try {
            const { name } = req.body;
            const groupId = await GroupService.createGroup(name);
            res.status(201).json({ groupId });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteGroup(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            await GroupService.deleteGroup(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async getGroupById(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const group = await GroupService.getGroupById(id);
            res.json(group);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async getGroups(req: Request, res: Response): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;
            const pageSize = Number(req.query.pageSize) || 10;
            const { offset, limit } = calculatePagination(page, pageSize);
            const { data, total } = await GroupService.getGroups(limit, offset);
            res.json({
                groups: data,
                pagination: {
                    totalItems: total,
                    ...createPaginationMetadata(page, total, pageSize),
                },
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateGroup(req: Request, res: Response): Promise<void> {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;
            await GroupService.updateGroup(id, name);
            res.json({ message: 'Group updated successfully' });
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}
import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../services/group/groupService';
import { calculatePagination, createPaginationMetadata } from '../utils/pagination';

export class GroupController {
    static async createGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name } = req.body;
        const groupId = await GroupService.createGroup(name);
        res.status(201).json({ groupId });
    }

    static async deleteGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        await GroupService.deleteGroup(id);
        res.status(204).send();
    }

    static async getGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        const group = await GroupService.getGroupById(id);
        res.json(group);
    }

    static async getGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
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
    }

    static async updateGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id = Number(req.params.id);
        const { name } = req.body;
        await GroupService.updateGroup(id, name);
        res.json({ message: 'Group updated successfully' });
    }
}

import { Request, Response, NextFunction } from 'express';
import { GroupService } from '../services/group/groupService';
import { calculatePagination, createPaginationMetadata } from '../utils/pagination';
import logger from '../utils/logger';

export class GroupController {
    static async createGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { name } = req.body;

        logger.info(`[GroupController] Creating group with name: ${name}`);

        const groupId = await GroupService.createGroup(name);

        res.status(201).json({ groupId });

        logger.debug(`[GroupController] Group created with ID: ${groupId}`);
    }

    static async deleteGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        logger.info(`[GroupController] Deleting group with ID: ${id}`);

        await GroupService.deleteGroup(Number(id));

        res.status(204).send();

        logger.debug(`[GroupController] Group with ID: ${id} deleted`);
    }

    static async getGroupById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        logger.debug(`[GroupController] Getting group with ID: ${id}`);

        const group = await GroupService.getGroupById(Number(id));

        res.json(group);
    }

    static async getGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 10;
        const { offset, limit } = calculatePagination(page, pageSize);

        logger.debug(`[GroupController] Getting groups (page: ${page}, pageSize: ${pageSize})`);

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
        const { id } = req.params;
        const { name } = req.body;

        logger.info(`[GroupController] Updating group with ID: ${id}, new name: ${name}`);

        await GroupService.updateGroup(Number(id), name);

        res.json({ message: 'Group updated successfully' });

        logger.debug(`[GroupController] Group with ID: ${id} updated`);
    }
}
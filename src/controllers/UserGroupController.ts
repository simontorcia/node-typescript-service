import { Request, Response, NextFunction } from 'express';
import { UserGroupService } from '../services/userGroup/userGroupService';
import logger from '../utils/logger';

export class UserGroupController {
    static async addUserToGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: userId } = req.params;
        const { groupId } = req.body;

        logger.info(`[UserGroupController] Adding user ${userId} to group ${groupId}`);

        await UserGroupService.addUserToGroup(Number(userId), groupId);

        res.status(201).json({ message: 'User added to group' });

        logger.debug(`[UserGroupController] User ${userId} added to group ${groupId}`);
    }

    static async getGroupUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: groupId } = req.params;

        logger.debug(`[UserGroupController] Getting users in group ${groupId}`);

        const users = await UserGroupService.getGroupUsers(Number(groupId));

        res.json(users);
    }

    static async getUserGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: userId } = req.params;

        logger.debug(`[UserGroupController] Getting groups for user ${userId}`);

        const groups = await UserGroupService.getUserGroups(Number(userId));

        res.json(groups);
    }

    static async removeUserFromGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id: userId, groupId } = req.params;

        logger.info(`[UserGroupController] Removing user ${userId} from group ${groupId}`);

        await UserGroupService.removeUserFromGroup(Number(userId), Number(groupId));

        res.json({ message: 'User removed from group successfully' });

        logger.debug(`[UserGroupController] User ${userId} removed from group ${groupId}`);
    }
}
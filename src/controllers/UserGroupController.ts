import { Request, Response, NextFunction } from 'express';
import { UserGroupService } from '../services/userGroup/userGroupService';

export class UserGroupController {
    static async addUserToGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = Number(req.params.id);
        const { groupId } = req.body;

        await UserGroupService.addUserToGroup(userId, groupId);
        res.status(201).json({ message: 'User added to group' });
    }

    static async getGroupUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        const groupId = Number(req.params.id);
        const users = await UserGroupService.getGroupUsers(groupId);
        res.json(users);
    }

    static async getUserGroups(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = Number(req.params.id);
        const groups = await UserGroupService.getUserGroups(userId);
        res.json(groups);
    }

    static async removeUserFromGroup(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = Number(req.params.id);
        const groupId = Number(req.params.groupId);

        await UserGroupService.removeUserFromGroup(userId, groupId);
        res.json({ message: 'User removed from group successfully' });
    }
}

import { Request, Response } from 'express';
import { AlreadyJoinedError, NotFoundError, NotJoinedError } from '../errors/Error';
import { UserGroupService } from '../services/userGroup/userGroupService';

export class UserGroupController {

    static async addUserToGroup(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const { groupId } = req.body;

            await UserGroupService.addUserToGroup(userId, groupId);
            res.status(201).json({ message: 'User added to group' });
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else if (error instanceof AlreadyJoinedError) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async getGroupUsers(req: Request, res: Response): Promise<void> {
        try {
            const groupId = Number(req.params.id);
            const users = await UserGroupService.getGroupUsers(groupId);
            res.json(users);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async getUserGroups(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const groups = await UserGroupService.getUserGroups(userId);
            res.json(groups);
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }

    static async removeUserFromGroup(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);
            const groupId = Number(req.params.groupId);

            await UserGroupService.removeUserFromGroup(userId, groupId);
            res.json({ message: 'User removed from group successfully' });
        } catch (error) {
            if (error instanceof NotFoundError) {
                res.status(404).json({ message: error.message });
            } else if (error instanceof NotJoinedError) {
                res.status(409).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
}
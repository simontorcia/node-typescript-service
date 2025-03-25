import { Router } from 'express';
import { UserGroupController } from '../controllers/UserGroupController';
import { validateBody, validateParams } from '../middlewares/validator';
import { idParamSchema } from '../validations/paramsValidation';
import { addUserToGroupSchema, removeUserFromGroupSchema } from '../validations/userGroupValidation';

const router = Router();

// Add user to a group
router.post(
    '/users/:id/groups',
    validateParams(idParamSchema),
    validateBody(addUserToGroupSchema),
    UserGroupController.addUserToGroup
);

// Get all groups a user belongs to
router.get(
    '/users/:id/groups',
    validateParams(idParamSchema),
    UserGroupController.getUserGroups
);

// Get all users in a group
router.get(
    '/groups/:id/users',
    validateParams(idParamSchema),
    UserGroupController.getGroupUsers
);

// Remove user from a group
router.delete(
    '/users/:id/groups/:groupId',
    validateParams(removeUserFromGroupSchema),
    UserGroupController.removeUserFromGroup
);

export default router;

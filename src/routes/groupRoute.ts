import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';
import { validateBody, validateParams } from '../middlewares/validator';
import { groupSchema, updateGroupSchema } from '../validations/groupValidation';
import { idParamSchema } from '../validations/paramsValidation';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = Router();

// Create a new group
router.post('/', authenticateToken, validateBody(groupSchema), GroupController.createGroup);

// Get a paginated list of groups
router.get('/', authenticateToken, GroupController.getGroups);

// Get a single group by ID
router.get('/:id', authenticateToken, validateParams(idParamSchema), GroupController.getGroupById);

// Update a group by ID
router.put('/:id', authenticateToken, validateParams(idParamSchema), validateBody(updateGroupSchema), GroupController.updateGroup);

// Delete a group by ID
router.delete('/:id', authenticateToken, validateParams(idParamSchema), GroupController.deleteGroup);

export default router;

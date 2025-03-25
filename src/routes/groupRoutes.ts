import { Router } from 'express';
import { GroupController } from '../controllers/GroupController';
import { validateBody, validateParams } from '../middlewares/validate';
import { groupSchema, updateGroupSchema } from '../validations/groupValidation';
import { idParamSchema } from '../validations/paramsValidation';

const router = Router();

router.post('/', validateBody(groupSchema), GroupController.createGroup);
router.get('/', GroupController.getGroups);
router.get('/:id', validateParams(idParamSchema), GroupController.getGroupById);
router.put('/:id', validateParams(idParamSchema), validateBody(updateGroupSchema), GroupController.updateGroup);
router.delete('/:id', validateParams(idParamSchema), GroupController.deleteGroup);

export default router;

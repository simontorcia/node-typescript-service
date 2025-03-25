import { Router } from 'express';


import { validateBody, validateQuery, validateParams } from '../middlewares/validator';
import { updateUserSchema, userSchema } from '../validations/userValidation';
import { paginationQuerySchema } from '../validations/queryValidation';
import { idParamSchema } from '../validations/paramsValidation';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/', validateBody(userSchema), UserController.createUser);
router.get('/', validateQuery(paginationQuerySchema), UserController.getUsers);
router.get('/:id', validateParams(idParamSchema), UserController.getUserById);
router.put('/:id', validateParams(idParamSchema), validateBody(updateUserSchema), UserController.updateUser);
router.delete('/:id', validateParams(idParamSchema), UserController.deleteUser);

export default router;

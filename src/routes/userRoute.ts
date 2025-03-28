import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateBody, validateParams, validateQuery } from '../middlewares/validator';
import { userSchema, updateUserSchema } from '../validations/userValidation';
import { idParamSchema } from '../validations/paramsValidation';
import { paginationQuerySchema } from '../validations/queryValidation';

const router = Router();

// Create a new user
router.post('/', validateBody(userSchema), UserController.createUser);

// Get a paginated list of users
router.get('/', validateQuery(paginationQuerySchema), UserController.getUsers);

// Get a single user by ID
router.get('/:id', validateParams(idParamSchema), UserController.getUserById);

// Update a user by ID
router.put('/:id', validateParams(idParamSchema), validateBody(updateUserSchema), UserController.updateUser);

// Delete a user by ID
router.delete('/:id', validateParams(idParamSchema), UserController.deleteUser);

export default router;

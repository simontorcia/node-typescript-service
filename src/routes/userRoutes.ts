import { Router } from 'express';


import { validateBody, validateQuery, validateParams } from '../middlewares/validate';
import { updateUserSchema, userSchema } from '../validations/userValidation';
import { paginationQuerySchema } from '../validations/queryValidation';
import { idParamSchema } from '../validations/paramsValidation'; // Definire questo schema se non esiste
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/', validateBody(userSchema), UserController.createUser);
router.get('/', validateQuery(paginationQuerySchema), UserController.getUsers);
router.get('/:id', validateParams(idParamSchema), UserController.getUserById); // Aggiunta validazione del parametro id
router.put('/:id', validateParams(idParamSchema), validateBody(updateUserSchema), UserController.updateUser); // Aggiunta validazione del parametro id
router.delete('/:id', validateParams(idParamSchema), UserController.deleteUser); // Aggiunta validazione del parametro id

export default router;

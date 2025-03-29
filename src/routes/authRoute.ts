import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateBody } from '../middlewares/validator';
import { loginSchema } from '../validations/authValidation';
import { userSchema } from '../validations/userValidation';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/login', validateBody(loginSchema), AuthController.login);
router.post('/signup', validateBody(userSchema), UserController.createUser);

export default router;
import { Router } from 'express';
import { UserGroupController } from '../controllers/UserGroupController';
import { validateParams, validateBody } from '../middlewares/validator';
import { idParamSchema } from '../validations/paramsValidation';
import { addUserToGroupSchema, removeUserFromGroupSchema } from '../validations/userGroupValidation';

const router = Router();

// 🔗 POST /users/:id/groups → Assegna un utente a un gruppo
router.post(
    '/users/:id/groups',
    validateParams(idParamSchema),                 // Valida userId dai params
    validateBody(addUserToGroupSchema),            // Valida groupId dal body
    UserGroupController.addUserToGroup
);

// 🔍 GET /users/:id/groups → Elenca i gruppi di un utente
router.get(
    '/users/:id/groups',
    validateParams(idParamSchema),                 // Valida userId dai params
    UserGroupController.getUserGroups
);

// 🔍 GET /groups/:id/users → Elenca gli utenti di un gruppo
router.get(
    '/groups/:id/users',
    validateParams(idParamSchema),                 // Valida groupId dai params
    UserGroupController.getGroupUsers
);

// ❌ DELETE /users/:id/groups/:groupId → Rimuovi l'utente dal gruppo
router.delete(
    '/users/:id/groups/:groupId',
    validateParams(removeUserFromGroupSchema),     // Valida sia userId che groupId
    UserGroupController.removeUserFromGroup
);

export default router;

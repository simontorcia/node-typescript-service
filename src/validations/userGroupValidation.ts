import Joi from 'joi';

// Schema per aggiungere un gruppo a un utente
export const addUserToGroupSchema = Joi.object({
  groupId: Joi.number().integer().positive().required()
});

// Schema per la rimozione di un utente da un gruppo
export const removeUserFromGroupSchema = Joi.object({
  id: Joi.number().integer().positive().required(),  // ID dell'utente
  groupId: Joi.number().integer().positive().required()  // ID del gruppo
});

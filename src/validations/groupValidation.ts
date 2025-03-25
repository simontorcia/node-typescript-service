import Joi from 'joi';

export const groupSchema = Joi.object({
  name: Joi.string().min(2).max(100).required()
});

export const updateGroupSchema = Joi.object({
  name: Joi.string().min(2).max(100)
});

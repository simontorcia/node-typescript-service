import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  surname: Joi.string().trim().min(2).max(50).required(),
  birth_date: Joi.date().iso().required(),
  sex: Joi.string().valid('M', 'F', 'O').required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50),
  surname: Joi.string().trim().min(2).max(50),
  birth_date: Joi.date().iso(),
  sex: Joi.string().valid('M', 'F', 'O'),
  email: Joi.string().email(),
  password: Joi.string().min(8),
});
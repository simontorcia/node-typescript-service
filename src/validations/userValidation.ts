import Joi from 'joi';

export const userSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),
  surname: Joi.string().trim().min(2).max(50).required(),
  birth_date: Joi.date().iso().required(), // ISO = YYYY-MM-DD
  sex: Joi.string().valid('male', 'female', 'other').required(), // O = other
});

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  surname: Joi.string().min(2).max(50),
  birth_date: Joi.date().iso(),
  sex: Joi.string().valid('male', 'female', 'other'),
});
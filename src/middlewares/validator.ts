import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Funzione per gestire gli errori di validazione in modo centralizzato
function handleValidationError(error: Joi.ValidationError, res: Response): void {
  res.status(400).json({
    message: 'Validation error',
    details: error.details.map((d) => d.message)
  });
}

// Middleware per la validazione del body
export function validateBody(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      handleValidationError(error, res);
      return;
    }

    req.body = value;
    next();
  };
}

// Middleware per la validazione dei query params
export function validateQuery(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      handleValidationError(error, res);
      return;
    }

    req.query = value;
    next();
  };
}

// Middleware per la validazione dei path params
export function validateParams(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.params, { abortEarly: false });

    if (error) {
      handleValidationError(error, res);
      return;
    }

    req.params = value;
    next();
  };
}

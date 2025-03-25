import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ApiError } from '../errors/ApiError';


export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    logger.error('❌ errorHandler:', err);

    // Joi validation error
    if (err.isJoi) {
        res.status(400).json({
            code: 'VALIDATION_ERROR',
            message: 'Validation error',
            details: err.details
        });
    }

    // Custom ApiError
    if (err instanceof ApiError) {
        res.status(err.status).json({
            code: err.code,
            message: err.message
        });
    }

    // Generic fallback
    res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
        details: err.message || 'An unexpected error occurred.'
    });
}

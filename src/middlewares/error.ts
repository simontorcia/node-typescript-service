import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    console.error('errorHandler', err);

    if (err.isJoi) {
        // Validation error from Joi
        res.status(400).json({
            code: 'VALIDATION_ERROR',
            message: 'Validation error',
            details: err.details
        });
        return
    }

    if (err.code === 'NOT_FOUND') {
        res.status(404).json({
            code: 'NOT_FOUND',
            message: err.message
        });
        return
    }

    if (err.code === 'CONFLICT') {
        res.status(409).json({
            code: 'CONFLICT',
            message: err.message
        });
        return
    }

    // Catch-all for unexpected errors
    res.status(500).json({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error',
        details: err.message || 'An unexpected error occurred.'
    });
    return
}

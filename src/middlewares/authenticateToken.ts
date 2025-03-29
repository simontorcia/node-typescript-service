import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../errors/customErrors';
import logger from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthRequest extends Request {
    user?: { userId: number };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token) {
        logger.warn('[authMiddleware] Authentication token missing');
        return next(new AuthenticationError('Authentication token missing'));
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
        req.user = decoded;
        next();
    } catch (error) {
        logger.error('[authMiddleware] Invalid token:', error);
        return next(new AuthenticationError('Invalid token'));
    }
};

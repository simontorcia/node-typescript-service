import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth/authService';
import logger from '../utils/logger';
import { AuthenticationError } from '../errors/customErrors';

export class AuthController {
    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;
            const { user, token } = await AuthService.login(email, password);
            res.json({ user, token });

        } catch (error) {
            if (error instanceof AuthenticationError) {
                res.status(401).json({ code: error.code, message: error.message });
            } else {
                logger.error('[AuthController] Login error:', error);
                next(error);
            }
        }
    }
}
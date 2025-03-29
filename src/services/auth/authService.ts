import { UserRepository } from '../../repositories/userRepository';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from '../../errors/customErrors'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export class AuthService {
    static async login(email: string, password: string): Promise<{ user: User; token: string }> {
        const user = await UserRepository.getUserByEmail(email);
        if (!user) {
            throw new AuthenticationError('Invalid credentials');
        }
        const passwordMatch = await bcrypt.compare(password, user.password!);
        if (!passwordMatch) {
            throw new AuthenticationError('Invalid credentials');
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        const userWithoutPassword: User = { ...user };
        delete userWithoutPassword.password;
        return { user: userWithoutPassword, token };
    }
}
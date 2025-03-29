import express, { Request, Response } from 'express';
import usersRoutes from './routes/userRoute';
import authRoutes from './routes/authRoute';
import groupsRoutes from './routes/groupRoute';
import userGroupsRoutes from './routes/userGroupRoute';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.get('/api/test', (req: Request, res: Response): void => {
    res.send('Funziona! 🚀');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/groups', groupsRoutes);
app.use('/api/user-groups', userGroupsRoutes);

app.use(errorHandler);

export default app;

import express, { Request, Response } from 'express';
import userRoute from './routes/userRoute';
import authRoutes from './routes/authRoute';
import groupRoute from './routes/groupRoute';
import userGroupRoute from './routes/userGroupRoute';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());

app.get('/test', (req: Request, res: Response): void => {
    res.send('Funziona! 🚀');
});

app.use('/auth', authRoutes);
app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);
app.use('/api', userGroupRoute);

app.use(errorHandler);

export default app;

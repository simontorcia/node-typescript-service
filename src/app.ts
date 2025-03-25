import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import userGroupRoutes from './routes/userGroupRoutes';
import { errorHandler } from './middlewares/error';

const app = express();
app.use(express.json());

app.get('/test', (req: Request, res: Response): void => {
    res.send('Funziona! 🚀');
});

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api', userGroupRoutes);

app.use(errorHandler);

export default app;

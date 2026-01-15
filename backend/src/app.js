import express from 'express';
import cors from 'cors';

import salesRoutes from './routes/sales.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/sales', salesRoutes);
app.use('/health', healthRoutes);

export default app;
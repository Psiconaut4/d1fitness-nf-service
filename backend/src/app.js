import express from 'express';
import cors from 'cors';

import salesRoutes from './routes/sales.routes.js';
import healthRoutes from './routes/health.routes.js';
import nfRoutes from './routes/nf.routes.js';
import danfeRoutes from './routes/danfe.routes.js';
import emailRoutes from './routes/email.routes.js';
import sendHistoryRoutes from './routes/sendHistory.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', salesRoutes);
app.use('/api', healthRoutes);
app.use('/api', nfRoutes);
app.use('/api', danfeRoutes);
app.use('/api', emailRoutes);
app.use('/api', sendHistoryRoutes);

export default app;
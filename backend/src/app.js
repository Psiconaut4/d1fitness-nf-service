import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// import salesRoutes from './routes/salesRoutes.js';
import healthRoutes from './routes/health.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/sales', salesRoutes);
app.use('/health', healthRoutes);

export default app;
import express from 'express';
import connectDB from './db';
import dotenv from 'dotenv';
import incidentsRouter from './routes/incidents.route';
import authRouter from './routes/auth.route';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/incidents', incidentsRouter);

export default app;



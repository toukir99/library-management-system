import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import databaseConnection from './config/config';
import authRoutes from './routes/authRoutes/authRoutes';

// Load environment variables from .env file
dotenv.config();


// Initialize Express application
const app : Express = express();
app.use(express.json());

// Database connection 
databaseConnection();

// Routes
app.use('/auth', authRoutes);

// Default error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

// Export the express app 
export default app;
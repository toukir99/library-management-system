import express, { Request, Response, NextFunction } from "express";
import path from 'path';
import databaseConnection from './config/config';
import authRoutes from './routes/authRoutes/authRoutes';
import cookieParser from "cookie-parser";
import cors from 'cors';

// Initialize Express application
const app = express();
app.use(express.json());
app.use(cookieParser());

// Parse URL-encoded bodies for HTML form submissions
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

// Database connection 
databaseConnection();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


// Routes
app.use('/auth', authRoutes);

// Default error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

// Export the express app 
export default app;
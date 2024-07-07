
import express, {Express, Request, Response, NextFunction} from "express";
import databaseConnection from './config/config';
import authRoutes from './routes/authRoutes/authRoutes';

// Initialize Express application
const app : Express = express();
app.use(express.json());

// Database connection 
databaseConnection();


//app.use('/auth', authRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, It is a new Project!');
  });

// Default error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

// Export the express app 
export default app;
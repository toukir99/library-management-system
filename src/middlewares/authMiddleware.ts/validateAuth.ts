import { Request, Response, NextFunction } from 'express';
import { authSchema } from '../../schemaValidate/validateAuthSchema';

// Validate Auth Middleware
const validateAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authData = req.body;

        const { value, error } = authSchema.validate(authData);
        if (error) {
            throw new Error(`Auth Validation Error: ${error.message}`);
        }

        // No error occurred, proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export default validateAuth;

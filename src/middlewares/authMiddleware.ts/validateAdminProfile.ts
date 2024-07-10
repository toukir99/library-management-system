import { Request, Response, NextFunction } from 'express';
import adminProfileCreateSchema from '../../schemaValidate/validateAdminProfileSchema';

// Validate Profile Middleware
const validateAdminProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const profileData = req.body;
        console.log(profileData);
        const { value, error } = adminProfileCreateSchema.validate(profileData);
        if (error) {
            throw new Error(`Profile Validation Error: ${error.message}`);
        }

        // No error occurred, proceed to the next middleware or route
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: (error as Error).message });
    }
};

export default validateAdminProfile;

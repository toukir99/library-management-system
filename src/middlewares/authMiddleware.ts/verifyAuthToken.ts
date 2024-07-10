import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers && req.headers.authorization) {
        const parts = req.headers.authorization.split(' ');

        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({ error: 'Malformed token' });
        }

        const token = parts[1];

        try {
            const secretKey = process.env.JWT_SECRET || '76985732342456789';
            const decoded = jwt.verify(token, secretKey);
            next();
        } catch (err) {
            if (err instanceof TokenExpiredError) {
                return res.status(401).json({ error: 'Token expired' });
            } else if (err instanceof JsonWebTokenError) {
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    } else {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
};

export default verifyAuthToken;

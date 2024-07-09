import { Request, Response } from "express";
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import UserModel from "../../models/user";

// password hashing function
const hashedPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Register user
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, studentId, department, email, password, contact } = req.body;

        // check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists!' });
        }

        // hash the password
        const hashPassword = hashedPassword(password);

        // create new user
        const userRecord = await UserModel.create({ studentId, name, email, password: hashPassword, contact, department, auth_token: uuidv4() });
        if (!userRecord) {
            throw new Error('User registration failed!');
        }

        // Success
        return res.status(201).json({ message: 'User Registration done!', data: { userId: userRecord.studentId, auth_token: userRecord.auth_token } });
        
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export default registerUser;

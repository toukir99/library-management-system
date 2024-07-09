import { Request, Response } from "express";
import crypto from 'crypto';
import UserModel from "../../models/user";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// password hashing function
const hashedPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// generate JWT
const generateAuthToken = (email:string, role:string): string => {
    const secretKey = process.env.JWT_SECRET || '76985732342456789';
    return jwt.sign({email, role}, secretKey, {expiresIn: '1h'});
}

// Register user
const registerUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, studentId, department, email, password, contact, role } = req.body;

        // check if user already exists
        const existingUser = await UserModel.findOne({ email }) || await UserModel.findOne({ studentId });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists!' });
        }

        // hash the password
        const hashPassword = hashedPassword(password);

        // generate auth_token
        const auth_token = generateAuthToken(email, role);

        // create new user
        const userRecord = await UserModel.create({ studentId, name, email, password: hashPassword, contact, department, role, auth_token });
        if (!userRecord) {
            throw new Error('User registration failed!');
        }

        // Success
        return res.status(201).json({ message: 'User Registration done!', data: { userId: userRecord.studentId } });
        
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export default registerUser;

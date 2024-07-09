import { Request, Response } from "express";
import dotenv from 'dotenv';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import UserModel from "../../models/user";

dotenv.config();

// password hashing function
const hashedPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// generate JWT
const generateAuthToken = (email:string, role: string, studentId: number): string => {
    const secretKey = process.env.JWT_SECRET || '76985732342456789';
    return jwt.sign({email, role, studentId}, secretKey, {expiresIn: '1h'});
}

// login user
const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password, role } = req.body;

        // Validate request data
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password both are required!' });
        }

        // check if user not found
        const authUser = await UserModel.findOne({ email });
        if (!authUser) {
            return res.status(400).json({ error: 'User not found!' });
        }

        // hash the password
        const isValidPassword = authUser.password === hashedPassword(password);
        if(!isValidPassword) {
            return res.status(400).json({ error: 'Incorrect Password!'});
        }

        const isValidRole = authUser.role === role;
        if(!isValidRole){
            return res.status(400).json({ error: 'Invalid Role!'});
        }
        
        // Generate and update auth_token
        const newAuthToken = generateAuthToken(email, role, authUser.studentId);
        authUser.auth_token = newAuthToken;
        await authUser.save();

        // Success
        return res.status(201).json({ message: 'You are logged in as an user!', data: { studentId: authUser.studentId, auth_token: authUser.auth_token } });
        
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export default loginUser;

import { Request, Response } from "express";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AdminModel from "../../models/admin";

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

// Register Admin
const registerAdmin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, contact, role } = req.body;

        // check if admin already exists
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists!' });
        }

        // hash the password
        const hashPassword = hashedPassword(password);

        // generate auth_token
        const auth_token = generateAuthToken(email, role);

        // create new admin
        const adminRecord = await AdminModel.create({ name, email, password: hashPassword, contact, role, auth_token });
        if (!adminRecord) {
            throw new Error('Admin registration failed!');
        }

        // Success
        return res.status(201).json({ message: 'You have successfully registered as an admin!', data: { adminId: adminRecord._id } });
        
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export default registerAdmin;

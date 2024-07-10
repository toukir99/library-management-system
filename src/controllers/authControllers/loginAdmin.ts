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
const generateAuthToken = (email : string, role : string): string => {
    const secretKey = process.env.JWT_SECRET || '76985732342456789';
    return jwt.sign({email, role}, secretKey, {expiresIn: '1h'});
}

// login Admin
const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, role } = req.body;

        // Validate request data
        if (!email || !password) {
            res.status(400).json({ error: 'Email and password both are required!' });
        }

        // check if admin not found
        const authAdmin = await AdminModel.findOne({ email });
        console.log(authAdmin);
        if (!authAdmin) {
            res.status(400).json({ error: 'Admin not found!' });
            return;
        }

        // hash the password
        const isValidPassword = authAdmin.password === hashedPassword(password);
        if(!isValidPassword) {
            res.status(400).json({ error: 'Incorrect Password!'});
        }

        const isValidRole = authAdmin.role === role;
        if(!isValidRole){
            res.status(400).json({ error: 'Invalid Role!'});
        }

        // Generate and update auth_token
        const newAuthToken = generateAuthToken(email, role);
        authAdmin.auth_token = newAuthToken;
        await authAdmin.save();

        // Success
        res.status(201).json({ message: 'You are logged in as an admin!', data: { adminId: authAdmin._id, auth_token: authAdmin.auth_token } });
        
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

// Login Admin Page
const loginAdminPage = async (req: Request, res: Response): Promise<void> => {
    try {
        res.render('admin/login');
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export { loginAdmin, loginAdminPage };

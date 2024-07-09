import { Request, Response } from "express";
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import AdminModel from "../../models/admin";

// password hashing function
const hashedPassword = (password: string): string => {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Register Admin
const registerAdmin = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, email, password, contact } = req.body;

        // check if admin already exists
        const existingAdmin = await AdminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists!' });
        }

        // hash the password
        const hashPassword = hashedPassword(password);

        // create new admin
        const adminRecord = await AdminModel.create({ name, email, password: hashPassword, contact, auth_token: uuidv4() });
        if (!adminRecord) {
            throw new Error('Admin registration failed!');
        }

        // Success
        return res.status(201).json({ message: 'Admin Registration done!', data: { adminId: adminRecord._id, auth_token: adminRecord.auth_token } });
        
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}

export default registerAdmin;

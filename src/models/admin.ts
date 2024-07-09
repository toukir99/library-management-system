import mongoose, { Schema, model, Document } from 'mongoose';

// Interface for Admin Document
interface IAdmin extends Document {
    name: string,
    email: string,
    password: string,
    contact: string,
    role: string,
    auth_token: string,
}

// Schema for Admin Document
const adminSchema: Schema<IAdmin> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    role: { type: String, required: true },
    auth_token: {
        type: String,
    },
}, { timestamps: true });

// Admin Model
const AdminModel = model<IAdmin>('admin', adminSchema);

export default AdminModel;

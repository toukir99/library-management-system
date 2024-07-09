import mongoose, { Schema, model, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Interface for Admin Document
interface IAdmin extends Document {
    user_id: mongoose.Types.ObjectId,
    name: string,
    email: string,
    password: string,
    contact: string,
    auth_token: string,
}

// Schema for Admin Document
const adminSchema: Schema<IAdmin> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contact: { type: String, required: true },
    auth_token: {
        type: String,
        default: uuidv4,
    },
}, { timestamps: true });

// Admin Model
const AdminModel = model<IAdmin>('admin', adminSchema);

export default AdminModel;

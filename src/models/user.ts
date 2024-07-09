import { Schema, model, Document } from 'mongoose'

// Interface for User Document
interface IUser extends Document {
    name: string,
    studentId: number,
    department: string,
    contact: string,
    email: string,
    password: string,
    role: string,
    auth_token: string;
}

// Schema for User Document
const userSchema : Schema<IUser> = new Schema({
    name: { type: String, required: true },
    studentId: { type: Number, required: true, unique: true },
    department: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    auth_token: {
        type: String,
      },
    }, { timestamps: true });

// User Model
const UserModel = model<IUser>('user', userSchema);

export default UserModel;
import { Schema, model, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
// Interface for User Document
interface IUser extends Document {
    name: string,
    studentId: number,
    department: string,
    contact: string,
    email: string,
    password: string,
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
    auth_token: {
        type: String,
        default: uuidv4,
      },
    }, { timestamps: true });

// User Model
const UserModel = model<IUser>('user', userSchema);

export default UserModel;
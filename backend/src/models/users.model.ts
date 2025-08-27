import mongoose, { Document, Model, Schema, model } from 'mongoose';
import { IUser } from '../dto/users.dto';

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true, index: true, lowercase: true },
        password: { type: String, required: true },
        refreshToken: String
    },
    { timestamps: true }
);

export interface IUserDocument extends IUser, Document { }

export const User: Model<IUserDocument> =
    mongoose.models.User ||
    model<IUserDocument>('User', UserSchema);

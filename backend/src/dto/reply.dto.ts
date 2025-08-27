import mongoose, { Document } from "mongoose";

export interface IReply extends Document {
    content: string;
    commentId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
}
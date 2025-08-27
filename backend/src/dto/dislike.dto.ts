import mongoose, { Document } from "mongoose";

export interface IDislike extends Document {
    disLikedBy: mongoose.Types.ObjectId;
    commentAuthor: mongoose.Types.ObjectId;
}
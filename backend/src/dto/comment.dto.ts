import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  content: string;
  likeCount: number;
  disCount: number;
  author: mongoose.Types.ObjectId
}
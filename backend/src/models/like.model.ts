import mongoose, { Document, Model, Schema, model } from "mongoose";
import { ILike } from "../dto/like.dto";

const LikeSchema = new Schema<ILike>(
  {
    likedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    commentAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  },
  { timestamps: true }
);

export interface ILikeDocument extends ILike, Document {}

export const Like: Model<ILikeDocument> =
  mongoose.models.Like || model<ILikeDocument>("Like", LikeSchema);

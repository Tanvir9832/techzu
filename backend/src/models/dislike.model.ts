import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IDislike } from "../dto/dislike.dto";

const DislikeSchema = new Schema<IDislike>(
  {
    disLikedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    commentAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
  },
  { timestamps: true }
);

export interface IDislikeDocument extends IDislike, Document {}

export const Dislike: Model<IDislikeDocument> =
  mongoose.models.Dislike || model<IDislikeDocument>("Dislike", DislikeSchema);

import mongoose, { Document, Model, Schema, model } from "mongoose";
import { IReply } from "../dto/reply.dto";

const ReplySchema = new Schema<IReply>(
    {
        content: { type: String, required: true },
        commentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export interface IReplyDocument extends IReply, Document { }

export const Reply: Model<IReplyDocument> =
    mongoose.models.Reply || model<IReplyDocument>("Reply", ReplySchema);

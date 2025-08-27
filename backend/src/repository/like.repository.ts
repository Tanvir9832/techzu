import mongoose from "mongoose";
import { Like, ILikeDocument } from "../models/like.model";

export const LikeRepository = {
    find: (userId: mongoose.Types.ObjectId, commentId: mongoose.Types.ObjectId): Promise<ILikeDocument | null> =>
        Like.findOne({ likedBy: userId, commentAuthor: commentId }),

    create: (data: Partial<ILikeDocument>): Promise<ILikeDocument> =>
        Like.create(data),

    delete: (id: mongoose.Types.ObjectId): Promise<ILikeDocument | null> =>
        Like.findByIdAndDelete(id),
};
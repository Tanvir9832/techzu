import mongoose from "mongoose";
import { Dislike, IDislikeDocument } from "../models/dislike.model";

export const DislikeRepository = {
    find: (userId: mongoose.Types.ObjectId, commentId: mongoose.Types.ObjectId): Promise<IDislikeDocument | null> =>
        Dislike.findOne({ disLikedBy: userId, commentAuthor: commentId }),

    create: (data: Partial<IDislikeDocument>): Promise<IDislikeDocument> =>
        Dislike.create(data),

    delete: (id: mongoose.Types.ObjectId): Promise<IDislikeDocument | null> =>
        Dislike.findByIdAndDelete(id),
};

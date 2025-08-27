import { ReplyRepository } from "../repository/reply.repository";
import { IReplyDocument } from "../models/reply.model";
import mongoose from "mongoose";

export const ReplyService = {
    createReply: async (commentId: string, userId: string, content: string): Promise<IReplyDocument> => {
        const commentIdMongooseType = new mongoose.Types.ObjectId(commentId!)
        const userIdMongooseType = new mongoose.Types.ObjectId(userId!)
        return await ReplyRepository.create({ commentId: commentIdMongooseType, userId: userIdMongooseType, content });
    },

    editReply: async (id: string, content: string): Promise<IReplyDocument> => {
        const reply = await ReplyRepository.findById(id);
        if (!reply) throw new Error("Reply not found");
        reply.content = content;
        return await ReplyRepository.save(reply);
    },

    deleteReply: async (id: string): Promise<void> => {
        const deleted = await ReplyRepository.deleteById(id);
        if (!deleted) throw new Error("Reply not found");
    },

    getRepliesByComment: async (
        commentId: string,
        page: number = 1,
        limit: number = 10
    ): Promise<IReplyDocument[]> => {
        return await ReplyRepository.findByCommentId(commentId, page, limit);
    },
};

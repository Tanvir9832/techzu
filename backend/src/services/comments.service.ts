import { CommentRepository } from "../repository/comment.repository";
import { ICommentDocument } from "../models/comment.model";
import mongoose from "mongoose";

export const CommentService = {
  createComment: async (content: string, authorId: mongoose.Types.ObjectId): Promise<ICommentDocument> => {
    const comment = await CommentRepository.create({ content, author: authorId, likeCount: 0, disCount: 0 });
    return comment;
  },

  editComment: async (id: mongoose.Types.ObjectId, content: string): Promise<ICommentDocument> => {
    const comment = await CommentRepository.findById(id);
    if (!comment) throw new Error("Comment not found");
    comment.content = content;
    return await CommentRepository.save(comment);
  },

  deleteComment: async (id: mongoose.Types.ObjectId): Promise<void> => {
    const deleted = await CommentRepository.deleteById(id);
    if (!deleted) throw new Error("Comment not found");
  },

  getCommentsPaginated: async (
    page: number = 1,
    limit: number = 10,
    sortBy: string = "newest"
  ): Promise<ICommentDocument[]> => {
    return await CommentRepository.findAllPaginated(page, limit, sortBy);
  },
};

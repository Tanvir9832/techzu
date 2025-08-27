import mongoose from "mongoose";
import { Comment, ICommentDocument } from "../models/comment.model";

export const CommentRepository = {
  create: (data: Partial<ICommentDocument>): Promise<ICommentDocument> =>
    Comment.create(data),

  findById: (id: mongoose.Types.ObjectId): Promise<ICommentDocument | null> =>
    Comment.findById(id),

  save: (comment: ICommentDocument): Promise<ICommentDocument> =>
    comment.save(),

  deleteById: (id: mongoose.Types.ObjectId): Promise<ICommentDocument | null> =>
    Comment.findByIdAndDelete(id),

  findAllPaginated: (
    page: number,
    limit: number,
    sortBy: string
  ): Promise<ICommentDocument[]> => {
    let sort: Record<string, 1 | -1> = { createdAt: -1 }; // default newest first

    if (sortBy === "liked") sort = { likeCount: -1 };
    if (sortBy === "disliked") sort = { disCount: -1 };
    if (sortBy === "newest") sort = { createdAt: -1 };

    return Comment.find()
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("author", "email");
  },
};

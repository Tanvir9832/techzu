import { LikeRepository } from "../repository/like.repository";
import { DislikeRepository } from "../repository/dislike.repository";
import { CommentRepository } from "../repository/comment.repository";
import mongoose from "mongoose";

export const ReactionService = {
  toggleLike: async (commentId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
    const existingLike = await LikeRepository.find(userId, commentId);

    if (existingLike) {
      await LikeRepository.delete((existingLike as any)._id.toString());
      const comment = await CommentRepository.findById(commentId);
      if (comment) {
        comment.likeCount = Math.max(0, comment.likeCount - 1);
        await CommentRepository.save(comment);
      }
      return { message: "Like removed" };
    } else {
      await LikeRepository.create({ 
        likedBy: new mongoose.Types.ObjectId(userId), 
        commentAuthor: new mongoose.Types.ObjectId(commentId) 
      });
      const comment = await CommentRepository.findById(commentId);
      if (comment) {
        comment.likeCount += 1;
        await CommentRepository.save(comment);
      }
      return { message: "Comment liked" };
    }
  },

  toggleDislike: async (commentId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
    const existingDislike = await DislikeRepository.find(userId, commentId);

    if (existingDislike) {
      await DislikeRepository.delete((existingDislike as any)._id.toString());
      const comment = await CommentRepository.findById(commentId);
      if (comment) {
        comment.disCount = Math.max(0, comment.disCount - 1);
        await CommentRepository.save(comment);
      }
      return { message: "Dislike removed" };
    } else {
      await DislikeRepository.create({ 
        disLikedBy: new mongoose.Types.ObjectId(userId), 
        commentAuthor: new mongoose.Types.ObjectId(commentId) 
      });
      const comment = await CommentRepository.findById(commentId);
      if (comment) {
        comment.disCount += 1;
        await CommentRepository.save(comment);
      }
      return { message: "Comment disliked" };
    }
  },
};

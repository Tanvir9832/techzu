"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionService = void 0;
const like_repository_1 = require("../repository/like.repository");
const dislike_repository_1 = require("../repository/dislike.repository");
const comment_repository_1 = require("../repository/comment.repository");
const mongoose_1 = __importDefault(require("mongoose"));
exports.ReactionService = {
    toggleLike: async (commentId, userId) => {
        const existingLike = await like_repository_1.LikeRepository.find(userId, commentId);
        if (existingLike) {
            await like_repository_1.LikeRepository.delete(existingLike._id.toString());
            const comment = await comment_repository_1.CommentRepository.findById(commentId);
            if (comment) {
                comment.likeCount = Math.max(0, comment.likeCount - 1);
                await comment_repository_1.CommentRepository.save(comment);
            }
            return { message: "Like removed" };
        }
        else {
            await like_repository_1.LikeRepository.create({
                likedBy: new mongoose_1.default.Types.ObjectId(userId),
                commentAuthor: new mongoose_1.default.Types.ObjectId(commentId)
            });
            const comment = await comment_repository_1.CommentRepository.findById(commentId);
            if (comment) {
                comment.likeCount += 1;
                await comment_repository_1.CommentRepository.save(comment);
            }
            return { message: "Comment liked" };
        }
    },
    toggleDislike: async (commentId, userId) => {
        const existingDislike = await dislike_repository_1.DislikeRepository.find(userId, commentId);
        if (existingDislike) {
            await dislike_repository_1.DislikeRepository.delete(existingDislike._id.toString());
            const comment = await comment_repository_1.CommentRepository.findById(commentId);
            if (comment) {
                comment.disCount = Math.max(0, comment.disCount - 1);
                await comment_repository_1.CommentRepository.save(comment);
            }
            return { message: "Dislike removed" };
        }
        else {
            await dislike_repository_1.DislikeRepository.create({
                disLikedBy: new mongoose_1.default.Types.ObjectId(userId),
                commentAuthor: new mongoose_1.default.Types.ObjectId(commentId)
            });
            const comment = await comment_repository_1.CommentRepository.findById(commentId);
            if (comment) {
                comment.disCount += 1;
                await comment_repository_1.CommentRepository.save(comment);
            }
            return { message: "Comment disliked" };
        }
    },
};

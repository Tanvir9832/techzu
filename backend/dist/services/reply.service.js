"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyService = void 0;
const reply_repository_1 = require("../repository/reply.repository");
const mongoose_1 = __importDefault(require("mongoose"));
exports.ReplyService = {
    createReply: async (commentId, userId, content) => {
        const commentIdMongooseType = new mongoose_1.default.Types.ObjectId(commentId);
        const userIdMongooseType = new mongoose_1.default.Types.ObjectId(userId);
        return await reply_repository_1.ReplyRepository.create({ commentId: commentIdMongooseType, userId: userIdMongooseType, content });
    },
    editReply: async (id, content) => {
        const reply = await reply_repository_1.ReplyRepository.findById(id);
        if (!reply)
            throw new Error("Reply not found");
        reply.content = content;
        return await reply_repository_1.ReplyRepository.save(reply);
    },
    deleteReply: async (id) => {
        const deleted = await reply_repository_1.ReplyRepository.deleteById(id);
        if (!deleted)
            throw new Error("Reply not found");
    },
    getRepliesByComment: async (commentId, page = 1, limit = 10) => {
        return await reply_repository_1.ReplyRepository.findByCommentId(commentId, page, limit);
    },
};

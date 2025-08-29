"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const comment_repository_1 = require("../repository/comment.repository");
exports.CommentService = {
    createComment: async (content, authorId) => {
        const comment = await comment_repository_1.CommentRepository.create({ content, author: authorId, likeCount: 0, disCount: 0 });
        return comment;
    },
    editComment: async (id, content) => {
        const comment = await comment_repository_1.CommentRepository.findById(id);
        if (!comment)
            throw new Error("Comment not found");
        comment.content = content;
        return await comment_repository_1.CommentRepository.save(comment);
    },
    deleteComment: async (id) => {
        const deleted = await comment_repository_1.CommentRepository.deleteById(id);
        if (!deleted)
            throw new Error("Comment not found");
    },
    getCommentsPaginated: async (page = 1, limit = 10, sortBy = "newest") => {
        return await comment_repository_1.CommentRepository.findAllPaginated(page, limit, sortBy);
    },
};

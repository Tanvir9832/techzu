"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const comment_model_1 = require("../models/comment.model");
exports.CommentRepository = {
    create: (data) => comment_model_1.Comment.create(data),
    findById: (id) => comment_model_1.Comment.findById(id),
    save: (comment) => comment.save(),
    deleteById: (id) => comment_model_1.Comment.findByIdAndDelete(id),
    findAllPaginated: (page, limit, sortBy) => {
        let sort = { createdAt: -1 }; // default newest first
        if (sortBy === "liked")
            sort = { likeCount: -1 };
        if (sortBy === "disliked")
            sort = { disCount: -1 };
        if (sortBy === "newest")
            sort = { createdAt: -1 };
        return comment_model_1.Comment.find()
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate("author", "email");
    },
};

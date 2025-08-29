"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRepository = void 0;
const like_model_1 = require("../models/like.model");
exports.LikeRepository = {
    find: (userId, commentId) => like_model_1.Like.findOne({ likedBy: userId, commentAuthor: commentId }),
    create: (data) => like_model_1.Like.create(data),
    delete: (id) => like_model_1.Like.findByIdAndDelete(id),
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DislikeRepository = void 0;
const dislike_model_1 = require("../models/dislike.model");
exports.DislikeRepository = {
    find: (userId, commentId) => dislike_model_1.Dislike.findOne({ disLikedBy: userId, commentAuthor: commentId }),
    create: (data) => dislike_model_1.Dislike.create(data),
    delete: (id) => dislike_model_1.Dislike.findByIdAndDelete(id),
};

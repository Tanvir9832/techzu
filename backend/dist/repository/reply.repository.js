"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyRepository = void 0;
const reply_model_1 = require("../models/reply.model");
exports.ReplyRepository = {
    create: (data) => reply_model_1.Reply.create(data),
    findById: (id) => reply_model_1.Reply.findById(id).populate("userId", "email"),
    findByCommentId: (commentId, page, limit) => reply_model_1.Reply.find({ commentId })
        .sort({ createdAt: -1 })
        //   .skip((page - 1) * limit)
        //   .limit(limit)
        .populate("userId", "email"),
    save: (reply) => reply.save(),
    deleteById: (id) => reply_model_1.Reply.findByIdAndDelete(id),
};

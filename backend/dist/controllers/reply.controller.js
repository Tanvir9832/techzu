"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyController = void 0;
const reply_service_1 = require("../services/reply.service");
exports.ReplyController = {
    create: async (req, res) => {
        try {
            const { commentId } = req.params;
            const { content } = req.body;
            const userId = req.userId;
            const reply = await reply_service_1.ReplyService.createReply(commentId, userId, content);
            res.status(201).json(reply);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const reply = await reply_service_1.ReplyService.editReply(id, content);
            res.json(reply);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await reply_service_1.ReplyService.deleteReply(id);
            res.json({ message: "Reply deleted" });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getReplies: async (req, res) => {
        try {
            const { commentId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const replies = await reply_service_1.ReplyService.getRepliesByComment(commentId, page, limit);
            res.json(replies);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};

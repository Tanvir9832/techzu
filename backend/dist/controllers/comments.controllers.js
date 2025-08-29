"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const comments_service_1 = require("../services/comments.service");
const mongoose_1 = __importDefault(require("mongoose"));
exports.CommentController = {
    create: async (req, res) => {
        try {
            const { content } = req.body;
            const authorId = new mongoose_1.default.Types.ObjectId(req.userId);
            const comment = await comments_service_1.CommentService.createComment(content, authorId);
            res.status(201).json(comment);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const comment = await comments_service_1.CommentService.editComment(new mongoose_1.default.Types.ObjectId(id), content);
            res.json(comment);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            await comments_service_1.CommentService.deleteComment(new mongoose_1.default.Types.ObjectId(id));
            res.json({ message: "Comment deleted" });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const sortBy = req.query.sort || "newest"; // newest, liked, disliked
            const comments = await comments_service_1.CommentService.getCommentsPaginated(page, limit, sortBy);
            res.json(comments);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};

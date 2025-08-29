"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionController = void 0;
const reaction_service_1 = require("../services/reaction.service");
const mongoose_1 = __importDefault(require("mongoose"));
exports.ReactionController = {
    like: async (req, res) => {
        try {
            const { commentId } = req.params;
            const userId = req.userId; // set from auth middleware
            const result = await reaction_service_1.ReactionService.toggleLike(new mongoose_1.default.Types.ObjectId(commentId), new mongoose_1.default.Types.ObjectId(userId));
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    dislike: async (req, res) => {
        try {
            const { commentId } = req.params;
            const userId = req.userId; // set from auth middleware
            const result = await reaction_service_1.ReactionService.toggleDislike(new mongoose_1.default.Types.ObjectId(commentId), new mongoose_1.default.Types.ObjectId(userId));
            res.json(result);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};

import { Response } from "express";
import { ReactionService } from "../services/reaction.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import mongoose from "mongoose";

export const ReactionController = {
    like: async (req: AuthRequest, res: Response) => {
        try {
            const { commentId } = req.params;
            const userId = req.userId; // set from auth middleware
            const result = await ReactionService.toggleLike(new mongoose.Types.ObjectId(commentId!), new mongoose.Types.ObjectId(userId!));
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },

    dislike: async (req: AuthRequest, res: Response) => {
        try {
            const { commentId } = req.params;
            const userId = req.userId; // set from auth middleware
            const result = await ReactionService.toggleDislike(new mongoose.Types.ObjectId(commentId!), new mongoose.Types.ObjectId(userId!));
            res.json(result);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },
};

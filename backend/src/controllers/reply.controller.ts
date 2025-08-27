import { Request, Response } from "express";
import { ReplyService } from "../services/reply.service";
import { AuthRequest } from "../middlewares/auth.middleware";

export const ReplyController = {
    create: async (req: AuthRequest, res: Response) => {
        try {
            const { commentId } = req.params;
            const { content } = req.body;
            const userId = req.userId;
            const reply = await ReplyService.createReply(commentId, userId as string, content);
            res.status(201).json(reply);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },

    edit: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const reply = await ReplyService.editReply(id, content);
            res.json(reply);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await ReplyService.deleteReply(id);
            res.json({ message: "Reply deleted" });
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },

    getReplies: async (req: Request, res: Response) => {
        try {
            const { commentId } = req.params;
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const replies = await ReplyService.getRepliesByComment(commentId, page, limit);
            res.json(replies);
        } catch (err: any) {
            res.status(400).json({ message: err.message });
        }
    },
};

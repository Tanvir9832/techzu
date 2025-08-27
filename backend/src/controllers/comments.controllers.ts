import { Request, Response } from "express";
import { CommentService } from "../services/comments.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import mongoose from "mongoose";

export const CommentController = {
  create: async (req: AuthRequest, res: Response) => {
    try {
        const { content } = req.body;
        const authorId = new mongoose.Types.ObjectId(req.userId!);
        const comment = await CommentService.createComment(content, authorId);
        res.status(201).json(comment);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  edit: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await CommentService.editComment(new mongoose.Types.ObjectId(id!), content);
      res.json(comment);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;
      await CommentService.deleteComment(new mongoose.Types.ObjectId(id!));
      res.json({ message: "Comment deleted" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  getAll: async (req: AuthRequest, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = (req.query.sort as string) || "newest"; // newest, liked, disliked
      const comments = await CommentService.getCommentsPaginated(page, limit, sortBy);
      res.json(comments);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};

import { Router } from "express";
import { ReactionController } from "../controllers/reaction.controller";
import { authenticate } from "../middlewares/auth.middleware";

const reactionRoutes = Router();

reactionRoutes.post("/like/:commentId", authenticate, ReactionController.like);
reactionRoutes.post("/dislike/:commentId", authenticate, ReactionController.dislike);

export default reactionRoutes;

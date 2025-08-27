import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller";
import { authenticate } from "../middlewares/auth.middleware";

const replyRoute = Router();

replyRoute.post("/:commentId", authenticate, ReplyController.create);
replyRoute.put("/:id", authenticate, ReplyController.edit);
replyRoute.delete("/:id", authenticate, ReplyController.delete);
replyRoute.get("/:commentId", ReplyController.getReplies);

export default replyRoute;

import { Router } from "express";
import { CommentController } from "../controllers/comments.controllers";
import { authenticate } from "../middlewares/auth.middleware";

const commentRouter = Router();


commentRouter.post("/", authenticate, CommentController.create);
commentRouter.put("/:id", authenticate, CommentController.edit);
commentRouter.delete("/:id", authenticate, CommentController.delete);
commentRouter.get("/", authenticate, CommentController.getAll);

export default commentRouter;

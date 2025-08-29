"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reaction_controller_1 = require("../controllers/reaction.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const reactionRoutes = (0, express_1.Router)();
reactionRoutes.post("/like/:commentId", auth_middleware_1.authenticate, reaction_controller_1.ReactionController.like);
reactionRoutes.post("/dislike/:commentId", auth_middleware_1.authenticate, reaction_controller_1.ReactionController.dislike);
exports.default = reactionRoutes;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const userRoute = (0, express_1.Router)();
userRoute.post("/register", users_controller_1.AuthController.register);
userRoute.post("/login", users_controller_1.AuthController.login);
userRoute.post("/refresh-token", users_controller_1.AuthController.refreshToken);
exports.default = userRoute;

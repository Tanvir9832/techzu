import { Router } from "express";
import { AuthController } from "../controllers/users.controller";

const userRoute = Router();

userRoute.post("/register", AuthController.register);
userRoute.post("/login", AuthController.login);
userRoute.post("/refresh-token", AuthController.refreshToken);

export default userRoute;

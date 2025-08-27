import { Request, Response } from "express";
import { AuthService } from "../services/users.service";

export const AuthController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await AuthService.register(email, password);
      res.status(201).json({ message: "User registered", user: { email: user.email, id: user._id } });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await AuthService.login(email, password);

      // Send refresh token as HttpOnly cookie
      res.cookie("jid", refreshToken, {
        httpOnly: true,
        path: "/auth/refresh-token",
        maxAge: 7*24*60*60*1000,
        secure: false     // must be false for HTTP
        });
      res.json({ accessToken });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  refreshToken: async (req: Request, res: Response) => {
    try {
      const token = req.cookies.jid;
      if (!token) return res.status(401).json({ message: "No token provided" });

      const { accessToken, refreshToken } = await AuthService.refreshToken(token);
      res.cookie("jid", refreshToken, { httpOnly: true, path: "/auth/refresh-token" });
      res.json({ accessToken });
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  },

};

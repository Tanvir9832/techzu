"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const users_service_1 = require("../services/users.service");
exports.AuthController = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await users_service_1.AuthService.register(email, password);
            res.status(201).json({ message: "User registered", user: { email: user.email, id: user._id } });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken, user } = await users_service_1.AuthService.login(email, password);
            res.cookie("jid", refreshToken, {
                httpOnly: true,
                path: "/auth/refresh-token",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === "production",
            });
            res.json({ accessToken, user });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const token = req.cookies.jid;
            if (!token)
                return res.status(401).json({ message: "No token provided" });
            const { accessToken, refreshToken } = await users_service_1.AuthService.refreshToken(token);
            res.cookie("jid", refreshToken, { httpOnly: true, path: "/auth/refresh-token" });
            res.json({ accessToken });
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    },
};

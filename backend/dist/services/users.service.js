"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config = __importStar(require("../config"));
const users_repository_1 = require("../repository/users.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.AuthService = {
    register: async (email, password) => {
        const existingUser = await users_repository_1.UserRepository.findByEmail(email);
        if (existingUser)
            throw new Error("User already exists");
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await users_repository_1.UserRepository.create({ email: email.toLowerCase(), password: hashedPassword });
        return user;
    },
    login: async (email, password) => {
        const user = await users_repository_1.UserRepository.findByEmail(email);
        if (!user)
            throw new Error("Invalid credentials");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Invalid credentials");
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id }, config.JWT_ACCESS_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRE });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRE });
        user.refreshToken = refreshToken;
        await users_repository_1.UserRepository.save(user);
        return { accessToken, refreshToken, user: { _id: String(user._id), email: user.email } };
    },
    refreshToken: async (token) => {
        try {
            const payload = jsonwebtoken_1.default.verify(token, config.JWT_REFRESH_SECRET);
            const user = await users_repository_1.UserRepository.findById(payload.userId);
            if (!user || user.refreshToken !== token)
                throw new Error("Invalid token");
            const accessToken = jsonwebtoken_1.default.sign({ userId: user._id }, config.JWT_ACCESS_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRE });
            const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id }, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRE });
            user.refreshToken = refreshToken;
            await users_repository_1.UserRepository.save(user);
            return { accessToken, refreshToken };
        }
        catch (err) {
            throw new Error("Invalid token");
        }
    },
};

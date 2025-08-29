"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = exports.MONGO_URI = exports.REFRESH_TOKEN_EXPIRE = exports.ACCESS_TOKEN_EXPIRE = exports.JWT_REFRESH_SECRET = exports.JWT_ACCESS_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
exports.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
exports.ACCESS_TOKEN_EXPIRE = '15m';
exports.REFRESH_TOKEN_EXPIRE = '7d';
exports.MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jwt-auth';
exports.PORT = process.env.PORT || 5000;

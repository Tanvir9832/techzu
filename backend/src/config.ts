import dotenv from 'dotenv';
dotenv.config();

export const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';
export const ACCESS_TOKEN_EXPIRE = '15m';
export const REFRESH_TOKEN_EXPIRE = '7d';

export const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jwt-auth';
export const PORT = process.env.PORT || 5000;
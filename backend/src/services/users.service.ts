import jwt from "jsonwebtoken";
import * as config from "../config";
import { UserRepository } from "../repository/users.repository";
import { IUserDocument } from "../models/users.model";
import bcrypt from 'bcrypt'

export const AuthService = {
  register: async (email: string, password: string): Promise<IUserDocument> => {
    const existingUser = await UserRepository.findByEmail(email);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.create({ email: email.toLowerCase(), password: hashedPassword });
    return user;
  },

  login: async (
    email: string,
    password: string
  ): Promise<{ accessToken: string; refreshToken: string; user: { _id: string; email: string } }> => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = jwt.sign({ userId: user._id }, config.JWT_ACCESS_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRE });
    const refreshToken = jwt.sign({ userId: user._id }, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRE });

    user.refreshToken = refreshToken;
    await UserRepository.save(user);

    return { accessToken, refreshToken, user: { _id: String(user._id), email: user.email } };
  },

  refreshToken: async (token: string): Promise<{ accessToken: string; refreshToken: string }> => {
    try {
      const payload = jwt.verify(token, config.JWT_REFRESH_SECRET) as { userId: string };

      const user = await UserRepository.findById(payload.userId);

      if (!user || user.refreshToken !== token) throw new Error("Invalid token");

      const accessToken = jwt.sign({ userId: user._id }, config.JWT_ACCESS_SECRET, { expiresIn: config.ACCESS_TOKEN_EXPIRE });
      const refreshToken = jwt.sign({ userId: user._id }, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_EXPIRE });

      user.refreshToken = refreshToken;
      await UserRepository.save(user);

      return { accessToken, refreshToken };
    } catch (err) {
      throw new Error("Invalid token");
    }
  },
};

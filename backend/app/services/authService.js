import { hashPassword, comparePassword } from "../utils/password.js";
import {
  validateSignup,
  validateSignin,
  validateChangePassword,
} from "../validators/authValidator.js";
import User from "../models/Users.js";
import AppError from "../utils/AppError.js";
import mongoose from "mongoose";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token.js";

export const signupUser = async (userData) => {
  const { name, email, password } = userData;

  validateSignup({ name, email, password });

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already Exist", 409);
  }
  const hashedPassword = await hashPassword(password);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  return {
    message: "Signup successful",
    userId: user._id,
  };
};

export const signinUser = async ({ email, password }) => {
  validateSignin({ email, password });

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid Email or Password", 401);
  }

  const isPasswordCorrect = await comparePassword(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid Email or Password", 401);
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  return {
    accessToken,
    refreshToken,
  };
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  validateChangePassword(currentPassword, newPassword);

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const isPasswordCorrect = await comparePassword(
    currentPassword,
    user.password,
  );
  if (!isPasswordCorrect) {
    throw new AppError("Incorrect Password", 401);
  }
  if (currentPassword === newPassword) {
    throw new AppError("Password must be different");
  }
  const hashedPassword = await hashPassword(newPassword);
  user.password = hashedPassword;
  await user.save();
  return {
    message: "Password changed successfully",
  };
};

export const refreshAccessToken = async (refreshToken) => {
  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new AppError("Invalid or expired refresh token", 401);
  }
  const user = await User.findById(decoded.sub);

  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (!user.isActive) {
    throw new AppError("User account is inactive", 403);
  }
  const accessToken = generateAccessToken(user);
  return accessToken;
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
};

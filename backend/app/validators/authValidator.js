import AppError from "../utils/AppError.js";

export const validateSignup = ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new AppError("Name, email and password are required", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("Invalid email address", 400);
  }

  if (password.length < 8) {
    throw new AppError("Password must be at least 8 characters", 400);
  }
};

export const validateSignin = ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new AppError("Invalid email address", 400);
  }
};

export const validateChangePassword = (currentPassword, newPassword) => {
  if (!currentPassword || !newPassword) {
    throw new AppError("Current password and new password are required", 400);
  }

  if (newPassword.length < 8) {
    throw new AppError("New password must be at least 8 characters", 400);
  }
};

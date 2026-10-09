import AppError from "../utils/AppError.js";

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Authentication Required", 401);
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw new AppError("Access denied", 403);
    }
    next();
  };
};

export default roleMiddleware;

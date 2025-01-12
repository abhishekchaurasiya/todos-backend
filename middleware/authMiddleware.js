import jwt from "jsonwebtoken";
import UserModel from "../models/userModels.js";
import ErrorHandler from "../utils/errorHandler.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.user_token || req.headers?.authorization?.split(" ")[1];
    if (!token) return next(new ErrorHandler("Not authorized", 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) return next(new ErrorHandler("Invalid token", 401));

    const user = await UserModel.findById({ _id: decoded._id }).select(
      "-password"
    );
    if (!user) return next(new ErrorHandler("User not found", 401));

    req.user = user;
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 401));
  }
};

export default authMiddleware;

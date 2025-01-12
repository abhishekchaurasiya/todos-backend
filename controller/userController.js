import UserModel from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import generateToken from "../utils/generateToken.js";
import { loginValidation, registerValidatin } from "../utils/joiValidation.js";
import bcrypt from "bcrypt";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "strict",
  secure: true,
  maxAge: 24 * 60 * 60 * 1000,
}; // 24 hours

export const registerUser = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = registerValidatin(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const { user_name, email, password } = req.body;

    const existing_user = await UserModel.findOne({ email: email });
    if (existing_user) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      user_name,
      email,
      password: hash_password,
    });

    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(500).json({ message: "Failed to save user" });
    }

    // Remove password from response
    delete savedUser._doc.password;

    const token = await generateToken(savedUser);
    res.cookie("user_token", token, COOKIE_OPTIONS);

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: savedUser,
      token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const loginUser = async (req, res, next) => {
  try {
    // Validate request body
    const { error } = loginValidation(req.body);
    if (error) {
      return next(new ErrorHandler(error.details[0].message, 400));
    }

    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid credentials", 401));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Invalid credentials", 401));

    delete user._doc.password;
    const token = await generateToken(user);
    if (!token) {
      return next(new ErrorHandler("Failed to generate token", 401));
    }

    res.setHeader("Set-Cookie", COOKIE_OPTIONS);
    res.cookie("user_token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      message: `${user?.user_name} loggedIn successfully`,
      success: true,
      user: user,
      token,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = req.user;
    // if (!user) return next(new ErrorHandler("User not found", 401));
    res.clearCookie("user_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res
      .status(200)
      .json({ message: "User logged out successfully", success: true });
  } catch (error) {
    return next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return next(new ErrorHandler("User not found", 400));
    return res
      .status(200)
      .json({ success: true, message: "User Profile", user });
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) return next(new ErrorHandler("User not found", 400));

    const { user_name } = req.body;
    user.user_name = user_name;
    await user.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "User Profile updated successfully",
        user,
      });
  } catch (error) {
    return next(error);
  }
};
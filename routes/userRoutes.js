
/// user routers
import express from "express";
import * as userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/user/register", userController.registerUser);
router.post("/user/login", userController.loginUser);

router.get("/user/logout", authMiddleware, userController.logout);
router.get("/user/profile", authMiddleware, userController.userProfile);
router.get("/user/update", authMiddleware, userController.updateProfile);

export default router;
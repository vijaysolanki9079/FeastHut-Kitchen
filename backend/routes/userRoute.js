import express from "express";
import { registerUser, loginUser  } from "../controllers/userController.js";
// , getUserProfile
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// optional: protect routes later with JWT middleware
// userRouter.get("/profile", authMiddleware, getUserProfile);

export default userRouter;

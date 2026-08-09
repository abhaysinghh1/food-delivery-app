import express from "express";
import rateLimit from "express-rate-limit";
import { loginUser, registerUser } from "../Controllers/userController.js";

const userRouter = express.Router();

// Rate limiter: max 10 attempts per IP per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    standardHeaders: true,  // Return rate limit info in RateLimit-* headers
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many attempts from this IP. Please try again after 15 minutes."
    }
});

userRouter.post("/register", authLimiter, registerUser);
userRouter.post("/login", authLimiter, loginUser);

export default userRouter;

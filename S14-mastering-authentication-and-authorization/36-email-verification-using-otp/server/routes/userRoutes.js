import express from "express";
import { CheckAuth } from "../middlewares/Auth.js";
import {
  createUser,
  getUserDetails,
  loginUser,
  logoutUser,
  sendOtp,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/data", CheckAuth, getUserDetails);

router.post("/logout", logoutUser);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

export default router;

import express from "express";
import { CheckAuth } from "../middlewares/authMiddleware.js";
import {
  createUser,
  getUserDetails,
  loginUser,
  loginWithGoogle,
  logouAll,
  logoutUser,
  sendOtp,
  signInWithGoogle,
  verifyOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user/register", createUser);

router.post("/user/login", loginUser);

router.get("/user/data", CheckAuth, getUserDetails);

router.post("/user/logout", logoutUser);

router.post("/user/logout/all", logouAll);

router.post("/user/send-otp", sendOtp);

router.post("/user/verify-otp", verifyOtp);

router.post("/user/google/login", loginWithGoogle);

router.post("/user/google/signin", signInWithGoogle);

export default router;

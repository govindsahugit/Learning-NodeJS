import express from "express";
import { CheckAuth } from "../middlewares/Auth.js";
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

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/data", CheckAuth, getUserDetails);

router.post("/logout", logoutUser);

router.post("/logout/all", logouAll);

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/google/login", loginWithGoogle);

router.post("/google/signin", signInWithGoogle);


export default router;

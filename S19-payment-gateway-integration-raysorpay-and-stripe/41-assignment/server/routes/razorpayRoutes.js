import express from "express";
import {
  createMediumPlan,
  createPremiumPlan,
  createStarterPlan,
} from "../controllers/razorpayController.js";
import { CheckAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create/starter/plan", CheckAuth, createStarterPlan);

router.post("/create/medium/plan", CheckAuth, createMediumPlan);

router.post("/create/premium/plan", CheckAuth, createPremiumPlan);

export default router;

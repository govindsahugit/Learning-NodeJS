import express from "express";

import { createPlan, deletePlan, getaAllPlanData, updatePlan } from "../controllers/planController.js";

const router = express.Router();

router.post("/create", createPlan);

router.put("/update/:id", updatePlan);

router.delete("/delete/:id", deletePlan);

router.get("/get/all/plans", getaAllPlanData);

export default router;

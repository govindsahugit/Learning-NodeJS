import express from "express";
import { getAllUsers } from "../controllers/adminController.js";
import { CheckAuth, isAdminAndManager } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", CheckAuth, isAdminAndManager, getAllUsers);

export default router;

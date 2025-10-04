import express from "express";
import {
  getAllUsers,
  logoutUserByAdmin,
} from "../controllers/adminController.js";
import { CheckAuth, isAdminOrManager } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", CheckAuth, isAdminOrManager, getAllUsers);

router.post(
  "/admin/logout/user/:id",
  CheckAuth,
  isAdminOrManager,
  logoutUserByAdmin
);

export default router;

import express from "express";
import {
  deleteUserByAdmin,
  getAllUsers,
  logoutUserByAdmin,
} from "../controllers/adminController.js";
import {
  CheckAuth,
  isAdmin,
  isAdminOrManager,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", CheckAuth, isAdminOrManager, getAllUsers);

router.post(
  "/admin/logout/user/:id",
  CheckAuth,
  isAdminOrManager,
  logoutUserByAdmin
);

router.delete("/admin/delete/user/:id", CheckAuth, isAdmin, deleteUserByAdmin);

export default router;

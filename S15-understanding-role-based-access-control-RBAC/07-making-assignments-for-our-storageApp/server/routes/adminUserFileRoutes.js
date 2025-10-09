import express from "express";
import { isOwner, isOwnerOrAdmin } from "../middlewares/authMiddleware.js";
import {
  deleteUserFile,
  readUserFile,
  renameUserFile,
  uploadUserFile,
} from "../controllers/adminUserFileController.js";

const router = express.Router();

router.get("/admin/read/user/file/:id", isOwnerOrAdmin, readUserFile);

router.post("/admin/upload/user/file/{:parentDirId}", isOwner, uploadUserFile);

router.delete("/admin/delete/user/file/:id", isOwner, deleteUserFile);

router.patch("/admin/rename/user/file/:id", isOwner, renameUserFile);

export default router;

import express from "express";
import {
  getDirectoryData,
  makeDirectoryPublic,
  makeDirectoryUnPublic,
  readPublicFile,
} from "../controllers/publicController.js";
import { CheckAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/directory/{:id}", getDirectoryData);

router.post("/directory/{:id}", CheckAuth, makeDirectoryPublic);

router.patch("/directory/{:id}", CheckAuth, makeDirectoryUnPublic);

router.get("/file/{:id}", readPublicFile);

export default router;

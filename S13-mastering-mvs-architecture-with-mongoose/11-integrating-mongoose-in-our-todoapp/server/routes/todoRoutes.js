import express from "express";
import {
  createTudo,
  deleteTudo,
  getAllTudos,
  getSingleTudo,
  updateTudo,
} from "../controllers/tudoController.js";

const router = express.Router();

router.post("/", createTudo);

router.get("/", getAllTudos);

router.get("/:id", getSingleTudo);

router.put("/:id", updateTudo);

router.delete("/:id", deleteTudo);

export default router;

import express from "express";
import { serverController } from "../controllers/controller.js";
import { verifyGithubSignature } from "../middlewares/githubMiddleware.js";

const router = express.Router();

router.post("/", verifyGithubSignature, serverController);

export default router;

import crypto from "crypto";
import { setGithubStatus } from "../services/statusApis.js";

export const verifyGithubSignature = async (req, res, next) => {
  const GitHubSignature = req.headers["x-hub-signature-256"];

  if (!GitHubSignature) return res.end("OK");

  const signature =
    "sha256=" +
    crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

  if (GitHubSignature !== signature) return res.end("OK");

  res.end("OK");

  const repositoryName = req.body.repository.full_name;

  await setGithubStatus(
    repositoryName,
    req.body.after,
    "pending",
    "Pipeline is running...",
    "http://localhost:4000/logs.txt"
  );

  next();
};

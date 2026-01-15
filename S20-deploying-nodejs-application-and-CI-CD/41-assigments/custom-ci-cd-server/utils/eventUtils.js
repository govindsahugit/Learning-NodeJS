import fs from "fs/promises";
import { setGithubStatus } from "../services/statusApis.js";
import { sendEmail } from "../services/sendEmail.js";
import { checkHealth } from "./utils.js";
import { cleanupDisk, triggerRollback } from "./processUtils.js";

export const stdoutOnData = async (data) => {
  process.stdout.write(data);
  await fs.appendFile("./logs/logs.txt", data.toString(), "utf8");
};

export const stderrOnData = async (data) => {
  process.stderr.write(data);
  await fs.writeFile("./logs/logs.txt", data.toString(), "utf8");
};

export const onCloseForStartingScript = async ({
  code,
  req,
  sha,
  repositoryName,
}) => {
  if (code === 0) {
    const isHealthy = await checkHealth(
      "https://test.api.govindsahu.me/health"
    );

    if (isHealthy) {
      await setGithubStatus(
        repositoryName,
        sha,
        "success",
        "Build and deployed succefull!",
        "http://localhost:4000/logs.txt"
      );

      await cleanupDisk(req);

      console.log("Script executed successfully!");
    } else {
      console.log("🚨 App is unhealthy! Triggering automatic rollback...");
      await triggerRollback(req);
    }
  } else {
    await setGithubStatus(
      repositoryName,
      sha,
      "failure",
      `Failed to run pipeline for commit ${req.body.commits[0].message}`,
      "http://localhost:4000/logs.txt"
    );
    await sendEmail(req.body);
    await fs.rm(`${sha}.sh`);
    console.log("Script execution failed!");
  }
};

export const onError = async ({ err, req, sha, repositoryName }) => {
  await setGithubStatus(
    repositoryName,
    sha,
    "failure",
    `Failure ${err.message}`,
    "http://localhost:4000/logs.txt"
  );
  await sendEmail(req.body);
  await fs.rm(`${sha}.sh`);
  console.log("Error in spawning the process!");
  console.log(err);
  await fs.writeFile("./logs/logs.txt", err.toString(), "utf8");
};

import { spawn } from "child_process";
import fs from "fs/promises";
import { setGithubStatus } from "../services/statusApis.js";
import { prepareCleanupScript, prepareRollbackScript } from "./scriptUtils.js";
import { onError, stderrOnData, stdoutOnData } from "./eventUtils.js";

export const spawnChildProcess = async ({
  sha,
  stdoutOnData,
  stderrOnData,
  onClose,
  onError,
}) => {
  const bashChildProcess = spawn("bash", [`./${sha}.sh`]);

  bashChildProcess.stdout.on("data", async (data) => stdoutOnData(data));

  bashChildProcess.stderr.on("data", async (data) => stderrOnData(data));

  bashChildProcess.on("close", async (code) => onClose(code));

  bashChildProcess.on("error", async (err) => onError(err));
};

export const triggerRollback = async (req) => {
  const repositoryName = req.body.repository.full_name;
  const prevSha = req.body.before;
  const sha = req.body.after;

  await prepareRollbackScript(req);

  await spawnChildProcess({
    sha: prevSha,
    stdoutOnData,
    stderrOnData,
    onClose: async () => {
      await setGithubStatus(
        repositoryName,
        sha,
        "failure",
        `Health check failed. Auto-rolled back to previous version. ⏪`,
        "http://localhost:4000/logs.txt"
      );
      await fs.rm(`${prevSha}.sh`);
    },
    onError: async (err) => onError({ err, req, sha, repositoryName }),
  });
};

export const cleanupDisk = async (req) => {
  const sha = req.body.after;
  const repositoryName = req.body.repository.full_name;

  await prepareCleanupScript(req);

  await spawnChildProcess({
    sha,
    stdoutOnData,
    stderrOnData,
    onError: async (err) => onError({ err, req, sha, repositoryName }),
    onClose: async () => await fs.rm(`${sha}.sh`),
  });
};

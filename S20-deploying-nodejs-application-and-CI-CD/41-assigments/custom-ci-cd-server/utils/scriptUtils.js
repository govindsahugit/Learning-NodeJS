import fs from "fs/promises";
import { getFormattedDate, parsedYaml } from "./utils.js";

export const prepareBashFile = async (req) => {
  const ref = req.body.ref;
  const branch = ref.split("/").pop();

  const repositoryName = req.body.repository.name;

  const data = await parsedYaml("workspace.yml");

  const repository = data.projects.find(
    (project) => project.name === repositoryName
  );

  const environment = repository.environments.find(
    (env) => env.branch === branch
  );

  if (!environment) {
    throw new Error(`No environment configuration found for branch: ${branch}`);
  }

  return { environment };
};

export const prepareRollbackScript = async (req) => {
  const prevSHA = req.body.before;

  process.env.PREVIOUS_RELEASE = prevSHA;

  const { environment } = await prepareBashFile(req);

  const fullScript = Object.values(environment.rollback).join("\n") + "\n";
  await fs.writeFile(`${prevSHA}.sh`, fullScript, "utf8");
};

export const prepareScript = async (req) => {
  const sha = req.body.after;

  process.env.NEW_RELEASE = `${getFormattedDate()}-${sha}`;
  process.env.CLONE_URL = req.body.repository.clone_url;

  const { environment } = await prepareBashFile(req);

  const fullScript = Object.values(environment.commands).join("\n") + "\n";
  await fs.writeFile(`${sha}.sh`, fullScript, "utf8");
};

export const prepareCleanupScript = async (req) => {
  const sha = req.body.after;
  const { environment } = await prepareBashFile(req);

  const fullScript = Object.values(environment.cleanup).join("\n") + "\n";

  await fs.writeFile(`${sha}.sh`, fullScript, "utf8");
};

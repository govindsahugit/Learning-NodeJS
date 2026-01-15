import { onCloseForStartingScript, onError, stderrOnData, stdoutOnData } from "../utils/eventUtils.js";
import { spawnChildProcess } from "../utils/processUtils.js";
import { prepareScript } from "../utils/scriptUtils.js";

export const serverController = async (req, res, next) => {
  console.log("webhook started!");
  try {
    const repositoryName = req.body.repository.full_name;
    const sha = req.body.after;

    await prepareScript(req);

    await spawnChildProcess({
      sha,
      stdoutOnData,
      stderrOnData,
      onClose: (code) =>
        onCloseForStartingScript({ code, req, sha, repositoryName }),
      onError: (err) => onError({ err, req, sha, repositoryName }),
    });
  } catch (error) {
    next(error);
  }
};

import { spawn } from "child_process";

const bashChildProcess = spawn("bash", ["deploy-frontend-ec2.sh"]);

bashChildProcess.stdout.on("data", (data) => {
  process.stdout.write(data);
});

bashChildProcess.stderr.on("data", (data) => {
  process.stderr.write(data);
});

bashChildProcess.on("close", (code) => {
  if (code === 0) {
    console.log("Script executed successfully!");
  } else {
    console.log("Script execution failed!");
  }
});

bashChildProcess.on("error", (err) => {
  console.log("Error in spawning the process!");
  console.log(err);
});

// Blog Link: https://dzone.com/articles/automating-nodejs-deployments-with-a-custom-cicd-server
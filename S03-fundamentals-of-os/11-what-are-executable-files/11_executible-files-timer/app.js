#!/usr/bin/env node
import { exec } from "node:child_process";

const fileNames = import.meta.filename.split("\\");

console.log("running myexe file...");

exec(`node ${fileNames[fileNames.length - 1]}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout:\n${stdout}`);
});

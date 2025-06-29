import { spawn } from "child_process";
import fs, { createWriteStream } from "fs";
import { stdin } from "process";
import { pipeline } from "stream";

// Readable stream
// console.log(process.stdin);

// Writable stream
// console.log(process.stdout);
// console.log(process.stderr);

// process.stdout.write("hii\n");

// process.stdin.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

// const writeStream = fs.createWriteStream("output.txt");
// // process.stdin.on("data", (chunk) => {
// //   writeStream.write(chunk);
// // });
// process.stdin.pipe(writeStream);

// console.log(process.stdin.fd);
// console.log(process.stdout.fd);
// console.log(process.stderr.fd);

// const childProcess = spawn("cat", ["output.txt"]);
// childProcess.stdout.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

const childProcess = spawn("node", ["childApp.js"]);
// childProcess.stdout.on("data", (chunk) => {
//   console.log(chunk.toString());
// });
// childProcess.stdin.write("100505");

const writeStream = createWriteStream("video.mp4", {
  highWaterMark: 100 * 1024 * 1024,
});

// childProcess.stdout.on("data", (chunk) => {
//   const isEmpty = writeStream.write(chunk);
//   if (!isEmpty) childProcess.stdout.pause();
// });
// writeStream.on("drain", () => {
//   childProcess.stdout.resume();
// });

pipeline(childProcess.stdout, writeStream, (err) => console.log(err));

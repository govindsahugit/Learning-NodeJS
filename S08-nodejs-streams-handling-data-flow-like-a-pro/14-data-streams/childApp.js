import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream";

// console.log("This the child app process.");

// const writeStream = createWriteStream("output.txt");
// pipeline(process.stdin, writeStream, (err) => console.log(err));

const readStream = createReadStream(
  "f:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv",
  { highWaterMark: 100 * 1024 * 1024 }
);

pipeline(readStream, process.stdout, (err) => console.log(err));

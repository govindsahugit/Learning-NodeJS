import fs from "fs";

// const writeStream = fs.createWriteStream("file.txt");
// writeStream.write("abc");
// writeStream.write("123");
// writeStream.write("ABC");

console.time();

const writeStream = fs.createWriteStream("video.mp4", {
  highWaterMark: 1 * 1024 * 1024,
});

const readStream = fs.createReadStream(
  "F:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv",
  { highWaterMark: 1 * 1024 * 1024 }
);

readStream.on("data", (chunk) => {
  //   fs.appendFileSync("video.mp4", chunk); // time: 6.2s, memory: 40MB, CPU: 6%
  //   writeStream.write(chunk); // time: 1.8s, memory: 500MB, CPU: 6%

  //   After handling backpressure
  const isEmpty = writeStream.write(chunk); // time: 1.6s, memory: 40MB, CPU: 7%
  if (!isEmpty) readStream.pause();
});
writeStream.on("drain", () => {
  readStream.resume();
});

readStream.on("end", () => {
  console.timeEnd();
});

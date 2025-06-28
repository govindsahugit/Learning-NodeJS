import fs from "fs";

const readSreams = fs.createReadStream(
  "F:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv",
  { highWaterMark: 100 * 1024 * 1024 }
);

const writeStream = fs.createWriteStream("video.mp4", {
  highWaterMark: 100 * 1024 * 1024,
});

// readSreams.on("data", (chunk) => {
//   const isEmpty = writeStream.write(chunk);
//   if (!isEmpty) readSreams.pause();
// });
// writeStream.on("drain", () => readSreams.resume());

readSreams.pipe(writeStream);

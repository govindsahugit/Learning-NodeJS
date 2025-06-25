import fs from "fs";

const readStream = fs.createReadStream("chars.txt", { highWaterMark: 4 });
// readStream.on("data", (chunk) => {
//   console.log(chunk);
//   fs.appendFileSync("abc.txt", chunk);
//   readStream.pause();
// });
readStream.on("data", (chunk) => {
  //   console.log(chunk);
  //   fs.appendFileSync("abc.txt", chunk);
  //   console.log(readStream.bytesRead);
  //   console.log(readStream.readableHighWaterMark);
  if (readStream.bytesRead === readStream.readableHighWaterMark) {
    fs.writeFileSync("abc.txt", chunk);
  } else {
    fs.appendFileSync("abc.txt", chunk);
  }
  readStream.pause();
  setTimeout(() => {
    readStream.resume();
  }, 100);
});

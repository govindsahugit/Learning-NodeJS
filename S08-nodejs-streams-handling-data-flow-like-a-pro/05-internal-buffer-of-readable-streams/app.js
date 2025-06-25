import fs from "fs";

const readStream = fs.createReadStream("chars.txt", { highWaterMark: 4 });

readStream.on("readable", () => {
  console.log(readStream.readableLength);
  console.log(readStream.read(3));
  console.log(readStream.readableLength);
});

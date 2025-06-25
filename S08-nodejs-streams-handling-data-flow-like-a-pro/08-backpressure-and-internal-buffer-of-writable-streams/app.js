import fs, { write } from "fs";

const writeStream = fs.createWriteStream("file.txt", { highWaterMark: 4 });

let i = 1;
while (i <= 1000) {
  console.log(writeStream.writableLength);
  let isEmpty = writeStream.write("a");
  i++;
  if (!isEmpty) break;
  console.log(isEmpty);
}

writeStream.on("drain", () => {
  while (i <= 1000) {
    console.log(writeStream.writableLength);
    let isEmpty = writeStream.write("a");
    i++;
    if (!isEmpty) break;
    console.log(isEmpty);
  }
});

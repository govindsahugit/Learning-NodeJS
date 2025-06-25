import fs from "fs";
// import fs from "fs/promises";

// console.time();

// ================================================================ //

// const buff = await fs.readFile("chars.txt");
// console.log(buff.toString());

// const buff = await fs.readFile(
//   "F:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv"
// ); // error

// const buff = await fs.readFile(
//   "F:\\Movies & Series\\Hollywood\\MCU\\Phase-1\\1\\@AM Iron Man 2008 English BluRay AAC.mkv"
// );

// fs.writeFile("buff1.mp4", buff);

// ================================================================ //

// const readStream1 = fs.createReadStream(
//   "F:\\Movies & Series\\Hollywood\\MCU\\Phase-1\\1\\@AM Iron Man 2008 English BluRay AAC.mkv",
//   { highWaterMark: 100 * 1024 * 1024 }
// );
// readStream1.on("data", (chunkBuffer) => {
//   fs.appendFileSync("buff.mp4", chunkBuffer);
// });

// const readStream2 = fs.createReadStream(
//   "F:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv",
//   { highWaterMark: 100 * 1024 * 1024 }
// );
// readStream2.on("data", (chunkBuffer) => {
//   fs.appendFileSync("buff2.mp4", chunkBuffer);
//   if (chunkBuffer.byteLength < 100 * 1024 * 1024) console.timeEnd();
// });

// const readStream3 = fs.createReadStream("chars.txt", { highWaterMark: 4 });
// let count = 1;
// readStream3.on("data", (chunk) => {
//   console.log(chunk.byteLength, ": ", count);
//   count++;
// });
// readStream3.on("end", (chunk) => {
//   console.log(`Total chunks are ${count - 1}.`);
// });

// const readStream2 = fs.createReadStream(
//   "F:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv",
//   { highWaterMark: 1 * 1024 * 1024 }
// );
// let readCount = 1;
// readStream2.on("data", (chunkBuffer) => {
//   console.log(chunkBuffer.byteLength, ":", readCount);
//   readCount++;
// });
// readStream2.on("end", (chunk) => {
//   console.log(`Total counts are ${readCount - 1}`);
//   console.timeEnd();
// });

// const readStream2 = fs.createReadStream(
//   "F:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv",
//   { highWaterMark: 1 * 1024 * 1024 }
// );
// let readCount = 1;
// readStream2.on("data", (chunkBuffer) => {
//   console.log(chunkBuffer.byteLength, ":", readCount);
//   readCount++;
// });
// readStream2.on("end", (chunk) => {
//   console.log(`Total counts are ${readCount - 1}`);
//   console.timeEnd();
// });

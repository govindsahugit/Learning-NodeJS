import fs from "fs/promises";

// const fileHandle = await fs.open("text.txt");
// const readStream = fileHandle.createReadStream();
// readStream.on("data", (chunk) => {
//   console.log(chunk.toString());
// });

const fileHandle = await fs.open("text.txt", "w+");
const writeStream = fileHandle.createWriteStream();
writeStream.write("Hii");

import fs from "fs/promises";

const fileHandle = await fs.open("text.txt", "a+");
// console.log(fileHandle);

// const { buffer, bytesRead } = await fileHandle.read({
//   buffer: Buffer.alloc(10),
// });
// console.log(buffer, "\n", bytesRead);

const { buffer: writtenBuffer, bytesWritten } = await fileHandle.write(
  Buffer.from("hii")
);
console.log(writtenBuffer, bytesWritten);

console.log(fileHandle.fd); // output > 0
fileHandle.close();
console.log(fileHandle.fd); // output < 0

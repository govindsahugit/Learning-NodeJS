import fs from "fs";

console.time();

// Time 200ms
// const fd = fs.openSync("nums.txt", "w+");
// for (let i = 1; i <= 10; i++) {
//   fs.writeSync(fd, `${i}, `);
//   if (i === 10) console.timeEnd();
// }
// fs.closeSync(fd);

const fd = fs.openSync("nums.txt", "w+");
const buffer = Buffer.allocUnsafe(16 * 1024);
let totalBytesWrittenInBuffer = 0;
let remainingStr = "";
for (let i = 1; i <= 100000; i++) {
  let str = `${i}, `;
  str = remainingStr + str;
  const bytesWritten = buffer.write(str, totalBytesWrittenInBuffer);
  remainingStr = "";
  const writtenBytesDifferent = str.length - bytesWritten;
  if (writtenBytesDifferent !== 0) remainingStr += str.slice(bytesWritten);
  totalBytesWrittenInBuffer += bytesWritten;
  if (totalBytesWrittenInBuffer === buffer.byteLength) {
    fs.writeSync(fd, buffer);
    totalBytesWrittenInBuffer = 0;
  }
  if (i === 100000) console.timeEnd();
}
fs.writeSync(fd, buffer.subarray.totalBytesWrittenInBuffer + remainingStr);
fs.closeSync(fd);

import fs from "fs";

const fd = fs.openSync("text.txt");
// fs.read(fd, (err, byteRead, buffData) => {
//   console.log(err);
//   console.log(byteRead);
//   console.log(buffData);
//   console.log(buffData.toString());
//   console.log(buffData.byteLength);
// });
// fs.read(3, (err, byteRead, buffData) => {
//   console.log(byteRead);
//   console.log(buffData.toString());
// });
const readBuff = Buffer.alloc(10);
// fs.read(fd, { buffer: readBuff }, (err, byteRead, buffData) => {
//   console.log(byteRead);
//   console.log(buffData.toString());
//   console.log(buffData);
// });
// fs.read(fd, { buffer: readBuff, position: 2 }, (err, byteRead, buffData) => {
//   console.log(byteRead);
//   console.log(buffData.toString());
//   console.log(buffData);
// });
// fs.read(fd, { buffer: readBuff, position: 2, length: 5 }, (err, byteRead, buffData) => {
//   console.log(byteRead);
//   console.log(buffData.toString());
//   console.log(buffData);
// });
fs.read(
  fd,
  { buffer: readBuff, position: 2, length: 5, offset: 2 },
  (err, byteRead, buffData) => {
    console.log(byteRead);
    console.log(buffData.toString());
    console.log(buffData);
  }
);

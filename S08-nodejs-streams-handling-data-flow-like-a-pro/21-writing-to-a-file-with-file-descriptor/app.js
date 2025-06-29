import fs from "fs";

const fd = fs.openSync("text.txt", "w");

// fs.write(fd, "abc", (err, bytesWritten, writtenData) => {
//   console.log(bytesWritten);
//   console.log(writtenData);
// });
// const buff = Buffer.from("123");
// fs.write(fd, buff, (err, bytesWritten, writtenData) => {
//   console.log(bytesWritten);
//   console.log(writtenData);
// });
// fs.write(fd, "😮", (err, bytesWritten, writtenData) => {
//   console.log(bytesWritten); // 4
//   console.log(writtenData);
// });
// fs.write(fd, "ब", (err, bytesWritten, writtenData) => {
//   console.log(bytesWritten); // 3
//   console.log(writtenData);
// });
// fs.write(fd, "त्र", (err, bytesWritten, writtenData) => {
//   console.log(bytesWritten); // 9
//   console.log(writtenData);
// });

const bytesWritten = fs.writeSync(fd, "त्र");
console.log(bytesWritten); // 9

import fsPromises from "fs/promises";
import fs from "fs";

setTimeout(() => {
  console.log("hi");
}, 0);

// Async I/O
// const fileContent1 = await fsPromises.readFile("test.txt", "utf8");
// console.log(fileContent1);
const fileContent1 = fs.readFile("test.txt", "utf8", (err, data) => {
  console.log(data);
});

// Sync I/O
// const fileContent2 = fs.readFileSync("test.txt", "utf-8");
// console.log(fileContent2);

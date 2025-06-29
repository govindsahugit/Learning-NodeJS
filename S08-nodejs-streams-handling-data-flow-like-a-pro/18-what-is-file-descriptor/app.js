import fs from "fs";

const fd1 = fs.openSync("text.txt");
const fd2 = fs.openSync("num.txt");
const fd3 = fs.openSync("test.txt");

console.log({ fd1, fd2, fd3 });

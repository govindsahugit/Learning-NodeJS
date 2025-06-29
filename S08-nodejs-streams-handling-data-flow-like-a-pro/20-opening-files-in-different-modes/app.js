import fs from "fs";

// const fd = fs.openSync("text.txt", "w");
// fs.writeSync(fd, "abc123");
const fd = fs.openSync("text.txt", "a");
fs.writeSync(fd, "4567");

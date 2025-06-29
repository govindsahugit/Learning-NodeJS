import fs from "fs";

console.time();

// Time 200ms
const fd = fs.openSync("nums.txt", "w+");
for (let i = 1; i <= 100000; i++) {
  fs.writeSync(fd, `${i}, `);
  if (i === 100000) console.timeEnd();
}
fs.closeSync(fd);

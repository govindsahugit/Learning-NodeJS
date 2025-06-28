import fs from "fs";

const writeStreams = fs.createWriteStream("file.txt");

// ========== writable and initial state ============= //
// console.log(writeStreams.writable); // true
// writeStreams.write("hi");
// console.log(writeStreams.writable); // true
// writeStreams.end();
// console.log(writeStreams.writable); // false

// ========== corked state ============= //
writeStreams.write("a"); // it will write 'a'
console.log(writeStreams.writableCorked); // 0
writeStreams.cork();
console.log(writeStreams.writableCorked); // 1
writeStreams.write("b"); // it won't write 'ab'
writeStreams.uncork(); // now everything will work normally

// ======= writableEnded and writableFinished state ======= //
writeStreams.end();
console.log(writeStreams.writableEnded); // true
console.log(writeStreams.writableFinished); // false

setTimeout(() => {
  console.log(writeStreams.writableFinished); // true
}, 10);

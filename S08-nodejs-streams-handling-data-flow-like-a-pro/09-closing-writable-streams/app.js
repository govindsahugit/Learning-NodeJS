import fs from "fs";

const writeStreams = fs.createWriteStream("file.txt");

writeStreams.write("a");
writeStreams.write("b");
writeStreams.write("c");
writeStreams.write("d");

writeStreams.end("e");

writeStreams.on("close", () => {
  console.log("closed");
});

writeStreams.on("finish", () => {
  console.log("finished");
});

// finish event will console first and then close

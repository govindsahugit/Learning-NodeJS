import fs from "fs";

const readStreams = fs.createReadStream("chars.txt", { highWaterMark: 4 });

// readStreams.setEncoding("utf8");

// readStreams.on("data", (chunk) => {
//   console.log(chunk);
// });
// readStreams.on("close", () => {
//   console.log("Closed");
// });
// readStreams.on("end", () => {
//   console.log("Ended");
// });
// readStreams.on("error", (err) => {
//   console.log(err); // error
// });
readStreams.on("open", (data) => {
  console.log("Data: ", data);
});
readStreams.on("ready", (data) => {
  console.log("Ready: ", data);
});

// readStreams.setEncoding("utf8");
// readStreams.destroy("error");

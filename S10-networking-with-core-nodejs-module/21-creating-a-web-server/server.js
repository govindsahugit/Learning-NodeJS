import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
import http from "node:http";

const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    const readStream = createReadStream("./public/index.html");
    readStream.pipe(res);
  } else {
    const readStream = createReadStream(`./public${req.url}`);
    readStream.pipe(res);
    readStream.on("error", (err) => {
      res.end("File not found.");
      console.log(err);
    });
  }
});

server.listen(4000, "192.168.1.10", () => {
  console.log("Server started");
});

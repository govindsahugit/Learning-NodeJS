import { createReadStream } from "node:fs";
import http from "node:http";

const server = http.createServer((request, response) => {
  // console.log(request.method);
  // request.on("data", (chunk) => {
  //   console.log("1");
  //   console.log(chunk.toString());
  // });
  // response.statusCode = 200;
  // response.setHeader("Content-Length", "23");
  // response.write("Hello from http server.");
  // response.setHeader("Content-Type", "text/js");
  // response.setHeader("Content-Length", "848");
  response.setHeader("Content-Type", "text/css,");
  response.setHeader("Content-Length", "139");
  // response.setHeader("Content-Type", "text/html,");
  // response.setHeader("Content-Length", "249");
  const readStream = createReadStream("style.css");
  readStream.pipe(response);
});

// server.on("connection", (socket) => {
//   socket.on("data", (chunk) => {
//     console.log("2");
//     console.log(chunk.toString());
//   });
// });

server.listen(4000, "0.0.0.0", () => {
  console.log("Server started");
});

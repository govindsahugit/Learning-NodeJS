import http from "node:http";

const server = http.createServer((req, res) => {
  console.log("Got the request.");
  console.log(req.method);
  console.log(req.url);
  req.on("data", (chunk) => {
    console.log(chunk.toString());
  });
  res.end("Hello from http server");
});

server.listen(4000, "0.0.0.0", () => {
  console.log("server started on port 4000");
});

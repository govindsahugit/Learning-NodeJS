import http from "http";

const server = http.createServer((req, res) => {
  res.end("Hello from HTTP module.");
});

server.listen(3000, () => {
  console.log("running");
});

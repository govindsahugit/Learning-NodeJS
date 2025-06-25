const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello from the NodeJS server");
});

server.listen(3000);

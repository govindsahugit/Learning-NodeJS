import http from "node:http";

const server = http.createServer();

server.on("request", (req, res) => {
  res.setHeader("Content-Length", "23");
  res.write("Hello from http server.");
  req.on("data", (chunk) => {
    console.log(chunk.toString());
    console.log("Got data from request");
  });
  //   res.end();
});

server.listen(4000, "0.0.0.0", () => {
  console.log("server started");
});

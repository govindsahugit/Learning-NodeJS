import express from "express";
import http from "http";

const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.write("Hello World!");
  res.end();
});

console.log(app);

const server = http.createServer(app);

server.listen(port, () => {
  console.log("ExpressJS server is running using http module.");
});

// app.listen(port, () => {
//   console.log("Server is running on port 4000");
// });

import http from "node:http";

const clientReq = http.request({
  method: "POST",
  hostname: "192.168.1.10",
  port: 4000,
});

clientReq.end("Hello from client.js");

clientReq.on("response", (res) => {
  res.on("data", (chunk) => {
    console.log(chunk.toString());
  });
});

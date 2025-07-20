import dgram from "node:dgram";
import { createReadStream } from "node:fs";
import { readFile, open } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

socket.on("message", (message, clientAddress) => {
  console.log(message.toString());
  console.log(clientAddress);
  socket.close();
});

const readStream = createReadStream("numbers.txt", {
  highWaterMark: 1000,
});

readStream.on("data", (chunk) => {
  socket.send(chunk, 4000, "192.168.1.3");
});

readStream.on("end", () => {
  socket.send("EOF", 4000, "192.168.1.3");
});

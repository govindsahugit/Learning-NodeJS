import dgram from "node:dgram";
import { createWriteStream } from "node:fs";
import { appendFile, readFile, writeFile } from "node:fs/promises";

const socket = dgram.createSocket("udp4");

const writeStream = createWriteStream("text.txt");
socket.on("message", async (message, remoteAddress) => {
  if (message.toString() === "EOF") {
    socket.send(
      "File uploaded successfully to the server.",
      remoteAddress.port,
      remoteAddress.address
    );
  } else {
    writeStream.write(message);
  }
});

socket.bind({ port: 4000 }, () => {
  const address = socket.address();
  console.log(address);
  console.log("listening on port" + " " + address.port);
});

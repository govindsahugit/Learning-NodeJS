import { createReadStream, createWriteStream } from "node:fs";
import net from "node:net";
import { pipeline } from "node:stream";

const clients = [];

const server = net.createServer((socket) => {
  clients.push(socket);
  console.log(clients.length);
  socket.write(clients?.length.toString());

  if (clients.length <= 1) {
    const writeStream = createWriteStream("drama1.mp4");
    socket.pipe(writeStream);
    writeStream.on("close", () => {
      console.log("uploaded from client.");
    });
  } else {
    console.log(clients.length);
    const readStream = createReadStream("drama1.mp4");
    readStream.pipe(socket);
  }

  socket.on("close", () => {
    console.log(socket.remoteAddress, ": Client Disconnected.");
  });
  socket.on("error", () => {
    console.log("Client Lost.");
  });
  console.log(socket.remoteAddress, ": Client Connected.");
});

server.listen(4000, "0.0.0.0", () => {
  console.log(`Server started on port 4000.`);
});

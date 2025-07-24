import { createWriteStream } from "node:fs";
import { open } from "node:fs/promises";
import net from "node:net";

try {
  const server = net.createServer(async (socket) => {
    socket.write("HTTP/1.1 200 OK\n\n");

    const writeStream = createWriteStream("video.mp4");

    socket.on("data", (chunk) => {
      const isEmpty = writeStream.write(chunk);
      if (!isEmpty) socket.pause();
      if (/WebKitFormBoundary.+--/.test(chunk.toString())) {
        socket.end("Got the data");
      }
    });

    writeStream.on("drain", () => {
      socket.resume();
    });

    console.log("Client Connected.");
    socket.on("close", () => {
      console.log("Client Disconnected.");
    });
    socket.on("error", (err) => {
      console.log("Client Lost. \n");
      console.log(err);
    });
  });

  server.listen(4000, "0.0.0.0", () => {
    console.log("server started on port 4000");
  });
} catch (error) {
  console.log("error");
}

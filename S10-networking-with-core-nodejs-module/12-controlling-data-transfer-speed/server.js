import { open } from "node:fs/promises";
import net from "node:net";

try {
  const server = net.createServer(async (socket) => {
    const fileName = "Hey.Sinamika.mp4";
    const fileHandle = await open(fileName);
    const readStream = fileHandle.createReadStream();
    const { size } = await fileHandle.stat();
    socket.write("HTTP/1.1 200 OK\n");
    socket.write("Content-Type: video/mp4\n");
    socket.write(`Content-Disposition: attachment; filename=${fileName}\n`);
    socket.write(`Content-Length: ${size}\n`);

    socket.write("\n\n");

    // readStream.pipe(socket);

    readStream.on("data", (chunk) => {
      socket.write(chunk);
      readStream.pause();
      setTimeout(() => {
        readStream.resume();
      }, 10);
    });

    // socket.write("abcdefghijklmnopqrstuvwxyz");
    // socket.end();

    readStream.on("end", () => {
      console.log("File ended");
    });

    console.log("Client Connected.");
    socket.on("data", (chunk) => {
      console.log(chunk.toString());
    });
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

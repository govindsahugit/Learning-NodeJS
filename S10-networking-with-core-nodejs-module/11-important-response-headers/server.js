import { read } from "node:fs";
import { open } from "node:fs/promises";
import net from "node:net";

try {
  const server = net.createServer(async (socket) => {
    const fileName = "10thmarksheet.pdf";
    const fileHandle = await open(fileName);
    const readStream = fileHandle.createReadStream();
    const { size } = fileHandle.stat();
    socket.write("HTTP/1.1 200 OK\n");

    socket.write("Content-Type: application/pdf\n");
    // socket.write("Content-Type: application/json\n");
    // socket.write("Content-Type: image/jpg\n");
    // socket.write("Content-Type: video/mp4\n");
    // socket.write("Content-Type: text/txt; charset=utf-8\n");
    socket.write(`Content-Disposition: attachment; filename=${fileName}\n`);
    socket.write(`Content-Length: ${size}`);

    socket.write("\n\n");

    readStream.pipe(socket);

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

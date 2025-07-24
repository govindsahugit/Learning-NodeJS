import { createReadStream } from "node:fs";
import net from "node:net";
import { pipeline } from "node:stream";

const clients = [];

const server = net.createServer((socket) => {
  clients.push(socket);
  // console.log(clients.length);
  socket.write("HTTP/1.1\n\nHii");
  const readStream = createReadStream(
    "F:\\Movies & Series\\DRAMAS\\It's ok to not be okay\\Its.Okay.to.Not.Be.Okay.S01E01.720p.10bit.WEBRip.Hindi-Korean.x265.HEVC - Vegamovies.NL.mkv.webm"
  );
  readStream.pipe(socket);

  socket.on("data", (chunk) => {
    console.log(chunk.toString());
  });

  console.log("Client Connected");
  socket.on("close", () => {
    console.log("Client Disconnected");
  });
  socket.on("error", () => {
    console.log("Client Lost");
  });
});

server.listen(4000, "0.0.0.0", () => {
  console.log("server started on port 4000");
});

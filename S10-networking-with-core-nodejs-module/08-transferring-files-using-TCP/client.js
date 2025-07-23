import { createReadStream, createWriteStream } from "node:fs";
import net from "node:net";

const socket = net.createConnection({ host: "192.168.1.10", port: 4000 });

let length = 0;
let count = 0;

socket.on("data", (chunk) => {
  if (count === 0) {
    socket.pause();
    length = parseInt(chunk.toString());
    count++;
    console.log(count);
    console.log(length);
  }
});

setTimeout(() => {
  socket.resume();
  if (length <= 1) {
    const readStream = createReadStream(
      "F:\\Movies & Series\\DRAMAS\\It's ok to not be okay\\Its.Okay.to.Not.Be.Okay.S01E01.720p.10bit.WEBRip.Hindi-Korean.x265.HEVC - Vegamovies.NL.mkv.webm"
    );
    readStream.pipe(socket);
    readStream.on("end", () => {
      console.log("sent by client.");
    });
  } else {
    const writeStream = createWriteStream(`drama${length}.mp4`);
    socket.pipe(writeStream);
    writeStream.on("close", () => {
      console.log("downloaded from server.");
    });
  }
}, 10);

socket.on("error", () => {
  console.log("Server Lost.");
});

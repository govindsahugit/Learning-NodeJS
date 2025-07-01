import http from "http";
import fs from "fs/promises";

const server = http.createServer(async (req, res) => {
  res.setHeader("access-control-allow-origin", "*");
  // res.setHeader("Content-Type", "text/txt");
  res.setHeader("Content-Type", "image/webp");
  res.setHeader("Content-Type", "video/mkv");
  res.setHeader("Content-Type", "video/mp4");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv"
  );

  // const fileHandle = await fs.open("river.webp");
  const fileHandle = await fs.open(
    "F:\\Movies & Series\\South Movies\\Hi Papa (Hi Nanna) (2023) {Hindi DD5.1-192Kbps + Telugu DD5.1}HEVC 1080p 10bit.mkv"
  );
  const { size } = await fileHandle.stat();
  res.setHeader("Content-Length", size);
  const readStream = fileHandle.createReadStream({
    highWaterMark: 10 * 1024 * 1024,
  });
  readStream.on("data", (chunk) => {
    res.write(chunk);
    readStream.pause();
    setTimeout(() => {
      readStream.resume();
    }, 1000);
  });
  readStream.on("end", () => {
    res.end();
  });
});

server.listen(4000, "localhost", () => {
  console.log("Server Started");
});

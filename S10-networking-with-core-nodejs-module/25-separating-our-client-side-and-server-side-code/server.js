import { createReadStream } from "fs";
import { open, readdir, readFile } from "fs/promises";
import http from "http";
import mime from "mime-types";
import { json } from "stream/consumers";

console.log(mime.contentType("instagram.mp4"));

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico") return res.end("No Favicon!");
  const [url, queryParams] = req.url.split("?");
  console.log(queryParams);
  const queryParam = {};
  queryParams?.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    queryParam[key] = value;
  });
  if (req.url === "/" || req.url === "/index.html") {
    serveDirectory(req, res, url);
  } else {
    try {
      const fileHandle = await open(`./storage${decodeURIComponent(url)}`);
      const stat = await fileHandle.stat();
      if (stat.isDirectory()) {
        serveDirectory(req, res, url);
      } else {
        const readStream = fileHandle.createReadStream();
        res.setHeader(
          "Content-Type",
          mime.contentType(url.split("/")[url.split("/").length - 1])
        );
        res.setHeader("Content-Length", stat.size);
        if (queryParam.action === "download") {
          res.setHeader(
            "Content-Disposition",
            `attachment; filename=${url.slice(1)}`
          );
        }
        readStream.pipe(res);
      }
    } catch (error) {
      console.log(error);
      res.end("Not found");
    }
  }
});

const serveDirectory = async (req, res, url) => {
  const itemsList = await readdir(`./storage${url}`);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(itemsList));
};

server.listen(80, "0.0.0.0", () => {
  console.log("Server started on port 80");
});

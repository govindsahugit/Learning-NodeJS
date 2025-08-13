import { createReadStream, createWriteStream } from "fs";
import { open, readdir, readFile, rename, rm } from "fs/promises";
import http from "http";
import mime from "mime-types";
import { json } from "stream/consumers";

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  if (req.url === "/favicon.ico") return res.end("No Favicon!");
  const [url, queryParams] = req.url.split("?");
  // console.log(queryParams);
  const queryParam = {};
  queryParams?.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    queryParam[key] = value;
  });
  if (req.method === "GET") {
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
  } else if (req.method === "OPTIONS") {
    res.end("End");
  } else if (req.method === "POST") {
    const writeStream = createWriteStream(
      `./storage${decodeURIComponent(url)}/${req.headers.filename}`
    );
    let count = 0;
    req.on("data", (chunk) => {
      count++;
      writeStream.write(chunk);
    });
    req.on("end", () => {
      console.log(count);
      writeStream.end();
      res.end("File uploaded successfully.");
    });
  } else if (req.method === "DELETE") {
    req.on("data", async (chunk) => {
      const filename = JSON.parse(chunk);
      const filepath = `./storage${filename.url ? `/${filename.url}` : ""}/${
        filename.filename
      }`;
      const fileHandle = await open(filepath);
      const stat = await fileHandle.stat();

      if (stat.isDirectory()) {
        await rm(filepath, { recursive: true });
      } else {
        await rm(filepath);
      }
      res.end("File deleted successfully.");
    });
  } else if (req.method === "PATCH") {
    req.on("data", async (chunk) => {
      try {
        const { oldname, newName, url } = JSON.parse(chunk);
        const oldPath = `./storage${url ? `/${url}` : ""}/${oldname}`;
        const newPath = `./storage${url ? `/${url}` : ""}/${newName}`;
        await rename(oldPath, newPath);
        res.end("File renamed successfully");
      } catch (error) {
        res.statusCode = 500;
        res.end(`Error renaming file: ${error.message}`);
      }
    });
  }
});

const serveDirectory = async (req, res, url) => {
  const itemsList = await readdir(`./storage${url}`);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(itemsList));
};

server.listen(80, () => {
  console.log("Server started on port 80");
});

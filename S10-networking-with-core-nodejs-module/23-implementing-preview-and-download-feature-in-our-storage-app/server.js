import { createReadStream } from "fs";
import { open, readdir, readFile } from "fs/promises";
import http from "http";
import mime from "mime-types";

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
        res.setHeader("Content-Type", mime.contentType(url.slice(1)));
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
  let dynamicHTML = "";
  itemsList.map((item) => {
    dynamicHTML += `<li><span>${item}</span> <a href=".${
      req.url === "/" ? "" : req.url
    }/${item}?action=open">open</a> <a href=".${
      req.url === "/" ? "" : req.url
    }/${item}?action=download">download</a></li>`;
  });
  const indexHTML = await readFile("./index.html", "utf8");
  res.end(indexHTML.replace("${dynamicHTML}", dynamicHTML));
};

server.listen(80, "0.0.0.0", () => {
  console.log("Server started on port 80");
});

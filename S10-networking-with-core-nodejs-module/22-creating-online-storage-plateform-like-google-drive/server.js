import { createReadStream } from "fs";
import { open, readdir, readFile } from "fs/promises";
import http from "http";

const server = http.createServer(async (req, res) => {
  if (req.url === "/favicon.ico") return res.end("No Favicon!");
  if (req.url === "/" || req.url === "/index.html") {
    serveDirectory(req, res);
  } else {
    try {
      const fileHandle = await open(`./storage${decodeURIComponent(req.url)}`);
      const stat = await fileHandle.stat();
      if (stat.isDirectory()) {
        serveDirectory(req, res);
      } else {
        const readStream = fileHandle.createReadStream();
        readStream.pipe(res);
      }
    } catch (error) {
      console.log(error);
      res.end("Not found");
    }
  }
});

const serveDirectory = async (req, res) => {
  const itemsList = await readdir(`./storage${req.url}`);
  let dynamicHTML = "";
  itemsList.map((item) => {
    dynamicHTML += `<li><a href=".${
      req.url === "/" ? "" : req.url
    }/${item}">${item}</a></li>`;
  });
  const indexHTML = await readFile("./index.html", "utf8");
  res.end(indexHTML.replace("${dynamicHTML}", dynamicHTML));
};

server.listen(80, "0.0.0.0", () => {
  console.log("Server started on port 80");
});

import express from "express";
import { readdir } from "fs/promises";

const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

app.use((req, res, next) => {
  // console.log(req.query.action);
  express.static("storage")(req, res, next);
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
});

app.get("/", async (req, res) => {
  const fileList = await readdir(`./storage`);
  // console.log(fileList);
  res.json(fileList);
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});

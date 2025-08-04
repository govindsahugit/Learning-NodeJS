import express from "express";
import { createWriteStream } from "fs";
import { readdir, rename, rm, stat } from "fs/promises";

const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  });
  next();
});

// Read
app.get("/directory{/:dirname}", async (req, res) => {
  const { dirname } = req.params;
  console.log(req.params);
  const fullDirPath = `./storage/${dirname ? dirname : ""}`; //optional
  const filesList = await readdir(fullDirPath);
  const resData = [];
  for (const item of filesList) {
    const stats = await stat(`${fullDirPath}/${item}`);

    resData.push({ name: item, isDirectory: stats.isDirectory() });
  }
  res.json(resData);
});

app.get("/files/:filename", (req, res) => {
  const { filename } = req.params;
  if (filename.includes(".mp4")) {
    res.set("Content-Type", "video/mp4");
  }
  if (req.query.action === "download") {
    console.log("downloading...");
    res.set("Content-Disposition", "attachment");
  }
  res.sendFile(`${import.meta.dirname}/storage/${filename}`);
});

// Delete
app.delete("/files/:filename", async (req, res) => {
  const { filename } = req.params;
  const filePath = `${import.meta.dirname}/storage/${filename}`;
  try {
    await rm(filePath);
    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: "File not found." });
  }
});

// Update
app.patch("/files/:oldName/:newName", async (req, res) => {
  const { oldName, newName } = req.params;
  const oldPath = `${import.meta.dirname}/storage/${oldName}`;
  const newPath = `${import.meta.dirname}/storage/${newName}`;
  try {
    await rename(oldPath, newPath);
    res.status(200).json({
      message: "File renamed successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "File not found",
    });
  }
});

// Create
app.post("/files/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const writeStream = createWriteStream(`./storage/${filename}`);
    req.pipe(writeStream);
    req.on("end", () => {
      res.status(200).json({
        message: "File uploaded successfully",
      });
    });
  } catch (error) {
    res.status(404).json({
      message: "Failed to upload file",
    });
  }
});

app.listen(port, () => {
  console.log("Server is running on port 4000");
});

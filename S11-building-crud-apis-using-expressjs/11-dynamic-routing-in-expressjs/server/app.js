import express from "express";
import { readdir, rename, rm } from "fs/promises";

const app = express();
const port = 4000;

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
  });
  next();
});

// Read
app.get("/", async (req, res) => {
  const fileList = await readdir(`./storage`);
  res.json(fileList);
});

app.get("/:filename", (req, res) => {
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
app.delete("/:filename", async (req, res) => {
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
app.patch("/:oldName/:newName", async (req, res) => {
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

app.listen(port, () => {
  console.log("Server is running on port 4000");
});

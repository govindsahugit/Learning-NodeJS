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
app.get("/directory/{*dirname}", async (req, res) => {
  const { dirname } = req.params;
  let path = "";
  dirname.forEach((item) => {
    path += `/${item}`;
  });
  const fullDirPath = `./${path}`;
  const filesList = await readdir(fullDirPath);
  const resData = [];
  for (const item of filesList) {
    const stats = await stat(`${fullDirPath}/${item}`);

    resData.push({ name: item, isDirectory: stats.isDirectory() });
  }
  res.json(resData);
});

app.get("/files/{*path}", (req, res) => {
  const arr = req.params.path;
  let filePath = "";
  arr.forEach((file) => {
    filePath += file === "" ? `${file}` : `/${file}`;
  });
  if (filePath.includes(".mp4")) {
    res.set("Content-Type", "video/mp4");
  }
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  res.sendFile(`${import.meta.dirname}/storage/${filePath}`);
});

// Delete
app.delete("/files/{*filename}", async (req, res) => {
  const { filename } = req.params;
  let path = "";
  filename.forEach((item) => {
    path += `/${item}`;
  });
  console.log(path);
  const filePath = `${import.meta.dirname}/storage/${path}`;
  try {
    await rm(filePath, { recursive: true, force: true });
    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: "File not found." });
  }
});

// Update
app.patch("/files/{*oldName}", async (req, res) => {
  const { oldName } = req.params;
  const newName = req.headers.newname;
  let oldpath = "";
  let newpath = "";
  oldName.forEach((item) => {
    oldpath += `/${item}`;
    if (item !== oldName[oldName.length - 1]) {
      newpath += `/${item}`;
    }
  });
  const oldPath = `${import.meta.dirname}/storage/${oldpath}`;
  const newPath = `${import.meta.dirname}/storage/${newpath}/${newName}`;
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
app.post("/files/{*filename}", (req, res) => {
  try {
    const { filename } = req.params;
    let path = "";
    filename.forEach((item) => {
      path += `/${item}`;
    });
    const writeStream = createWriteStream(`./storage/${path}`);
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

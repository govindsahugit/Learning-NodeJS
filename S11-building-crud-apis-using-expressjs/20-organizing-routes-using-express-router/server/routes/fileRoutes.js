import express from "express";
import { createWriteStream } from "fs";
import { rename, rm } from "fs/promises";
import { join, normalize } from "path";
import process from "process";

const router = express.Router();

// Read
router.get("/{*path}", (req, res) => {
  const arr = req.params.path;
  let filePath = "";
  arr?.forEach((file) => {
    filePath += file === "" ? `${file}` : `/${file}`;
  });
  filePath = join("/", filePath);
  if (filePath.includes(".mp4")) {
    res.set("Content-Type", "video/mp4");
  }
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  try {
    res.sendFile(normalize(`${process.cwd()}/storage/${filePath}`));
  } catch (err) {
    console.log(err);
  }
});

// Delete
router.delete("/{*filename}", async (req, res) => {
  const { filename } = req.params;
  let path = "";
  filename?.forEach((item) => {
    path += `/${item}`;
  });
  path = join("/", path);
  const filePath = normalize(`${process.cwd()}/storage/${path}`);
  try {
    await rm(filePath, { recursive: true, force: true });
    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: "File not found." });
  }
});

// Update
router.patch("/{*oldName}", async (req, res) => {
  const { oldName } = req.params;
  const newName = req.headers.newname;
  let oldpath = "";
  let newpath = "";
  oldName?.forEach((item) => {
    oldpath += `/${item}`;
    if (item !== oldName[oldName.length - 1]) {
      newpath += `/${item}`;
    }
  });
  oldpath = join("/", oldpath);
  newpath = join("/", newpath);
  const oldPath = normalize(`${process.cwd()}/storage/${oldpath}`);
  const newPath = normalize(`${process.cwd()}/storage/${newpath}/${newName}`);
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
router.post("/{*filename}", (req, res) => {
  try {
    const { filename } = req.params;
    let path = "";
    filename?.forEach((item) => {
      path += `/${item}`;
    });
    path = join("/", path);
    const writePath = normalize(`${process.cwd()}/storage/${path}`);
    const writeStream = createWriteStream(writePath);
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

export default router;

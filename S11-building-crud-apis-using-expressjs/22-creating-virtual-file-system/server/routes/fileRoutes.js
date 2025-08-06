import express from "express";
import { createWriteStream } from "fs";
import { rename, rm, writeFile } from "fs/promises";
import { extname, join, normalize } from "path";
import process from "process";
import filesData from "../filesDB.json" with {type: "json"}

const router = express.Router();

// Create
router.post("/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const id = crypto.randomUUID();
    const extention = extname(filename);
    const fullFileName = `${id}${extention}`;
    const writePath = normalize(`${process.cwd()}/storage/${fullFileName}`);
    const writeStream = createWriteStream(writePath);
    req.pipe(writeStream);
    req.on("end", async () => {
      filesData?.push({
        id,
        extention,
        name: filename
      })
      await writeFile("./filesDB.json", JSON.stringify(filesData))
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

// Read
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const fileData = filesData?.find((file) => file.id === id)
  if (req.query.action === "download") {
    res.set("Content-Disposition", "attachment");
  }
  try {
    res.sendFile(normalize(`${process.cwd()}/storage/${id}${fileData?.extention}`));
  } catch (err) {
    console.log(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const file = filesData?.find((file) => file.id === id)
  const indexToDelete = filesData?.indexOf(file)
  if (indexToDelete > -1) {
    filesData?.splice(indexToDelete, 1)
  }
  const filePath = normalize(`${process.cwd()}/storage/${id}${file.extention}`);
  try {
    await rm(filePath, { recursive: true, force: true });
    await writeFile("./filesDB.json", JSON.stringify(filesData))
    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: "File not found." });
  }
});

// Update
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const file = filesData?.find((file) => file.id === id)
  const indexToUpdate = filesData?.indexOf(file)
  const newName = req.headers.newname;
  const extension = extname(newName)
  try {
    filesData[indexToUpdate] = {
      id,
      extension,
      name: newName
    }
    await writeFile("./filesDB.json", JSON.stringify(filesData))
    res.status(200).json({
      message: "File renamed successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "File not found",
    });
  }
});

export default router;

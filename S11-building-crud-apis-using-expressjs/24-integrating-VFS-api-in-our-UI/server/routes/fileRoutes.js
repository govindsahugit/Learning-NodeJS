import express from "express";
import { createWriteStream } from "fs";
import { rename, rm, writeFile } from "fs/promises";
import { extname, join, normalize } from "path";
import process from "process";
import directoriesData from "../directoriesDB.json" with {type: "json"}
import filesData from "../filesDB.json" with {type: "json"}

const router = express.Router();

// Create
router.post("/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const parentDirId = req.headers.parentdirid || directoriesData[0].id
    const id = crypto.randomUUID();
    const extention = extname(filename);
    const fullFileName = `${id}${extention}`;
    const writePath = normalize(`${process.cwd()}/storage/${fullFileName}`);
    const writeStream = createWriteStream(writePath);
    req.pipe(writeStream);
    req.on("end", async () => {
      filesData?.push({
        id,
        parentDirId,
        name: filename,
        extention,
      });
      const parentDirData = directoriesData.find((directory) => directory.id === parentDirId)
      parentDirData.files.push(id)
      await writeFile("./filesDB.json", JSON.stringify(filesData));
      await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
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
  const fileData = filesData?.find((file) => file.id === id);
  if (req.query.action === "download") {
    res.set("Content-Disposition", `attachment; filename=${fileData.name}`);
  }
  if (fileData.extention === '.mp4'){
    res.set("Content-Type", `video/mp4`)
  }
  try {
    res.sendFile(
      normalize(`${process.cwd()}/storage/${id}${fileData?.extention}`)
    );
  } catch (err) {
    console.log(err);
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const file = filesData?.find((file) => file.id === id);
  const indexToDelete = filesData?.indexOf(file);
  if (indexToDelete > -1) {
    filesData?.splice(indexToDelete, 1);
  }
  const filePath = normalize(`${process.cwd()}/storage/${id}${file.extention}`);
  try {
    await rm(filePath, { recursive: true, force: true });
    await writeFile("./filesDB.json", JSON.stringify(filesData));
    const parentDirData = directoriesData.find(
      (directoryData) => directoryData.id === file.parentDirId
    );
    parentDirData.files = parentDirData.files.filter(
      (fileId) => fileId !== id
    );
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Update
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const file = filesData?.find((file) => file.id === id);
  const newName = req.headers.newname;
  const extention = extname(newName);
  try {
    file.name = newName;
    file.extention = extention;
    await writeFile("./filesDB.json", JSON.stringify(filesData));
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

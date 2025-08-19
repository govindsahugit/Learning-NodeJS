import express from "express";
import { createWriteStream } from "fs";
import { rm, writeFile } from "fs/promises";
import { extname, normalize } from "path";
import process from "process";
import directoriesData from "../directoriesDB.json" with {type: "json"}
import filesData from "../filesDB.json" with {type: "json"}
import { checkParams } from "../middlewares/validageParamsMiddleware.js";

const router = express.Router();

// router.param("parentDirId", checkParams)
// router.param("id", checkParams)

// Create
router.post("/{:parentDirId}", (req, res) => {
  const filename = req.headers.filename || "untitled"
  const parentDirId = req.params.parentDirId || req.user.rootDirId

  const parentDir = directoriesData.find(dir => dir.id === parentDirId)
  if (parentDir?.userId !== req.user.id) return res.status(401).json({
    error: "Unauthorized access!"
  })

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
    try {
      await writeFile("./filesDB.json", JSON.stringify(filesData));
      await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
      return res.status(201).json({
        message: "File uploaded successfully",
      });
    } catch (error) {
      return res.status(400).json({
        message: "Failed to create file"
      })
    }

  });
});

// Read
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const fileData = filesData?.find((file) => file.id === id);
  const parentDir = directoriesData.find(dir => dir.id === fileData.parentDirId)
  if (parentDir?.userId !== req.user.id) return res.status(401).json({
    error: "Unauthorized access!"
  })
  if (!fileData) {
    return res.status(404).json({
      message: "File not found"
    })
  }

  const filepath = `${process.cwd()}/storage/${id}${fileData?.extention}`

  if (req.query.action === "download") {
    // res.set("Content-Disposition", `attachment; filename=${fileData.name}`);
    res.download(filepath, fileData.name)
  }

  if (fileData.extention === '.mp4') {
    res.set("Content-Type", `video/mp4`)
  }
  try {
    res.sendFile(
      normalize(filepath)
    );
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const file = filesData?.find((file) => file.id === id);

  const parentDir = directoriesData.find(dir => dir.id === file.parentDirId)
  if (parentDir?.userId !== req.user.id) return res.status(401).json({
    error: "Unauthorized access!"
  })

  if (!file) return res.status(404).json({ message: "File not found" })
  const indexToDelete = filesData?.indexOf(file);
  if (indexToDelete === -1) return res.status(404).json({ message: "File not found" })
  filesData?.splice(indexToDelete, 1);
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
    return res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    next(error)
  }
});

// Update
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const file = filesData?.find((file) => file.id === id);

  const parentDir = directoriesData.find(dir => dir.id === file.parentDirId)
  if (parentDir?.userId !== req.user.id) return res.status(401).json({
    error: "Unauthorized access!"
  })

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
    error.status = 500
    next(error)
  }
});

export default router;

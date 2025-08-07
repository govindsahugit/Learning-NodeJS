import express from "express";
import { mkdir, readdir, stat, writeFile } from "fs/promises";
import { join, normalize } from "path";
import directoriesData from "../directoriesDB.json" with {type: "json"}
import filesData from "../filesDB.json" with {type: "json"}

const router = express.Router();

// Read
router.get("/{:id}", async (req, res) => {
  const { id } = req.params;
  const directoryData = !id ? directoriesData[0] : directoriesData.find((folder) => folder.id === id)
  const files = directoryData.files.map((fileId) =>
    filesData.find((file) => file.id === fileId)
  );
  const directories = directoryData.directories
    .map((dirId) => directoriesData.find((dir) => dir.id === dirId))
    .map(({ id, name }) => ({ id, name }));
  res.json({ ...directoryData, files, directories });
});

// creating directory
router.post("/{:parentDirId}", async (req, res) => {
  const { dirname } = req.headers;
  const parentDirId = req.params.parentDirId || directoriesData[0].id;
  const id = crypto.randomUUID();
  const parentDir = directoriesData.find((dir) => dir.id === parentDirId);
  parentDir.directories.push(id);
  directoriesData.push({
    id,
    name: dirname,
    parentDirId,
    files: [],
    directories: [],
  });
  try {
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    res.json({
      message: "Folder created successfully",
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
});
export default router;

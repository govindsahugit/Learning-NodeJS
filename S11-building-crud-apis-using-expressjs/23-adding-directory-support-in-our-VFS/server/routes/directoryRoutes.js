import express from "express";
import { mkdir, readdir, stat } from "fs/promises";
import { join, normalize } from "path";
import directoriesData from "../directoriesDB.json" with {type: "json"}
import filesData from "../filesDB.json" with {type: "json"}


const router = express.Router();

// Read
router.get("/{:id}", async (req, res) => {
  const { id } = req.params
  if (!id) {
    const directoryData = directoriesData[0]
    const files = directoryData.files.map((fileId) =>
      filesData.find((file) => file.id === fileId)
    )
    res.json({...directoryData, files})
  } else {
    const directoryData = directoriesData.find((folder) => folder.id === id)
    const files = directoryData.files.map((fileId) =>
      filesData.find((file) => file.id === fileId)
    )
    res.json({...directoryData, files})
  }
});

// creating directory
router.post("/{*dirname}", async (req, res) => {
  const { dirname } = req.params;
  let path = "";
  dirname?.forEach((item) => {
    path += item === "" ? `${item}` : `/${item}`;
  });
  path = join("/", path);
  path = normalize(path);
  try {
    await mkdir(`./storage${path}`);
    res.json({
      message: "Folder created successfully",
    });
  } catch (error) {
    res.json({
      message: "Something went wrong",
    });
  }
});
export default router;

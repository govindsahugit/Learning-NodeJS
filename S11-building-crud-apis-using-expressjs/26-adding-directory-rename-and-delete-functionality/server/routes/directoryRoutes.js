import express from "express";
import { mkdir, readdir, rm, stat, writeFile } from "fs/promises";
import { join, normalize } from "path";
import directoriesData from "../directoriesDB.json" with {type: "json"}
import filesData from "../filesDB.json" with {type: "json"}

const router = express.Router();

// Read
router.get("/{:id}", async (req, res) => {
  const { id } = req.params;
  const directoryData = id ? directoriesData.find((folder) => folder.id === id) : directoriesData[0]
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

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  const newName = req.headers.newdirname
  console.log(newName);
  const directoryData = directoriesData.find((dir) => dir.id === id)
  directoryData.name = newName
  console.log(directoryData.name);
  try {
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    res.json({ message: "Directory renamed successfully" })
  } catch (error) {
    console.log(error);
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  let dirIds = [id]
  const deleteDir = async (id) => {
    const dirData = directoriesData.find((dir) => dir.id === id)
    dirData.files?.forEach(async (fileId) => {
      const file = filesData?.find((file) => file.id === fileId)
      const indexOfFile = filesData.indexOf(file)
      filesData.splice(indexOfFile, 1)
      try {
        await rm(`./storage/${file.id}${file.extention}`, {recursive: true})
      } catch (error) {
        console.log(error);
      }
    })
    dirData.directories.forEach((dirId) => {
      dirIds?.push(dirId)
    })
    const indexOfDir = directoriesData.indexOf(dirData)
    directoriesData.splice(indexOfDir, 1)
    const indexOfId = dirIds.indexOf(id)
    dirIds.splice(indexOfId, 1)
    if (dirIds.length) {
      dirIds?.forEach((dirId) => {
      deleteDir(dirId)
    })
    } 
  }
  try {
    dirIds?.forEach((dirId) => {
      deleteDir(dirId)
    })
    directoriesData.forEach((dir) => {
      dir?.directories?.forEach(dirId => {
        if(dirId === id) {
          const indexOfDirId = dir.directories.indexOf(id)
          dir.directories.splice(indexOfDirId, 1)
        }
      })
    })
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    await writeFile("./filesDB.json", JSON.stringify(filesData));
    res.json({message: "Directory deleted successfully"})
  } catch (error) {
    console.log(error);
  }
})

export default router;

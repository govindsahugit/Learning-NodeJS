import express from "express";
import { rm, writeFile } from "fs/promises";
import directoriesData from "../directoriesDB.json" with {type: "json"}
import filesData from "../filesDB.json" with {type: "json"}

const router = express.Router();

// Read
router.get("/{:id}", async (req, res) => {
  const { id } = req.params
  const directoryData = id ? directoriesData.find((folder) => folder?.id === id) : directoriesData.find((folder) => folder?.id === req.user.rootDirId)

  if (directoryData?.userId !== req.user?.id) return res.status(401).json({ error: "Unauthorized access!" })

  if (!directoryData) return res.status(404).json({ message: "Directory not found!" })
  const files = directoryData?.files.map((fileId) =>
    filesData.find((file) => file.id === fileId)
  );
  const directories = directoryData?.directories
    .map((dirId) => directoriesData.find((dir) => dir.id === dirId))
    .map(({ id, name }) => ({ id, name }));
  return res.status(200).json({ ...directoryData, files, directories });
});

// creating directory
router.post("/{:parentDirId}", async (req, res, next) => {
  const dirname = req.headers.dirname || "New Folder"
  const parentDirId = req.params.parentDirId || req.user.rootDirId;
  const id = crypto.randomUUID();
  const parentDir = directoriesData.find((dir) => dir.id === parentDirId);
  if (parentDir?.userId !== req.user.id) return res.status(401).json({ error: "Unauthorized access!" })
  if (!parentDir) return res.status(404).status({ message: "Not found!" })
  parentDir.directories.push(id);
  directoriesData.push({
    id,
    name: dirname,
    parentDirId,
    userId: req.cookies.uid,
    files: [],
    directories: [],
  });
  try {
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    return res.status(201).json({
      message: "Folder created successfully",
    });
  } catch (error) {
    next(error)
  }
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params
  const newName = req.headers.newdirname || "New Folder"
  const directoryData = directoriesData.find((dir) => dir.id === id)

  if (directoryData?.userId !== req.user.id) return res.status(401).json({ error: "Unauthorized access!" })

  if (!directoryData) return res.status(404).json({ message: "Not found!" })
  directoryData.name = newName
  try {
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    return res.status(201).json({ message: "Directory renamed successfully" })
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  let dirIds = [id]
  const deleteDir = async (id) => {
    const dirData = directoriesData.find((dir) => dir.id === id)

    if (dirData?.userId !== req.user.id) return res.status(401).json({ error: "Unauthorized access!" })

    if (!dirData) return res.status(404).json({
      message: "Directory not found!"
    })
    dirData?.files?.forEach(async (fileId) => {
      const file = filesData?.find((file) => file.id === fileId)
      if (!file) return res.status(404).send({ message: "Director file not found!" })
      const indexOfFile = filesData.indexOf(file)
      if (indexOfFile === -1) return res.status(404).json({ message: "Directory file not found!" })
      filesData.splice(indexOfFile, 1)
      try {
        await rm(`./storage/${file.id}${file.extention}`, { recursive: true })
      } catch (error) {
        next(error)
      }
    })
    dirData.directories.forEach((dirId) => {
      dirIds?.push(dirId)
    })
    const indexOfDir = directoriesData.indexOf(dirData)
    if (indexOfDir === -1) return res.status(404).json({ message: "Directory not found!" })
    directoriesData.splice(indexOfDir, 1)
    const indexOfId = dirIds.indexOf(id)
    dirIds.splice(indexOfId, 1)
    if (dirIds.length) {
      dirIds?.forEach((dirId) => {
        deleteDir(dirId)
      })
    }
  }
  dirIds?.forEach((dirId) => {
    deleteDir(dirId)
  })
  directoriesData.forEach((dir) => {
    dir?.directories?.forEach(dirId => {
      if (dirId === id) {
        const indexOfDirId = dir.directories.indexOf(id)
        dir.directories.splice(indexOfDirId, 1)
      }
    })
  })
  try {
    await writeFile("./directoriesDB.json", JSON.stringify(directoriesData));
    await writeFile("./filesDB.json", JSON.stringify(filesData));
    res.status(200).json({ message: "Directory deleted successfully" })
  } catch (error) {
    next(error)
  }
})

export default router;

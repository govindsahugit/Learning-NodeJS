import express from "express";
import { mkdir, readdir, stat } from "fs/promises";
import { join, normalize } from "path";

const router = express.Router();

// Read
router.get("/{*dirname}", async (req, res) => {
  const { dirname } = req.params;
  let path = "";
  dirname?.forEach((item) => {
    path += `/${item}`;
  });
  path = join("/", path);
  try {
    const fullDirPath = normalize(`./storage/${path}`);
    const filesList = await readdir(fullDirPath);
    const resData = [];
    for (const item of filesList) {
      const stats = await stat(`${fullDirPath}/${item}`);
      resData.push({ name: item, isDirectory: stats.isDirectory() });
    }
    res.json(resData);
  } catch (error) {
    res.json({
      Error: error,
    });
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

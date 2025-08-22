import express from "express";
import { createWriteStream } from "fs";
import { rm } from "fs/promises";
import { extname, normalize } from "path";
import process from "process";
import { ObjectId } from "mongodb";
import { checkParams } from "../middlewares/validageParamsMiddleware.js";

const router = express.Router();

router.param("parentDirId", checkParams)
router.param("id", checkParams)

// Create
router.post("/{:parentDirId}", async (req, res) => {
  const filename = req.headers.filename || "untitled";
  const parentDirId = req.params.parentDirId || req.user.rootDirId.toString();
  const db = req.db;

  const fileCollection = db.collection("files");
  const dirCollection = db.collection("directories");

  try {
    const parentDir = await dirCollection.findOne({
      _id: new ObjectId(String(parentDirId)),
      userId: req.user._id,
    });

    if (!parentDir)
      return res.status(404).json({
        error: "Parent dir not found!",
      });

    const extention = extname(filename);
    const insertFile = await fileCollection.insertOne({
      parentDirId: new ObjectId(String(parentDirId)),
      name: filename,
      extention,
      userId: req.user._id,
    });
    if (insertFile.acknowledged) {
      const fullFileName = `${insertFile.insertedId.toString()}${extention}`;
      const writePath = normalize(`${process.cwd()}/storage/${fullFileName}`);
      const writeStream = createWriteStream(writePath);
      req.pipe(writeStream);
      req.on("end", () => {
        return res.status(201).json({
          message: "File uploaded successfully",
        });
      });
      req.on("error", () =>
        res.status(400).json({
          error: "Failed to upload file!",
        })
      );
    }
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong!",
    });
  }
});

// Read
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
  const fileCollection = db.collection("files");
  try {
    const file = await fileCollection.findOne({
      _id: new ObjectId(String(id)),
      userId: req.user._id,
    });
    if (!file) {
      return res.status(404).json({
        message: "File not found",
      });
    }
    const filepath = `${process.cwd()}/storage/${id}${file?.extention}`;
    if (req.query.action === "download") res.download(filepath, file.name);
    if (file.extention === ".mp4") res.set("Content-Type", `video/mp4`);
    res.sendFile(normalize(filepath));
  } catch (err) {
    next(err);
  }
});

// Delete
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
  const fileCollection = db.collection("files");
  try {
    const file = await fileCollection.findOne({
      _id: new ObjectId(String(id)),
      userId: req.user._id,
    });

    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = normalize(
      `${process.cwd()}/storage/${id}${file.extention}`
    );

    await rm(filePath, { recursive: true });
    await fileCollection.deleteOne({ _id: new ObjectId(String(id)) });

    return res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    next(error);
  }
});

// Update
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;

  const fileCollection = db.collection("files");
  try {
    const file = await fileCollection.findOne({
      _id: new ObjectId(String(id)),
      userId: req.user._id,
    });

    if (!file)
      return res.status(404).json({
        error: "File not found!",
      });

    const newName = req.body.newFilename;

    await fileCollection.updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: { name: `${newName}` } }
    );

    res.status(200).json({
      message: "File renamed successfully",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
});

export default router;

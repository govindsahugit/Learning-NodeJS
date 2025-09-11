import { createWriteStream } from "fs";
import { rm } from "fs/promises";
import { extname, normalize } from "path";
import process from "process";
import File from "../models/fileModel.js";
import Directory from "../models/directoryModel.js";

export const createFile = async (req, res, next) => {
  const filename = req.headers.filename || "untitled";
  const parentDirId = req.params.parentDirId || req.user.rootDirId.toString();

  try {
    const parentDir = await Directory.findOne({
      _id: parentDirId,
      userId: req.user._id,
    }).lean();

    if (!parentDir)
      return res.status(404).json({
        error: "Parent dir not found!",
      });

    const extention = extname(filename);

    const insertFile = await File.insertOne({
      parentDirId: parentDirId,
      name: filename,
      extention,
      userId: req.user._id,
    });

    const fullFileName = `${insertFile._id.toString()}${extention}`;
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
  } catch (error) {
    next(error);
  }
};

export const readFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await File.findOne({
      _id: id,
      userId: req.user._id,
    }).lean();
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
};

export const deleteFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await File.findOne({
      _id: id,
      userId: req.user._id,
    })
      .select("extention")
      .lean();

    if (!file) return res.status(404).json({ message: "File not found" });

    const filePath = normalize(
      `${process.cwd()}/storage/${id}${file.extention}`
    );

    await rm(filePath, { recursive: true });
    await File.deleteOne({ _id: id });

    return res.status(200).json({ message: "File deleted successfully." });
  } catch (error) {
    next(error);
  }
};

export const renameFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const file = await File.findOne({
      _id: id,
      userId: req.user._id,
    }).lean();

    if (!file)
      return res.status(404).json({
        error: "File not found!",
      });

    const newName = req.body.newFilename;

    await File.updateOne({ _id: id }, { $set: { name: `${newName}` } });

    res.status(200).json({
      message: "File renamed successfully",
    });
  } catch (error) {
    error.status = 500;
    next(error);
  }
};

import { createWriteStream } from "fs";
import File from "../models/fileModel.js";
import { extname, normalize } from "path";
import process from "process";
import { rm } from "fs/promises";
import z from "zod";
import { purify } from "./helpers.js";
import { updateDirectoriesSize } from "./directoryUtils.js";
import { deleteObject, generateSignedUrl } from "./awsUtils.js";
import { generateCloudFrontSignedUrl } from "../services/cloudFront.js";
import { Types } from "mongoose";

export const getFile = async (id) => {
  const file = await File.findOne({
    _id: id,
  }).lean();
  return file;
};

export const fileValidate = async (res, id) => {
  const file = await getFile(id);
  if (!file) {
    return res.status(404).json({
      message: "File not found",
    });
  }
  return { file };
};

export const uploadFile = async (
  res,
  userId,
  filename,
  filesize,
  filetype,
  parentDirId,
  parentDir
) => {
  const extention = extname(filename);

  const newFileId = new Types.ObjectId();

  const insertFile = await File.insertOne({
    _id: newFileId,
    parentDirId,
    name: filename,
    size: filesize,
    path: [...parentDir.path],
    extention,
    userId: userId,
    isUploading: true,
  });

  const { url } = await generateSignedUrl({
    Key: `${insertFile.id}${extention}`,
    ContentType: filetype,
    Method: "PUT",
  });

  return res.status(200).json({
    message: "File is uploading...",
    id: insertFile.id,
    url,
  });
};

export const removeFile = async (res, id, file) => {
  await deleteObject({ Key: `${file._id}${file.extention}` });

  await File.deleteOne({ _id: id });

  await updateDirectoriesSize(file.parentDirId, -file.size);

  return res.status(200).json({ message: "File deleted successfully." });
};

export const renamefile = async (req, res, id) => {
  const {
    success,
    data: newName,
    error,
  } = z.string().safeParse(purify.sanitize(req.body.newFilename));

  if (!success)
    return res.status(400).json({
      error: error.message,
    });

  if (!newName.suc)
    await File.updateOne(
      { _id: id },
      {
        $set: {
          name: `${newName}`,
        },
      }
    );
  return res.status(200).json({
    message: "File renamed successfully",
  });
};

export const fetchFile = (req, res, file) => {
  if (req.query.action === "download") {
    const url = generateCloudFrontSignedUrl({
      Key: `${file._id}${file.extention}`,
      filename: file.name,
      download: true,
    });
    return res.redirect(url);
  }
  const url = generateCloudFrontSignedUrl({
    Key: `${file._id}${file.extention}`,
    filename: file.name,
  });
  return res.redirect(url);
};

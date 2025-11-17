import { createWriteStream } from "fs";
import File from "../models/fileModel.js";
import { extname, normalize } from "path";
import process from "process";
import { rm } from "fs/promises";
import z from "zod";
import { purify } from "./helpers.js";
import { updateDirectoriesSize } from "./directoryUtils.js";
import { deleteObject, generateSignedUrl } from "./awsUtils.js";

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
  parentDirId
) => {
  const extention = extname(filename);

  const insertFile = await File.insertOne({
    parentDirId,
    name: filename,
    size: filesize,
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
  await File.deleteOne({ _id: id });

  await deleteObject({ Key: `${file._id}${file.extention}` });

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

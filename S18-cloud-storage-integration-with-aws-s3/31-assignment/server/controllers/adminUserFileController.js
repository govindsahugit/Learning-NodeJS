import { validateDirectory } from "../utils/directoryUtils.js";
import {
  fileValidate,
  removeFile,
  renamefile,
  uploadFile,
} from "../utils/fileUtils.js";
import { fileSchema } from "../validator/fileSchema.js";

export const readUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { file } = await fileValidate(res, id);

    const url = `https://d3eoxekdhp4lto.cloudfront.net/${file._id}${file.extention}`;

    return res.redirect(url);
  } catch (error) {
    next(error);
  }
};

export const uploadUserFile = async (req, res, next) => {
  const parentDirId = req.params.parentDirId;

  const { success, data, error } = fileSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: z.flattenError(error).fieldErrors,
    });

  const { filename, filesize, filetype } = data;

  try {
    const { directory: parentDir } = await validateDirectory(res, parentDirId);

    const response = await uploadFile(
      req,
      res,
      parentDir.userId,
      filename,
      filesize,
      filetype,
      parentDirId
    );

    return response;
  } catch (error) {
    next(error);
  }
};

export const deleteUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { file } = await fileValidate(res, id);

    const response = await removeFile(res, id, file);
    
    return response;
  } catch (error) {
    next(error);
  }
};

export const renameUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    await fileValidate(res, id);
    const response = await renamefile(req, res, id);
    return response;
  } catch (error) {
    next(error);
  }
};

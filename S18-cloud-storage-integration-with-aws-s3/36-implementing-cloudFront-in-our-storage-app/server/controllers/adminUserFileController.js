import { validateDirectory } from "../utils/directoryUtils.js";
import {
  fetchFile,
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

    fetchFile(req, res, file);
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

import { validateDirectory } from "../utils/directoryUtils.js";
import {
  fileValidate,
  removeFile,
  renamefile,
  uploadFile,
  readfile,
} from "../utils/fileUtils.js";
import { fileSchema } from "../validator/fileSchema.js";

export const readUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ adminId: req.user._id, fileId: id }, "Admin reading user file");

    const { file } = await fileValidate(res, id);

    const { url } = await readfile(req, id, file);

    req.log.info({ adminId: req.user._id, fileId: id }, "Admin file read redirect generated");
    return res.redirect(url);
  } catch (error) {
    req.log.error({ error, fileId: id }, "Failed to read user file by admin");
    next(error);
  }
};

export const uploadInitiateUserFile = async (req, res, next) => {
  const parentDirId = req.params.parentDirId;

  const { success, data, error } = fileSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: z.flattenError(error).fieldErrors,
    });

  const { filename, filesize, filetype } = data;

  try {
    req.log.info({ adminId: req.user._id, parentDirId, filename, filesize }, "Admin initiating user file upload");

    const { directory: parentDir } = await validateDirectory(res, parentDirId);

    const response = await uploadFile(
      res,
      parentDir.userId,
      filename,
      filesize,
      filetype,
      parentDirId,
      parentDir,
    );

    req.log.info({ adminId: req.user._id, parentDirId }, "User file upload initiated by admin");
    return response;
  } catch (error) {
    req.log.error({ error, parentDirId }, "Failed to initiate user file upload by admin");
    next(error);
  }
};

export const deleteUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ adminId: req.user._id, fileId: id }, "Admin deleting user file");

    const { file } = await fileValidate(res, id);
    const response = await removeFile(res, id, file);

    req.log.info({ adminId: req.user._id, fileId: id }, "User file deleted by admin");
    return response;
  } catch (error) {
    req.log.error({ error, fileId: id }, "Failed to delete user file by admin");
    next(error);
  }
};

export const renameUserFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ adminId: req.user._id, fileId: id }, "Admin renaming user file");

    await fileValidate(res, id);
    const response = await renamefile(req, res, id);

    req.log.info({ adminId: req.user._id, fileId: id }, "User file renamed by admin");
    return response;
  } catch (error) {
    req.log.error({ error, fileId: id }, "Failed to rename user file by admin");
    next(error);
  }
};

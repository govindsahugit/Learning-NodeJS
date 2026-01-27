import { generateSignedUrl } from "../utils/awsUtils.js";
import { validateDirectory } from "../utils/directoryUtils.js";
import {
  getFile,
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
    
    if (req.query.action === "download") {
      const { url } = await generateSignedUrl({
        Key: `${id}${file.extention}`,
        Method: "GET",
        filename: file.name,
        download: true,
      });
      return res.redirect(url);
    }

    const { url } = await generateSignedUrl({
      Key: `${id}${file.extention}`,
      Method: "GET",
      filename: file.name,
    });
    return res.redirect(url);
  } catch (error) {
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

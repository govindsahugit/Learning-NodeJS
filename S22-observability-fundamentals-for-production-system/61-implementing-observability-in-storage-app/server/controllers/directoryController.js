import Directory from "../models/directoryModel.js";
import {
  createDir,
  deleteDir,
  getDirData,
  getDirectory,
  renameDir,
  updateDirectoriesSize,
} from "../utils/directoryUtils.js";

export const createDirectory = async (req, res, next) => {
  const parentDirId = req.params.parentDirId || req.user.rootDirId.toString();

  try {
    req.log.info({ userId: req.user._id, parentDirId }, "Creating directory request");

    const parentDir = await getDirectory(parentDirId);

    if (!parentDir) {
      req.log.warn({ userId: req.user._id, parentDirId }, "Parent directory not found");
      return res.status(404).json({
        error: "Directory not found!",
      });
    }

    if (parentDir?.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, parentDirId }, "Unauthorized directory creation attempt");
      return res.status(401).json({ error: "Unauthorized access!" });
    }

    const response = await createDir(
      req,
      res,
      req.user._id,
      parentDirId,
      parentDir
    );
    req.log.info({ userId: req.user._id, parentDirId }, "Directory created successfully");
    return response;
  } catch (error) {
    req.log.error({ error, parentDirId }, "Failed to create directory");
    next(error);
  }
};

export const readDirectory = async (req, res, next) => {
  const { id } = req.params;

  try {
    req.log.info({ userId: req.user._id, dirId: id }, "Reading directory request");

    const directoryData = id
      ? await Directory.findById(id).populate("path", "name -userId").lean()
      : await Directory.findById(req.user.rootDirId)
        .populate("path", "name -userId")
        .lean();

    if (directoryData?.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, dirId: id }, "Unauthorized directory read attempt");
      return res.status(401).json({ error: "Unauthorized access!" });
    }

    const dirData = await getDirData(directoryData, res);
    req.log.info({ userId: req.user._id, dirId: id }, "Directory data retrieved successfully");
    return dirData;
  } catch (error) {
    req.log.error({ error, dirId: id }, "Failed to read directory");
    next(error);
  }
};

export const renameDirectory = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.log.info({ userId: req.user._id, dirId: id }, "Renaming directory request");

    const directoryData = await getDirectory(id);

    if (!directoryData) {
      req.log.warn({ userId: req.user._id, dirId: id }, "Directory not found for rename");
      return res.status(404).json({ message: "Not found!" });
    }

    if (directoryData?.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, dirId: id }, "Unauthorized directory rename attempt");
      return res.status(403).json({ error: "Unauthorized access!" });
    }

    const response = await renameDir(req, res, id);
    req.log.info({ userId: req.user._id, dirId: id }, "Directory renamed successfully");
    return response;
  } catch (error) {
    req.log.error({ error, dirId: id }, "Failed to rename directory");
    next(error);
  }
};

export const deleteDirectory = async (req, res, next) => {
  const { id } = req.params;

  try {
    req.log.info({ userId: req.user._id, dirId: id }, "Deleting directory request");

    const dir = await getDirectory(id);

    if (!dir) {
      req.log.warn({ userId: req.user._id, dirId: id }, "Directory not found for delete");
      return res.status(404).json({
        error: "Directory not found!",
      });
    }

    if (dir?.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, dirId: id }, "Unauthorized directory delete attempt");
      return res.status(403).json({ error: "Unauthorized access!" });
    }

    const response = await deleteDir(res, id);

    await updateDirectoriesSize(dir.parentDirId, -dir.size);

    req.log.info({ userId: req.user._id, dirId: id }, "Directory deleted successfully");
    return response;
  } catch (error) {
    req.log.error({ error, dirId: id }, "Failed to delete directory");
    next(error);
  }
};

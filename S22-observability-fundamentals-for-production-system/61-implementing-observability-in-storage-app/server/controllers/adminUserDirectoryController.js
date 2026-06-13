import Directory from "../models/directoryModel.js";
import User from "../models/userModel.js";
import {
  createDir,
  deleteDir,
  getDirData,
  getDirectory,
  renameDir,
} from "../utils/directoryUtils.js";

export const readUserDirData = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ adminId: req.user._id, rootDirId: id }, "Reading user directory data");

    const user = await User.findOne({ rootDirId: id }).lean();

    if (user) {
      if (req.user.role < user?.role) {
        req.log.warn(
          { adminId: req.user._id, rootDirId: id, targetRole: user?.role },
          "Blocked access to user directory data",
        );
        return res.status(403).json({ error: "Access not allowed!" });
      }
    }

    const dirData = await Directory.findById(id)
      .lean()
      .populate("path", "name -userId");

    const directoryData = await getDirData(dirData, res);

    req.log.info({ adminId: req.user._id, rootDirId: id }, "User directory data fetched");

    return directoryData;
  } catch (error) {
    req.log.error({ error, adminId: req.user._id, rootDirId: id }, "Failed to read user directory data");
    next(error);
  }
};

export const createUserDir = async (req, res, next) => {
  const parentDirId = req.params.parentDirId;

  try {
    req.log.info({ adminId: req.user._id, parentDirId }, "Creating user directory");

    const parentDir = await getDirectory(parentDirId);

    if (!parentDir) {
      req.log.warn({ adminId: req.user._id, parentDirId }, "Parent directory not found for user directory creation");
      return res.status(404).json({
        error: "Directory not found!",
      });
    }

    const response = await createDir(req, res, parentDir.userId, parentDirId, parentDir);

    req.log.info({ adminId: req.user._id, parentDirId }, "User directory created");

    return response;
  } catch (error) {
    req.log.error({ error, adminId: req.user._id, parentDirId }, "Failed to create user directory");
    next(error);
  }
};

export const renameUserDir = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.log.info({ adminId: req.user._id, dirId: id }, "Renaming user directory");

    const directoryData = await getDirectory(id);

    if (!directoryData) {
      req.log.warn({ adminId: req.user._id, dirId: id }, "Directory not found for rename");
      return res.status(404).json({ message: "Not found!" });
    }

    const response = await renameDir(req, res, id);

    req.log.info({ adminId: req.user._id, dirId: id }, "User directory renamed");
    return response;
  } catch (error) {
    req.log.error({ error, adminId: req.user._id, dirId: req.params.id }, "Failed to rename user directory");
    next(error);
  }
};

export const deleteUserDir = async (req, res, next) => {
  const { id } = req.params;

  try {
    const dir = await getDirectory(id);

    req.log.info({ adminId: req.user._id, dirId: id }, "Deleting user directory");

    if (!dir) {
      req.log.warn({ adminId: req.user._id, dirId: id }, "Directory not found for delete");
      return res.status(404).json({
        error: "Directory not found!",
      });
    }

    const response = await deleteDir(res, id);

    req.log.info({ adminId: req.user._id, dirId: id }, "User directory deleted");
    return response;
  } catch (error) {
    req.log.error({ error, adminId: req.user._id, dirId: id }, "Failed to delete user directory");
    next(error);
  }
};

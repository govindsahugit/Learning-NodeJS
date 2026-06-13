import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";
import {
  getDirData,
  getDirectoryContents,
  validateDirectory,
} from "../utils/directoryUtils.js";
import { fileValidate, readfile } from "../utils/fileUtils.js";

export const getDirectoryData = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ dirId: id }, "Accessing public directory data");

    const dirData = await Directory.findById(id).lean();

    if (!dirData.isPublic) {
      req.log.warn({ dirId: id }, "Attempted access to non-public directory");
      return res.status(400).json({ error: "Directory is not publiced!" });
    }

    const data = await getDirData(dirData, res);
    req.log.info({ dirId: id }, "Public directory data retrieved successfully");
    return data;
  } catch (error) {
    req.log.error({ error, dirId: id }, "Failed to get public directory data");
    next(error);
  }
};

export const makeDirectoryPublic = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ userId: req.user._id, dirId: id }, "Making directory public");

    const { directory } = await validateDirectory(res, id);

    if (directory.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, dirId: id }, "Unauthorized attempt to make directory public");
      return res.status(401).json({ error: "Unauthorized operation!" });
    }

    const { files, directories } = await getDirectoryContents(id);

    await File.updateMany(
      {
        _id: { $in: files.map(({ _id }) => _id) },
      },
      { isPublic: true },
    );

    await Directory.updateMany(
      {
        _id: { $in: [...directories.map(({ _id }) => _id), id] },
      },
      { isPublic: true },
    );

    req.log.info({ userId: req.user._id, dirId: id }, "Directory made public successfully");
    return res.status(201).json({
      message: "Directory publiced successfully!",
    });
  } catch (error) {
    req.log.error({ error, dirId: id }, "Failed to make directory public");
    next(error);
  }
};

export const makeDirectoryUnPublic = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ userId: req.user._id, dirId: id }, "Making directory unpublic");

    const { directory } = await validateDirectory(res, id);

    if (directory.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, dirId: id }, "Unauthorized attempt to make directory unpublic");
      return res.status(401).json({ error: "Unauthorized operation!" });
    }

    const { files, directories } = await getDirectoryContents(id);

    await File.updateMany(
      {
        _id: { $in: files.map(({ _id }) => _id) },
      },
      { isPublic: false },
    );

    await Directory.updateMany(
      {
        _id: { $in: [...directories.map(({ _id }) => _id), id] },
      },
      { isPublic: false },
    );

    req.log.info({ userId: req.user._id, dirId: id }, "Directory made unpublic successfully");
    return res.status(201).json({
      message: "Directory unpubliced successfully!",
    });
  } catch (error) {
    req.log.error({ error, dirId: id }, "Failed to make directory unpublic");
    next(error);
  }
};

export const readPublicFile = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ fileId: id }, "Reading public file request");

    const file = await File.findById(id).lean().select("extention isPublic");

    if (!file) {
      req.log.warn({ fileId: id }, "Public file not found");
      return res.status(404).json({ error: "File not found!" });
    }

    if (!file.isPublic) {
      req.log.warn({ fileId: id }, "Attempted access to non-public file");
      return res.status(403).json({
        error: "Access denied. This is not a public file!",
      });
    }

    const { url } = await readfile(req, id, file);
    req.log.info({ fileId: id }, "Public file read redirect generated");
    return res.redirect(url);
  } catch (error) {
    req.log.error({ error, fileId: id }, "Failed to read public file");
    next(error);
  }
};

export const makeFilePublic = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ userId: req.user._id, fileId: id }, "Making file public");

    const { file } = await fileValidate(res, id);

    if (file.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, fileId: id }, "Unauthorized attempt to make file public");
      return res.status(403).json({ error: "Unauthorized Operation!" });
    }

    await File.findByIdAndUpdate(id, { isPublic: true });

    req.log.info({ userId: req.user._id, fileId: id }, "File made public successfully");
    return res.status(200).json({
      message: "File publiced successfully!",
    });
  } catch (error) {
    req.log.error({ error, fileId: id }, "Failed to make file public");
    next(error);
  }
};

export const makeFileUnPublic = async (req, res, next) => {
  const { id } = req.params;
  try {
    req.log.info({ userId: req.user._id, fileId: id }, "Making file unpublic");

    const { file } = await fileValidate(res, id);

    if (file.userId.toString() !== req.user._id.toString()) {
      req.log.warn({ userId: req.user._id, fileId: id }, "Unauthorized attempt to make file unpublic");
      return res.status(403).json({ error: "Unauthorized Operation!" });
    }

    await File.findByIdAndUpdate(id, { isPublic: false });

    req.log.info({ userId: req.user._id, fileId: id }, "File made unpublic successfully");
    return res.status(200).json({
      message: "File publiced successfully!",
    });
  } catch (error) {
    req.log.error({ error, fileId: id }, "Failed to make file unpublic");
    next(error);
  }
};

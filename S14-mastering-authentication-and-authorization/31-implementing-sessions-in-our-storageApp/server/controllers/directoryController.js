import { rm } from "fs/promises";
import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";

export const createDirectory = async (req, res, next) => {
  const dirname = req.headers.dirname || "New Folder";

  const parentDirId = req.params.parentDirId || req.user.rootDirId.toString();

  try {
    const parentDir = await Directory.findOne({
      _id: parentDirId,
      userId: req.user._id,
    }).lean();

    if (!parentDir) return res.status(404).status({ message: "Not found!" });

    await Directory.insertOne({
      name: dirname,
      parentDirId: parentDirId,
      userId: req.user._id,
    });

    return res.status(201).json({
      message: "Folder created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const readDirectory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const directoryData = id
      ? await Directory.findById(id).lean()
      : await Directory.findById(req.user.rootDirId).lean();

    if (directoryData?.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized access!" });

    if (!directoryData)
      return res.status(404).json({ message: "Directory not found!" });

    const directories = await Directory.find({
      parentDirId: directoryData._id,
    })
      .lean()
      .sort({ name: 1 });
    const files = await File.find({
      parentDirId: directoryData._id,
    })
      .lean()
      .sort({ name: 1 });
    return res.status(200).json({
      ...directoryData,
      files: files.map((file) => ({ ...file, id: file._id })),
      directories: directories.map((dir) => ({ ...dir, id: dir._id })),
    });
  } catch (error) {
    next(error);
  }
};

export const renameDirectory = async (req, res, next) => {
  const { id } = req.params;
  const newName = req.body.newDirName || "New Folder";
  try {
    const directoryData = await Directory.findById(id);

    if (directoryData?.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized access!" });

    if (!directoryData) return res.status(404).json({ message: "Not found!" });

    await Directory.updateOne({ _id: id }, { $set: { name: newName } });

    return res.status(201).json({ message: "Directory renamed successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteDirectory = async (req, res, next) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const dir = await Directory.findOne({ _id: id, userId: user._id })
      .select("_id")
      .lean();

    if (!dir)
      return res.status(404).json({
        error: "Directory not found!",
      });

    const getDirectoryContents = async (id) => {
      let files = await File.find({ parentDirId: id })
        .select("extention")
        .lean();

      let directories = await Directory.find({ parentDirId: id })
        .select("_id")
        .lean();

      for (const { _id } of directories) {
        const { files: childFiles, directories: childDirectories } =
          await getDirectoryContents(_id);

        files = [...files, ...childFiles];
        directories = [...directories, ...childDirectories];
      }

      return { files, directories };
    };

    const { files, directories } = await getDirectoryContents(id);

    for (const { _id, extention } of files) {
      await rm(`./storage/${_id.toString()}${extention}`);
    }

    await File.deleteMany({
      _id: { $in: files.map(({ _id }) => _id) },
    });

    await Directory.deleteMany({
      _id: { $in: [...directories.map(({ _id }) => _id), id] },
    });

    res.json({ message: "Directory deleted successfully" });
  } catch (error) {
    next(error);
  }
};

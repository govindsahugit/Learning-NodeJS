import express from "express";
import { ObjectId } from "mongodb";
import { rm } from "fs/promises";
import { checkParams } from "../middlewares/validageParamsMiddleware.js";

const router = express.Router();

router.param("parentDirId", checkParams);
router.param("id", checkParams);

// creating directory
router.post("/{:parentDirId}", async (req, res, next) => {
  const dirname = req.headers.dirname || "New Folder";

  const db = req.db;

  const parentDirId = req.params.parentDirId || req.user.rootDirId.toString();

  const directoriesCollection = db.collection("directories");

  try {
    const parentDir = await directoriesCollection.findOne({
      _id: new ObjectId(String(parentDirId)),
    });

    if (parentDir?.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized access!" });

    if (!parentDir) return res.status(404).status({ message: "Not found!" });

    const insertDir = await directoriesCollection.insertOne({
      name: dirname,
      parentDirId: new ObjectId(String(parentDirId)),
      userId: new ObjectId(String(req.cookies.uid)),
    });

    return res.status(201).json({
      message: "Folder created successfully",
    });
  } catch (error) {
    next(error);
  }
});

// Read
router.get("/{:id}", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;

  const directoriesCollection = db.collection("directories");

  try {
    const directoryData = id
      ? await directoriesCollection.findOne({ _id: new ObjectId(String(id)) })
      : await directoriesCollection.findOne({
          _id: new ObjectId(String(req.user.rootDirId)),
        });

    if (directoryData?.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized access!" });

    if (!directoryData)
      return res.status(404).json({ message: "Directory not found!" });

    const directories = await directoriesCollection
      .find({ parentDirId: directoryData._id })
      .sort({ name: 1 })
      .toArray();

    const filesCollection = db.collection("files");
    const files = await filesCollection
      .find({
        parentDirId: directoryData._id,
      })
      .sort({ name: 1 })
      .toArray();

    return res.status(200).json({
      ...directoryData,
      files: files.map((file) => ({ ...file, id: file._id })),
      directories: directories.map((dir) => ({ ...dir, id: dir._id })),
    });
  } catch (error) {
    next(error);
  }
});

// Update (rename directory)
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;

  const dirCollection = db.collection("directories");

  const newName = req.body.newDirName || "New Folder";
  try {
    const directoryData = await dirCollection.findOne({
      _id: new ObjectId(String(id)),
    });

    if (directoryData?.userId.toString() !== req.user._id.toString())
      return res.status(401).json({ error: "Unauthorized access!" });

    if (!directoryData) return res.status(404).json({ message: "Not found!" });

    await dirCollection.updateOne(
      { _id: new ObjectId(String(id)) },
      { $set: { name: newName } }
    );

    return res.status(201).json({ message: "Directory renamed successfully" });
  } catch (error) {
    next(error);
  }
});

// Delete (recursive delete, deleting directory with all sub and sub directory)
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const db = req.db;
  // const user = req.user;

  const dirObjId = new ObjectId(id);

  const fileCollection = db.collection("files");
  const dirCollection = db.collection("directories");

  try {
    const dir = await dirCollection.findOne(
      { _id: dirObjId, userId: req.user._id },
      { projection: { _id: 1 } }
    );

    if (!dir)
      return res.status(404).json({
        error: "Directory not found!",
      });

    const getDirectoryContents = async (id) => {
      let files = await fileCollection
        .find({ parentDirId: id }, { projection: { extention: 1 } })
        .toArray();

      let directories = await dirCollection
        .find({ parentDirId: id }, { projection: { _id: 1 } })
        .toArray();

      for (const { _id } of directories) {
        const { files: childFiles, directories: childDirectories } =
          await getDirectoryContents(_id);

        files = [...files, ...childFiles];
        directories = [...directories, ...childDirectories];
      }

      return { files, directories };
    };

    const { files, directories } = await getDirectoryContents(dirObjId);

    console.log({ files, directories });

    for (const { _id, extention } of files) {
      await rm(`./storage/${_id.toString()}${extention}`);
    }

    await fileCollection.deleteMany({
      _id: { $in: files.map(({ _id }) => _id) },
    });

    await dirCollection.deleteMany({
      _id: { $in: [...directories.map(({ _id }) => _id), dirObjId] },
    });

    res.json({ message: "Directory deleted successfully" });
  } catch (error) {
    next(error);
  }
});

export default router;

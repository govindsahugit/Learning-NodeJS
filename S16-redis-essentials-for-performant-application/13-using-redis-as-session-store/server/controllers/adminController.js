import mongoose from "mongoose";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";
import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";
import { rm } from "fs/promises";
import redisClient from "../config/redis.js";
import { deleteUserSessions } from "../utils/sessionUtils.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .lean()
      .select("email name isDeleted role rootDirId");

    const sessionKeys = await redisClient.keys("session:*");
    const sessions = [];

    for (const key of sessionKeys) {
      const sessionData = await redisClient.json.get(key, {
        path: "$.userId",
      });
      sessions.push({ key, ...sessionData });
    }

    const allSessions = sessions.map(({ 0: userId }) => userId);

    const usersData = users.map(
      ({ _id, name, email, rootDirId, isDeleted, role }) => ({
        id: _id,
        name,
        email,
        rootDirId,
        isDeleted,
        role,
        isLoggedIn: allSessions.includes(_id.toString()),
      })
    );

    return res.status(200).json(usersData);
  } catch (error) {
    next(error);
  }
};

export const logoutUserByAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).lean();

    if (req.user.role <= user.role)
      return res.status(403).json({
        error: "You can only logout users lower than you in role position!",
      });

    if (req.user._id.toString() === id)
      return res.status(403).json({ error: "You can not logout yourself!" });

    await deleteUserSessions(user._id.toString());

    return res.status(200).end();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const deleteUserByAdmin = async (req, res, next) => {
  const { id } = req.params;

  if (req.user._id.toString() === id)
    return res.status(403).json({ error: "You can not delete yourself!" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(id).lean();

    if (user.role >= req.user.role)
      return res.status(403).json({
        error: "You can not delete you superior and your self!",
      });

    await User.findByIdAndUpdate(id, { isDeleted: true }, { session });

    await deleteUserSessions(user._id.toString());

    await session.commitTransaction();

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const hardDeleteUserByAdmin = async (req, res, next) => {
  const { id } = req.params;

  if (req.user._id.toString() === id)
    return res.status(403).json({ error: "You can not delete yourself!" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(id).lean();

    if (user.role >= req.user.role)
      return res.status(403).json({
        error: "You can not delete you superior and your self!",
      });

    await User.findByIdAndDelete(id, { session });
    await deleteUserSessions(user._id.toString());
    await Directory.deleteMany({ userId: id }, { session });

    await File.deleteMany({ userId: id }, { session });

    const files = await File.find({ userId: id }).select("extention");

    files.forEach(
      async (file) =>
        await rm(`./storage/${file._id.toString()}${file.extention}`)
    );

    await session.commitTransaction();

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

export const recoverUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(id, { isDeleted: false });
    res.status(201).end();
  } catch (error) {
    next(error);
  }
};

export const changeUserRole = async (req, res, next) => {
  const { id } = req.params;

  const role = parseInt(req.headers.role);

  try {
    const user = await User.findById(id);

    if (user.role >= req.user.role) {
      return res.status(403).json({
        error: "Unauthorized change is tried to perform!",
      });
    }

    if (role === 3)
      return res.status(401).json({
        error: "You can not set Owner role!",
      });

    user.role = role;
    await user.save();

    return res.status(201).end();
  } catch (error) {
    next(error);
  }
};

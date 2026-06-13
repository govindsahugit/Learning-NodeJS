import mongoose from "mongoose";
import User from "../models/userModel.js";
import Directory from "../models/directoryModel.js";
import File from "../models/fileModel.js";
import { rm } from "fs/promises";
import redisClient from "../config/redis.js";
import { deleteUserSessions } from "../utils/sessionUtils.js";
import { roleSchema } from "../validator/authSchema.js";
import { purify } from "../utils/helpers.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
      .lean()
      .select("email name isDeleted role rootDirId");

    const { documents: sessions } = await redisClient.ft.search(
      "userIdIdx",
      `*`,
    );

    const allSessions = sessions.map(({ value }) => value.userId);

    const usersData = users.map(
      ({ _id, name, email, rootDirId, isDeleted, role }) => ({
        id: _id,
        name,
        email,
        rootDirId,
        isDeleted,
        role,
        isLoggedIn: allSessions.includes(_id.toString()),
      }),
    );

    req.log.info(
      { adminId: req.user._id, totalUsers: usersData.length },
      "Fetched users list",
    );

    return res.status(200).json(usersData);
  } catch (error) {
    req.log.error(
      { error, adminId: req.user._id },
      "Failed to fetch users list",
    );
    next(error);
  }
};

export const logoutUserByAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).lean();

    if (req.user.role <= user.role) {
      req.log.warn(
        {
          adminId: req.user._id,
          targetUserId: id,
          adminRole: req.user.role,
          targetRole: user?.role,
        },
        "Blocked admin logout due to role hierarchy",
      );
      return res.status(403).json({
        error: "You can only logout users lower than you in role position!",
      });
    }

    if (req.user._id.toString() === id) {
      req.log.warn(
        { adminId: req.user._id, targetUserId: id },
        "Admin attempted to logout self",
      );
      return res.status(403).json({ error: "You can not logout yourself!" });
    }

    await deleteUserSessions(user._id.toString());

    req.log.info(
      { adminId: req.user._id, targetUserId: id },
      "Admin logged out a user",
    );

    return res.status(200).end();
  } catch (error) {
    req.log.error(
      { error, adminId: req.user._id, targetUserId: id },
      "Failed to logout user by admin",
    );
    next(error);
  }
};

export const deleteUserByAdmin = async (req, res, next) => {
  const { id } = req.params;

  if (req.user._id.toString() === id) {
    req.log.warn(
      { adminId: req.user._id, targetUserId: id },
      "Admin attempted to delete self",
    );
    return res.status(403).json({ error: "You can not delete yourself!" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(id).lean();

    if (user.role >= req.user.role) {
      req.log.warn(
        {
          adminId: req.user._id,
          targetUserId: id,
          adminRole: req.user.role,
          targetRole: user?.role,
        },
        "Blocked admin delete due to role hierarchy",
      );
      return res.status(403).json({
        error: "You can not delete you superior and your self!",
      });
    }

    await User.findByIdAndUpdate(id, { isDeleted: true }, { session });

    await deleteUserSessions(user._id.toString());

    await session.commitTransaction();

    req.log.info(
      { adminId: req.user._id, targetUserId: id },
      "User deleted by admin",
    );

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    await session.abortTransaction();
    req.log.error(
      { error, adminId: req.user._id, targetUserId: id },
      "Failed to delete user by admin",
    );
    next(error);
  }
};

export const hardDeleteUserByAdmin = async (req, res, next) => {
  const { id } = req.params;

  if (req.user._id.toString() === id) {
    req.log.warn(
      { adminId: req.user._id, targetUserId: id },
      "Admin attempted to hard delete self",
    );
    return res.status(403).json({ error: "You can not delete yourself!" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(id).lean();

    if (user.role >= req.user.role) {
      req.log.warn(
        {
          adminId: req.user._id,
          targetUserId: id,
          adminRole: req.user.role,
          targetRole: user?.role,
        },
        "Blocked admin hard delete due to role hierarchy",
      );
      return res.status(403).json({
        error: "You can not delete you superior and your self!",
      });
    }

    await User.findByIdAndDelete(id, { session });
    await deleteUserSessions(user._id.toString());
    await Directory.deleteMany({ userId: id }, { session });

    await File.deleteMany({ userId: id }, { session });

    const files = await File.find({ userId: id }).select("extention");

    files.forEach(
      async (file) =>
        await rm(
          `${import.meta.dirname}/../storage/${file._id.toString()}${
            file.extention
          }`,
        ),
    );

    await session.commitTransaction();

    req.log.info(
      { adminId: req.user._id, targetUserId: id },
      "User hard deleted by admin",
    );

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    await session.abortTransaction();
    req.log.error(
      { error, adminId: req.user._id, targetUserId: id },
      "Failed to hard delete user by admin",
    );
    next(error);
  }
};

export const recoverUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndUpdate(purify.sanitize(id), { isDeleted: false });
    req.log.info(
      { adminId: req.user._id, targetUserId: id },
      "User recovered by admin",
    );
    res.status(201).end();
  } catch (error) {
    req.log.error(
      { error, adminId: req.user._id, targetUserId: id },
      "Failed to recover user",
    );
    next(error);
  }
};

export const changeUserRole = async (req, res, next) => {
  const { id } = req.params;
  const { success, data } = roleSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: z.flattenError(error).fieldErrors,
    });

  const { newRole } = data;

  try {
    const user = await User.findById(id);

    if (user.role >= req.user.role) {
      req.log.warn(
        {
          adminId: req.user._id,
          targetUserId: id,
          adminRole: req.user.role,
          targetRole: user?.role,
          newRole,
        },
        "Blocked role change due to role hierarchy",
      );
      return res.status(403).json({
        error: "Unauthorized change is tried to perform!",
      });
    }

    if (newRole === 3) {
      req.log.warn(
        { adminId: req.user._id, targetUserId: id, newRole },
        "Blocked attempt to assign owner role",
      );
      return res.status(401).json({
        error: "You can not set Owner role!",
      });
    }

    user.role = newRole;
    await user.save();

    req.log.info(
      { adminId: req.user._id, targetUserId: id, newRole },
      "User role changed by admin",
    );

    return res.status(201).end();
  } catch (error) {
    req.log.error(
      { error, adminId: req.user._id, targetUserId: id },
      "Failed to change user role",
    );
    next(error);
  }
};

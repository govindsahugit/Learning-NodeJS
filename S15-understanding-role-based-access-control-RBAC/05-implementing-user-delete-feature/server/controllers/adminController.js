import mongoose from "mongoose";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ deleted: false })
      .lean()
      .select("email name");
    const sessions = await Session.find().select("userId -_id");
    const allSessions = sessions.map(({ userId }) => userId.toString());

    const usersData = users.map(({ _id, name, email }) => ({
      id: _id,
      name,
      email,
      isLoggedIn: allSessions.includes(_id.toString()),
    }));
    return res.status(200).json(usersData);
  } catch (error) {
    next(error);
  }
};

export const logoutUserByAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).lean();

    if (req.user._id.toString() === id)
      return res.status(403).json({ error: "You can not logout yourself!" });

    if (req.user.role === "Manager") {
      if (user.role === "Admin")
        return res.status(401).json({
          error: "You can not logout Admin user!",
        });
    }
    await Session.deleteMany({
      userId: id,
    });
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
    await User.findByIdAndUpdate(id, { deleted: true }, { session });
    await Session.deleteMany({ userId: id }, { session });

    await session.commitTransaction();

    return res.status(200).json({
      message: "User deleted successfully!",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

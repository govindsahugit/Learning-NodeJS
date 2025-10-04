import mongoose from "mongoose";
import Session from "../models/sessionModel.js";
import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find().lean().select("email name");
  const sessions = await Session.find().select("userId -_id");
  const allSessions = sessions.map(({ userId }) => userId.toString());

  const usersData = users.map(({ _id, name, email }) => ({
    id: _id,
    name,
    email,
    isLoggedIn: allSessions.includes(_id.toString()),
  }));
  return res.status(200).json(usersData);
};

export const logoutUserByAdmin = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).lean();
    if (req.user.role === "Manager") {
      if (user.role === "Admin") return res.status(400).end();
    }
    await Session.deleteMany({
      userId: id,
    });
    return res.status(200).end();
  } catch (error) {
    console.log(error.message);
  }
};

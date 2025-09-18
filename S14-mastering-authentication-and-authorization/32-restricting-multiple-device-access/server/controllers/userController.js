import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import Directory from "../models/directoryModel.js";
import bcrypt from "bcrypt";
import Session from "../models/sessionModel.js";

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password)
    return res.status(400).json({ message: "All fileds are required!" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const rootDirId = new Types.ObjectId();
    const userId = new Types.ObjectId();

    await Directory.insertOne(
      {
        _id: rootDirId,
        name: `root-${email}`,
        parentDirId: null,
        userId,
      },
      { session }
    );

    await User.insertOne(
      {
        _id: userId,
        name,
        email,
        password,
        rootDirId,
      },
      { session }
    );

    session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    if (error.code === 121) {
      return res.status(400).json({
        error: "Invalid inputs, please enter valid details!",
      });
    } else if (error.code === 11000) {
      if (error.keyValue.email)
        return res.status(409).json({
          error: "Email already exits!",
        });
    } else {
      next(error);
    }
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).lean();

    if (!user)
      return res.status(409).json({
        error: "Invalid credentials!",
      });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(409).json({
        error: "Invalid credentials!",
      });

    const allSession = await Session.find({ userId: user._id });

    if (allSession.length >= 2) {
      await allSession[0].deleteOne();
    }

    const session = await Session.create({
      userId: user._id,
      expiry: Math.round(Date.now() / 1000) + 60 * 60,
    });

    res.cookie("sid", session.id, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    res.status(200).json({
      message: "Logged in",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = (req, res) => {
  return res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
};

export const logoutUser = async (req, res) => {
  const session = req.signedCookies.sid;

  try {
    await Session.findByIdAndDelete(sessionId);
  } catch (error) {
    console.log(error);
  }

  res.clearCookie("sid");
  res.status(200).end();
};

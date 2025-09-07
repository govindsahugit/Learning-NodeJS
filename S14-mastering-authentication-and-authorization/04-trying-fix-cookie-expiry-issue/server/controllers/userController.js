import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import Directory from "../models/directoryModel.js";

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
    if (!user || user.password !== password)
      return res.status(409).json({
        error: "Invalid credentials!",
      });
    const uidVal = {
      id: user?._id.toString(),
      expiry: Math.round(Date.now() / 1000 + 10),
    };
    res.cookie(
      "uid",
      Buffer.from(JSON.stringify(uidVal)).toString("base64url"),
      {
        httpOnly: true,
        maxAge: 60 * 1000 * 60 * 24 * 7,
        // maxAge: 10 * 1000,
      }
    );
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

export const logoutUser = (req, res) => {
  res.clearCookie("uid");
  res.status(200).end();
};

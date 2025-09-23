import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import Directory from "../models/directoryModel.js";
import crypto, { pbkdf2Sync } from "crypto";

export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password)
    return res.status(400).json({ message: "All fileds are required!" });

  const salt = crypto.randomBytes(16).toString("base64url");

  const hashedPassword = pbkdf2Sync(password, salt, 100000, 32, "sha256");

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
        password: `${hashedPassword.toString("base64url")}.${salt.toString(
          "base64url"
        )}`,
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

    const [oldPassword, salt] = user.password.split(".");

    const enteredHashedPassword = pbkdf2Sync(
      password,
      salt,
      100000,
      32,
      "sha256"
    );

    if (!user || oldPassword !== enteredHashedPassword.toString("base64url"))
      return res.status(409).json({
        error: "Invalid credentials!",
      });

    const tokenVal = JSON.stringify({
      id: user?._id.toString(),
      expiry: Math.round(Date.now() / 1000 + 60),
    });

    res.cookie("token", tokenVal, {
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

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).end();
};

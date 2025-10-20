import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import Directory from "../models/directoryModel.js";
import bcrypt from "bcrypt";
import { sendOtpService } from "../services/sendOtpService.js";
import OTP from "../models/otpModel.js";
import { verifyToken } from "../services/googleAuthService.js";
import redisClient from "../config/redis.js";
import {
  deleteUserSessions,
  getUserSessions,
  setSession,
} from "../utils/sessionUtils.js";

export const createUser = async (req, res, next) => {
  const { name, email, password, otp } = req.body;
  if (!name && !email && !password)
    return res.status(400).json({ message: "All fileds are required!" });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord)
      return res.status(401).json({
        error: "Invalid or Expired OTP",
      });

    await OTP.deleteOne();

    const rootDirId = new Types.ObjectId();
    const userId = new Types.ObjectId();

    const users = await User.find();

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
        role: users.length ? 0 : 3,
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
  const { email, password, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord)
      return res.status(401).json({
        error: "Invalid or Expired OTP!",
      });

    await OTP.deleteOne();

    const user = await User.findOne({ email }).lean();

    if (user.isDeleted)
      return res.status(403).json({
        error:
          "Your account has been deleted. Contact your application Admin to recover your account!",
      });

    if (!user)
      return res.status(409).json({
        error: "Invalid credentials!",
      });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(409).json({
        error: "Invalid credentials!",
      });

    const { sessionId } = await setSession(user);

    const sessions = await getUserSessions(user._id.toString());
    if (sessions.length > 2) {
      await redisClient.del(sessions[0]);
    }

    res.cookie("sid", sessionId, {
      httpOnly: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    return res.status(200).json({
      message: "Logged in",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const createNewPassword = async (req, res, next) => {
  const { email, newPassword, otp } = req.body;
  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord)
      return res.status(401).json({
        error: "Invalid or Expired OTP!",
      });

    await OTP.deleteOne();

    const user = await User.findOne({ email }).lean();

    if (newPassword === user.password)
      return res.status(400).json({
        error: "New Password is same as current password!",
      });

    if (!user)
      return res.status(404).json({
        error: "User not found!",
      });

    if (user.isDeleted)
      return res.status(403).json({
        error:
          "Your account has been deleted. Contact your application Admin to recover your account!",
      });

    await User.findByIdAndUpdate(user._id, {
      password: newPassword,
    });

    return res.status(201).json({
      message: "Password reset successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();
    return res.status(200).json({
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res) => {
  const sessionId = req.signedCookies.sid;
  try {
    await redisClient.del(`session:${sessionId}`);
  } catch (error) {
    console.log(error);
  }
  res.clearCookie("sid");
  return res.status(200).end();
};

export const logouAll = async (req, res) => {
  try {
    await deleteUserSessions(req.user._id);
  } catch (error) {
    console.log(error);
  }
  res.clearCookie("sid");
  return res.status(200).end();
};

export const sendOtp = async (req, res, next) => {
  const { email } = req.body;
  await sendOtpService(email);
  res.status(201).json({
    message: "OTP sent successfully",
  });
};

export const verifyOtp = async (req, res, next) => {
  const { email, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord)
    return res.status(404).json({
      error: "Invalid or Expired OTP",
    });

  res.status(201).json({
    message: "OTP verification successful",
  });
};

export const loginWithGoogle = async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken)
    return res.status(400).json({
      error: "something went wrong!",
    });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email } = await verifyToken(idToken);

    const user = await User.findOne({ email }).lean();

    if (user?.isDeleted)
      return res.status(403).json({
        error:
          "Your account has been deleted. Contact your application Admin to recover your account!",
      });

    if (user) {
      const { sessionId } = await setSession(user);

      const sessions = await getUserSessions(user._id.toString());
      if (sessions.length > 2) {
        await redisClient.del(sessions[0]);
      }

      res.cookie("sid", sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24 * 7,
      });

      return res.status(200).json({
        message: "Login successfully!",
      });
    } else {
      const { email, name, picture } = await verifyToken(idToken);

      const rootDirId = new Types.ObjectId();
      const userId = new Types.ObjectId();

      const users = await User.find();

      await Directory.insertOne(
        {
          _id: rootDirId,
          name: `root-${email}`,
          parentDirId: null,
          userId,
        },
        { session }
      );

      const user = await User.insertOne(
        {
          _id: userId,
          name,
          email,
          password: crypto.randomUUID(),
          rootDirId,
          picture,
          role: users.length ? 0 : 3,
        },
        { session }
      );

      const { sessionId } = await setSession(user);

      res.cookie("sid", sessionId, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24 * 7,
      });

      session.commitTransaction();

      return res.status(201).json({
        success: true,
        message: "User created successfully.",
      });
    }
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

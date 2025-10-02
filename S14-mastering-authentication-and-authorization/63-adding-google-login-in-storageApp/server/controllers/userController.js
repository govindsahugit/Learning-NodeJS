import User from "../models/userModel.js";
import mongoose, { Types } from "mongoose";
import Directory from "../models/directoryModel.js";
import bcrypt from "bcrypt";
import Session from "../models/sessionModel.js";
import { sendOtpService } from "../services/sendOtpService.js";
import OTP from "../models/otpModel.js";
import { verifyToken } from "../services/googleAuthService.js";

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
  const { email, password, otp } = req.body;

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord)
      return res.status(401).json({
        error: "Invalid or Expired OTP!",
      });

    await OTP.deleteOne();

    const user = await User.findOne({ email }).lean();

    if (password === user._id.toString())
      return res.status(401).json({
        error: "Try Login with Google!",
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
    console.log(error);
    next(error);
  }
};

export const getUserDetails = (req, res) => {
  return res.status(200).json({
    name: req.user.name,
    email: req.user.email,
    picture: req.user.picture,
  });
};

export const logoutUser = async (req, res) => {
  const sessionId = req.signedCookies.sid;
  try {
    await Session.findByIdAndDelete(sessionId);
  } catch (error) {
    console.log(error);
  }

  res.clearCookie("sid");
  res.status(200).end();
};

export const logouAll = async (req, res) => {
  const sessionId = req.signedCookies.sid;
  try {
    const session = await Session.findByIdAndDelete(sessionId);
    await Session.deleteMany({ userId: session.userId });
  } catch (error) {
    console.log(error);
  }

  res.clearCookie("sid");
  res.status(200).end();
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

  try {
    const { email } = await verifyToken(idToken);

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.status(404).json({
        error: "User not found!",
      });
    }

    const userSessions = await Session.find({ userId: user._id });

    if (userSessions.length >= 2) {
      await userSessions[0].deleteOne();
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

    return res.status(200).json({
      message: "Login successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const signInWithGoogle = async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken)
    return res.status(400).json({
      error: "idToken not received!",
    });

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { email, name, picture } = await verifyToken(idToken);

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
        password: userId,
        rootDirId,
        picture,
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

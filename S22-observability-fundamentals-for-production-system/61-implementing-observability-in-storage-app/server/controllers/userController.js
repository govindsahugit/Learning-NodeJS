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
import {
  emailSchema,
  loginSchema,
  newPassSchema,
  registerSchema,
  verifyOtpSchema,
} from "../validator/authSchema.js";
import { z } from "zod/v4";
import { purify } from "../utils/helpers.js";

import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("storage-app-auth");

export const createUser = async (req, res, next) => {
  const { success, data, error } = registerSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: z.flattenError(error).fieldErrors,
    });

  const { name, email, password, otp } = data;
  if (!name && !email && !password) {
    req.log.warn({ email }, "User registration missing required fields");
    return res.status(400).json({ message: "All fileds are required!" });
  }

  req.log.info({ email }, "User registration request received");

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      req.log.warn({ email }, "Invalid OTP for user registration");
      return res.status(401).json({
        error: "Invalid or Expired OTP",
      });
    }

    await OTP.deleteOne({ email });

    const rootDirId = new Types.ObjectId();
    const userId = new Types.ObjectId();

    const users = await User.find();

    await Directory.insertOne(
      {
        _id: rootDirId,
        name: `root-${purify.sanitize(email)}`,
        parentDirId: null,
        userId,
        path: [rootDirId],
      },
      { session },
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
      { session },
    );

    session.commitTransaction();

    req.log.info({ email }, "User created successfully");
    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    if (error.code === 121) {
      req.log.warn({ email }, "Invalid inputs for user registration");
      return res.status(400).json({
        error: "Invalid inputs, please enter valid details!",
      });
    } else if (error.code === 11000) {
      if (error.keyValue.email) {
        req.log.warn({ email }, "Email already exists for registration");
        return res.status(409).json({
          error: "Email already exits!",
        });
      }
    } else {
      req.log.error({ error, email }, "Failed to create user");
      next(error);
    }
  }
};

export const loginUser = async (req, res, next) => {
  const { success, data } = loginSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: "Invalid credentials!",
    });

  const { email, password, otp } = data;

  try {
    req.log.info({ email }, "User login request received");

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      req.log.warn({ email }, "Invalid OTP for login");
      return res.status(401).json({
        error: "Invalid or Expired OTP!",
      });
    }

    await OTP.deleteOne({ email });

    const user = await User.findOne({ email }).lean();

    if (user.isDeleted) {
      req.log.warn({ email }, "Deleted user attempted login");
      return res.status(403).json({
        error:
          "Your account has been deleted. Contact your application Admin to recover your account!",
      });
    }

    if (!user) {
      req.log.warn({ email }, "Login attempt for non-existent user");
      return res.status(409).json({
        error: "Invalid credentials!",
      });
    }

    const isPasswordValid = await tracer.startActiveSpan(
      "auth.compare_password",
      async (span) => {
        try {
          span.setAttribute("auth.email_present", Boolean(email));
          span.setAttribute("enduser.id", String(user._id));

          const result = await user.comparePassword(password);

          span.setAttribute("auth.password_valid", result);
          span.setStatus({ code: SpanStatusCode.OK });

          return result;
        } catch (error) {
          span.recordException(error);
          span.setStatus({
            code: SpanStatusCode.ERROR,
            message: error.message,
          });
          throw error;
        } finally {
          span.end();
        }
      },
    );

    if (!isPasswordValid) {
      req.log.warn({ email }, "Invalid password for login");
      return res.status(409).json({
        error: "Invalid credentials!",
      });
    }

    const { sessionId } = await setSession(user);

    const { total, sessionKeys } = await getUserSessions(user._id.toString());
    if (total > 2) await redisClient.del(sessionKeys[0]);

    res.cookie("sid", sessionId, {
      httpOnly: true,
      sameSite: "none",
      sameSite: "lax",
      secure: true,
      signed: true,
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });

    req.log.info({ email }, "User logged in successfully");
    return res.status(200).json({
      message: "Logged in",
    });
  } catch (error) {
    req.log.error({ error, email }, "Failed to login user");
    next(error);
  }
};

export const createNewPassword = async (req, res, next) => {
  const { success, data } = newPassSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: "Invalid credentials!",
    });

  const { email, newPassword, otp } = data;
  try {
    req.log.info({ email }, "Password reset request received");

    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      req.log.warn({ email }, "Invalid OTP for password reset");
      return res.status(401).json({
        error: "Invalid or Expired OTP!",
      });
    }

    await OTP.deleteOne();

    const user = await User.findOne({ email }).lean();

    if (newPassword === user.password) {
      req.log.warn({ email }, "Password reset with same password");
      return res.status(400).json({
        error: "New Password is same as current password!",
      });
    }

    if (!user) {
      req.log.warn({ email }, "Password reset for non-existent user");
      return res.status(404).json({
        error: "User not found!",
      });
    }

    if (user.isDeleted) {
      req.log.warn({ email }, "Password reset for deleted user");
      return res.status(403).json({
        error:
          "Your account has been deleted. Contact your application Admin to recover your account!",
      });
    }

    await User.findByIdAndUpdate(user._id, {
      password: newPassword,
    });

    req.log.info({ email }, "Password reset successfully");
    return res.status(201).json({
      message: "Password reset successfully!",
    });
  } catch (error) {
    req.log.error({ error, email }, "Failed to reset password");
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    req.log.info({ userId: req.user._id }, "Fetching user details");

    const user = await User.findById(req.user._id).lean();
    const rootDir = await Directory.findById(user.rootDirId).lean();
    return res.status(200).json({
      name: user.name,
      email: user.email,
      picture: user.picture,
      role: user.role,
      maxStorageInBytes: user.maxStorageInBytes,
      usedStorageInBytes: rootDir.size,
    });
  } catch (error) {
    req.log.error(
      { error, userId: req.user._id },
      "Failed to fetch user details",
    );
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  const sessionId = req.signedCookies.sid;
  try {
    req.log.info({ userId: req.user._id }, "User logout request");
    await redisClient.del(`session:${sessionId}`);
    req.log.info({ userId: req.user._id }, "User logged out successfully");
  } catch (error) {
    req.log.error({ error, userId: req.user._id }, "Failed to logout user");
    next(error);
  }
  res.clearCookie("sid");
  return res.status(200).end();
};

export const logoutAll = async (req, res, next) => {
  try {
    req.log.info({ userId: req.user._id }, "Logout all sessions request");
    await deleteUserSessions(req.user._id);
    req.log.info(
      { userId: req.user._id },
      "All sessions logged out successfully",
    );
  } catch (error) {
    req.log.error(
      { error, userId: req.user._id },
      "Failed to logout all sessions",
    );
    next(error);
  }
  res.clearCookie("sid");
  return res.status(200).end();
};

export const sendOtp = async (req, res, next) => {
  const { success, data } = emailSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: "Invalid credentials!",
    });

  const { email } = data;
  req.log.info({ email }, "OTP send request");
  await sendOtpService(email);
  req.log.info({ email }, "OTP sent successfully");
  res.status(201).json({
    message: "OTP sent successfully",
  });
};

export const verifyOtp = async (req, res, next) => {
  const { success, data } = verifyOtpSchema.safeParse(req.body);

  if (!success)
    return res.status(400).json({
      error: "Invalid credentials!",
    });

  const { email, otp } = data;

  req.log.info({ email }, "OTP verification request");
  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord) {
    req.log.warn({ email }, "Invalid OTP verification attempt");
    return res.status(404).json({
      error: "Invalid or Expired OTP",
    });
  }

  req.log.info({ email }, "OTP verified successfully");
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

      const { total, sessionKeys } = await getUserSessions(user._id.toString());
      if (total > 2) await redisClient.del(sessionKeys[0]);

      res.cookie("sid", sessionId, {
        httpOnly: true,
        sameSite: "none",
        sameSite: "lax",
        secure: true,
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
          path: [rootDirId],
        },
        { session },
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
        { session },
      );

      const { sessionId } = await setSession(user);

      res.cookie("sid", sessionId, {
        httpOnly: true,
        sameSite: "none",
        sameSite: "lax",
        secure: true,
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

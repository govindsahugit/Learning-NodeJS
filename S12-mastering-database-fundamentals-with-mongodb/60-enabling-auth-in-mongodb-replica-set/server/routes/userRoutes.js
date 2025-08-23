import express from "express";
import { CheckAuth } from "../middlewares/Auth.js";
import { ObjectId } from "mongodb";
import { client } from "../config/db.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  const { db } = req;
  const users = db.collection("users");
  const directories = db.collection("directories");

  if (!name && !email && !password)
    return res.status(400).json({ message: "All fileds are required!" });

  const session = client.startSession();
  session.startTransaction();

  try {
    const rootDirId = new ObjectId();
    const userId = new ObjectId();
    const user = await users.findOne({ email });

    if (user)
      return res.status(409).json({
        error: "Email already exits!",
      });

    await directories.insertOne(
      {
        _id: rootDirId,
        name: `root-${email}`,
        parentDirId: null,
        userId,
      },
      { session }
    );

    await users.insertOne(
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
    await session.abortTransaction()
    if (error.code === 121)
      return res.status(400).json({
        error: "Invalid inputs, please enter valid details!",
      });
    else next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const db = req.db;
  const users = db.collection("users");
  try {
    const user = await users.findOne({ email });
    if (!user || user.password !== password)
      return res.status(409).json({
        error: "Invalid credentials!",
      });
    res.cookie("uid", user?._id.toString(), {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 24 * 7,
    });
    res.status(200).json({
      message: "Logged in",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/data", CheckAuth, (req, res) => {
  return res.status(200).json({
    name: req.user.name,
    email: req.user.email,
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("uid");
  res.status(200).end();
});

export default router;

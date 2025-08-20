import express from "express";
import { CheckAuth } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const { db } = req;
  const users = db.collection("users");
  const directories = db.collection("directories");

  if (!name && !email && !password)
    return res.status(400).json({ message: "All fileds are required!" });

  try {
    const user = await users.findOne({ email });

    if (user)
      return res.status(409).json({
        error: "Email already exits!",
      });

    const userRootDir = await directories.insertOne({
      name: `root-${email}`,
      parentDir: null,
    });

    console.log(userRootDir);

    const userRootDirId = userRootDir.insertedId;

    const insertUser = await users.insertOne({
      name,
      email,
      password,
      rootDirId: userRootDirId,
    });

    await directories.updateOne(
      { _id: userRootDirId },
      { $set: { userId: insertUser.insertedId } }
    );

    return res.status(201).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    return res.status(401).json({
      success: true,
      message: "Failed to create user!",
    });
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

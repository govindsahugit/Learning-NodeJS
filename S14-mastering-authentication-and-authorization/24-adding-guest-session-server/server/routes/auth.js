import express from "express";
import Session from "../models/Session.js";
import User from "../models/User.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({
      email,
      password,
      name,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const session = await Session.findById(req.signedCookies.sid);
    if (session) {
      session.expiry = Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30);
      session.userId = user._id;

      const existingCart = await Cart.findOne({ userId: session.userId });

      if (!existingCart) {
        await Cart.create({
          userId: user._id,
          courses: session.data.cart,
        });
      } else {
        const courses = [...existingCart.courses, ...session.data.cart];

        const finalArr = Object.values(
          courses.reduce((acc, { courseId, quantity }) => {
            if (!acc[courseId]) acc[courseId] = { courseId, quantity };
            else acc[courseId].quantity += quantity;
            return acc;
          }, {})
        );

        existingCart.courses = finalArr;
        await existingCart.save();
      }

      session.data = {
        cart: [],
      };

      await session.save();

      res.cookie("sid", session.id, {
        httpOnly: true,
        signed: true,
        maxAge: 60 * 1000 * 60 * 24 * 30,
      });

      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    }

    const newSession = await Session.create({ userId: user._id });

    res.cookie("sid", newSession.id, {
      httpOnly: true,
      signed: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/logout", async (req, res) => {
  const sessionId = req.signedCookies.sid;

  const result = await Session.findByIdAndDelete(sessionId);
  console.log(result);

  res.cookie("sid", result.id, {
    httpOnly: true,
    signed: true,
    maxAge: 60 * 1000 * 60 * 24 * 30,
  });

  res.status(200).json({
    message: "Loged out",
  });
});

router.get("/profile", async (req, res) => {
  try {
    const session = await Session.findById(req.signedCookies.sid);

    if (!session || !session.userId)
      return res.status(200).json({ error: "User not logged in" });

    const user = await User.findById(session.userId).lean();

    return res.json({
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;

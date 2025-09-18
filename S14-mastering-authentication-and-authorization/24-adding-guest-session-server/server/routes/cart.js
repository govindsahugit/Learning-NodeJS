import express from "express";
import Session from "../models/Session.js";
import Course from "../models/Course.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  try {
    const sessionId = req.signedCookies.sid;

    const session = await Session.findById(sessionId)
      .populate({
        path: "data.cart.courseId",
        select: "name image price",
      })
      .lean();

    if (!session.userId) {
      const courses = session.data.cart.map(({ courseId, quantity }) => {
        const { _id, name, image, price } = courseId;
        return { id: _id.toString(), name, image, price, quantity };
      });
      return res.status(200).json(courses);
    }

    const cart = await Cart.findOne({ userId: session.userId })
      .select("courses")
      .populate({
        path: "courses.courseId",
        select: "name image price",
      })
      .lean();

    const courses = cart.courses.map(({ courseId, quantity }) => {
      const { _id, name, image, price } = courseId;
      return { id: _id.toString(), name, image, price, quantity };
    });
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
  }
});

// Add to cart
router.post("/", async (req, res) => {
  const { courseId } = req.body;
  const sessionId = req.signedCookies.sid;

  try {
    const session = await Session.findById(sessionId);

    if (session.userId) {
      const result = await Cart.updateOne(
        {
          userId: session.userId,
          "courses.courseId": courseId,
        },
        {
          $inc: { "courses.$.quantity": 1 },
        }
      );

      if (result.matchedCount === 0) {
        await Cart.updateOne(
          { userId: session.userId },
          {
            $push: {
              courses: { courseId, quantity: 1 },
            },
          }
        );
      }

      return res.status(201).json({
        message: "New item added to cart",
      });
    }

    const result = await Session.updateOne(
      {
        _id: sessionId,
        "data.cart.courseId": courseId,
      },
      {
        $inc: { "data.cart.$.quantity": 1 },
      }
    );
    if (result.matchedCount === 0) {
      await Session.updateOne(
        { _id: sessionId },
        {
          $push: {
            "data.cart": { courseId, quantity: 1 },
          },
        }
      );
    }

    res.status(201).json({
      message: "New item added to cart",
    });
  } catch (error) {
    console.log(error);
  }
});

// Remove course from cart
router.patch("/:courseId", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  const { courseId } = req.params;

  const session = await Session.findById(sessionId);

  if (session.userId) {
    await Cart.updateOne(
      {
        userId: session.userId,
      },
      {
        $pull: { courses: { courseId } },
      }
    );

    return res.status(201).json({
      message: "Item removed from cart",
    });
  }

  await Session.updateOne(
    {
      _id: sessionId,
    },
    {
      $pull: { "data.cart": { courseId } },
    }
  );

  res.status(201).json({
    message: "Item removed from cart",
  });
});

export default router;

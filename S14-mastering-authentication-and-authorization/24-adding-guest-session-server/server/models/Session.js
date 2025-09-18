import mongoose from "mongoose";

const sessionModel = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    data: {
      cart: [
        {
          courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
    },
    expiry: {
      type: Number,
      default: Math.floor(Date.now() / 1000 + 60 * 60 * 24 * 30),
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {}
);

const Session = mongoose.model("Session", sessionModel);

export default Session;

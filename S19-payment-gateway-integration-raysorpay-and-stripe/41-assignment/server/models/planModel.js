import { model, Schema } from "mongoose";

const planSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    storage: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    strict: "throw",
  }
);

const Plan = model("Plan", planSchema);

export default Plan;

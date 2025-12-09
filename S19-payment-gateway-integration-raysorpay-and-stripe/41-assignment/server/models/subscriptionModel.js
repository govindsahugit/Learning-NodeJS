import { model, Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    subscriptionsId: {
      type: String,
      required: true,
    },
    planId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    strict: "throw",
  }
);

const Subscription = model("Subscription", subscriptionSchema);

export default Subscription;

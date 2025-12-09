import rzpInstance from "../config/razorpay.js";
import Subscription from "../models/subscriptionModel.js";
import { createSubscription } from "../utils/razorpayUtils.js";

export const createStarterPlan = async (req, res, next) => {
  try {
    const checkExistingSubscription = await Subscription.findOne({
      userId: req.user._id,
      planId: req.body.planId,
    });

    if (checkExistingSubscription) {
      const existingSubscription = await rzpInstance.subscriptions.fetch(
        checkExistingSubscription.subscriptionsId
      );

      if (existingSubscription.status === "active")
        return res.status(400).json({
          error: "You are already subscribed this plan!",
        });

      if (existingSubscription.status === "paused") {
        await rzpInstance.subscriptions.resume(existingSubscription.id);
        return res.status(400).json({
          message: "You are subscription is resumed.",
        });
      }

      // return res.status(200).json({
      //   subscription: existingSubscription,
      // });
    }

    const subscription = await createSubscription({
      planId: "plan_RnMtYXdf4PCmw3",
      totalCount: 120,
    });

    await Subscription.insertOne({
      subscriptionsId: subscription.id,
      userId: req.user._id,
      planId: subscription.plan_id,
    });

    console.log(subscription);

    return res.status(200).json({ subscription });
  } catch (error) {
    next(error);
  }
};

export const createMediumPlan = async (req, res, next) => {
  try {
    const subscription = await createSubscription({
      planId: "plan_RnMtzBAoVP42ET",
      totalCount: 120,
    });
    return res.status(200).json({ subscription });
  } catch (error) {
    next(error);
  }
};

export const createPremiumPlan = async (req, res, next) => {
  try {
    const subscription = await createSubscription({
      planId: "plan_RnMuUL2dWDSLAj",
      totalCount: 120,
    });
    return res.status(200).json({ subscription });
  } catch (error) {
    next(error);
  }
};

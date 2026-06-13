import rzpInstance from "../config/razorpay.js";
import Subscription from "../models/subscriptionModel.js";

export const createSubscription = async (req, res, next) => {
  try {
    const { planId } = req.body;
    req.log.info(
      { userId: req.user?._id, planId },
      "Creating subscription request received",
    );

    if (!planId) {
      req.log.warn({ userId: req.user?._id }, "Missing planId for subscription creation");
      return res.status(400).json({ error: "planId is required" });
    }

    req.log.info(
      { userId: req.user?._id, planId },
      "Creating Razorpay subscription",
    );

    const newSubscription = await rzpInstance.subscriptions.create({
      plan_id: planId,
      total_count: 120,
    });

    const subscription = new Subscription({
      razorpaySubscriptionId: newSubscription.id,
      userId: req.user._id,
    });

    await subscription.save();

    req.log.info(
      { userId: req.user?._id, subscriptionId: newSubscription.id, planId },
      "Subscription created successfully",
    );

    return res.status(201).json({ subscriptionId: newSubscription.id });
  } catch (error) {
    req.log.error(
      { error: error?.message, userId: req.user?._id, planId: req.body?.planId },
      "Failed to create subscription",
    );
    next(error);
  }
};

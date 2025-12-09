import rzpInstance from "../config/razorpay.js";

export const createSubscription = async ({ planId, totalCount }) => {
  const subscription = await rzpInstance.subscriptions.create({
    plan_id: planId,
    total_count: totalCount,
  });
  return subscription;
};
